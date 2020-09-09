import 'whatwg-fetch';

import uuid from '../utils/uuid';
import {
  FETCH,
  setFetchRequestFailed,
  setFetchRequestSent,
  setFetchRequestSucceeded,
} from './actions';
import {
  buildConfig,
  buildEndpointConfig,
  buildRequestConfig,
  buildRequestUrl,
  buildServiceConfig,
  getEndpointVariables,
} from './funcs';

const shouldOverrideStatus = (crud, status, overrideStatus) => {
  if (!crud) {
    return false;
  }
  return overrideStatus[crud].includes(status);
};

const parseResponse = async (response, parseAsJson, parseAsText) => {
  const { status, ok } = response;
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  let data = response.body;

  if (data) {
    if (isJson && parseAsJson) {
      data = await response.json();
    } else if (parseAsText) {
      data = await response.text();
    }
  }

  return { data, status, ok };
};

const buildFailedResponse = async (error, status, headers, handleError, state, dispatch) => ({
  data: handleError ? await handleError(error, status, state, dispatch) : error,
  headers,
  status,
});

const buildSuccessResponse = async (data, status, headers, handleData, state, dispatch) => ({
  data: handleData ? handleData(data, status, state, dispatch) : data,
  headers,
  status,
});

const buildErrorResponse = message => ({
  data: message,
  headers: undefined,
  status: undefined,
});

const fetchMiddleware = () => store => next => async function fetch (action) {
  // this is a custom middleware that allows to isolate
  // fetching logic and redux api state tracking
  const { type, config } = action;

  if (type !== FETCH) {
    // just pass to next middleware if not a "FETCH" action
    return next(action);
  }

  // Get configs for both endpoint and service
  const { method, params, service, name, crud } = config;
  const vars = getEndpointVariables(config);
  const serviceConfig = buildServiceConfig(service, store.getState());
  const endpointConfig = buildEndpointConfig(config, store.getState());
  const {
    url,
    headers,
    body,
    credentials,
    mode,
    parseAsText,
    parseAsJson,
    handleData,
    handleError,
    saveData,
    overrideStatus,
    retryOn401
  } = buildConfig(endpointConfig, serviceConfig, method);

  let response;
  const requestId = uuid();
  const requestUrl = buildRequestUrl(url, params);
  const requestConfig = buildRequestConfig(method, body, headers, credentials, mode);

  try {
    store.dispatch(setFetchRequestSent(name, crud, vars, requestConfig, requestId, saveData));
    const fetchResponse = await window.fetch(requestUrl, requestConfig);
    const { data, status, ok } = await parseResponse(fetchResponse, parseAsJson, parseAsText);

    if (ok || shouldOverrideStatus(crud, status, overrideStatus)) {
      response = await buildSuccessResponse(
        data,
        status,
        fetchResponse.headers,
        handleData,
        store.getState(),
        store.dispatch,
      );
      store.dispatch(setFetchRequestSucceeded(name, crud, requestId, response));
    } else {
      response = await buildFailedResponse(
        data,
        status,
        fetchResponse.headers,
        handleError,
        store.getState(),
        store.dispatch,
      );
      store.dispatch(setFetchRequestFailed(name, crud, requestId, response));
    }
  } catch (e) {
    response = buildErrorResponse(e.message);
    store.dispatch(setFetchRequestFailed(name, crud, requestId, response));
  }

  if (retryOn401) {
    return fetch(action);
  }

  return response;
};

export default fetchMiddleware;
