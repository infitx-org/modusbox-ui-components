import 'whatwg-fetch';
import { FETCH, setFetchStatus, unsetFetchStatus } from './actions';
import uuid from '../utils/uuid';
import {
  buildServiceConfig,
  buildEndpointConfig,
  buildConfig,
  buildRequestUrl,
  buildRequestConfig,
  getEndpointVariables,
} from './funcs';

const parseResponse = async (response, parseAsJson, parseAsText) => {
  const { status } = response;
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

  return { data, status };
};

const buildFailedResponse = async (error, status, handleError, state) => ({
  data: handleError ? handleError(error, status, state) : error,
  status,
});

const buildSuccessResponse = async (data, status, handleData, state) => ({
  data: handleData ? handleData(data, status, state) : data,
  status,
});

const buildErrorResponse = message => ({
  data: message,
  status: undefined,
});

const fetchMiddleware = () => store => next => async action => {
  // this is a custom middleware that allows to isolate
  // fetching logic and redux api state tracking
  const { type, config } = action;

  if (type !== FETCH) {
    // just pass to next middleware if not a "FETCH" action
    return next(action);
  }
  const { method, params, service } = config;

  // Get configs for both endpoint and service
  const serviceConfig = buildServiceConfig(service, store.getState());
  const endpointConfig = buildEndpointConfig(config, store.getState());

  // Merge configs
  const {
    url,
    headers,
    body,
    credentials,
    parseAsText,
    parseAsJson,
    handleData,
    handleError,
  } = buildConfig(endpointConfig, serviceConfig);

  let response;
  const requestId = uuid();
  const requestUrl = buildRequestUrl(url, params);
  const requestConfig = buildRequestConfig(method, body, headers, credentials);

  const vars = getEndpointVariables(config);
  store.dispatch(setFetchStatus(config.name, config.crud, vars, requestConfig, requestId));

  try {
    const fetchResponse = await window.fetch(requestUrl, requestConfig);
    const { data, status } = await parseResponse(fetchResponse, parseAsJson, parseAsText);

    if (fetchResponse.ok) {
      response = await buildSuccessResponse(data, status, handleData, store.getState());
    } else {
      response = await buildFailedResponse(data, status, handleError, store.getState());
    }
  } catch (e) {
    response = buildErrorResponse(e.message);
  }

  store.dispatch(unsetFetchStatus(config.name, config.crud, requestConfig, requestId));

  return response;
};

export default fetchMiddleware;
