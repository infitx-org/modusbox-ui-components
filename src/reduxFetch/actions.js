const FETCH = '@@ReduxFetch / Fetch';
const SET_FETCH_REQUEST_SENT = '@@ReduxFetch / Set fetch request sent';
const SET_FETCH_REQUEST_SUCCEEDED = '@@ReduxFetch / Set fetch request succeeded';
const SET_FETCH_REQUEST_FAILED = '@@ReduxFetch / Set fetch request failed';

const setFetchRequestSent = (name, crud, payload, request, id, saveData = false) => ({
  type: SET_FETCH_REQUEST_SENT,
  saveData,
  payload,
  request,
  crud,
  name,
  id,
});

const setFetchRequestSucceeded = (name, crud, id, payload) => ({
  type: SET_FETCH_REQUEST_SUCCEEDED,
  crud,
  name,
  id,
  payload,
});

const setFetchRequestFailed = (name, crud, id, payload) => ({
  type: SET_FETCH_REQUEST_FAILED,
  crud,
  name,
  id,
  payload,
});

const buildAction = config => ({
  type: FETCH,
  config,
});

const methods = [
  {
    name: 'GET',
    crud: 'read',
  },
  {
    name: 'POST',
    crud: 'create',
  },
  {
    name: 'PUT',
    crud: 'update',
  },
  {
    name: 'DELETE',
    crud: 'delete',
  },
  {
    name: 'PATCH',
    crud: 'modify',
  },
];

const fetch = config => buildAction(config);

const buildActionPerMethod = (method, config, name) => (actionConfig = {}) => {
  // merge the headers of the endpoint config
  // and the request itself ones
  const headers = {
    ...config.headers,
    ...actionConfig.headers,
  };

  return buildAction({
    method: method.name,
    crud: method.crud,
    ...actionConfig,
    ...config,
    headers,
    name,
  });
};

const buildActionsPerMethod = (config, name) => (prevActions, method) => ({
  ...prevActions,
  [method.crud]: buildActionPerMethod(method, config, name),
});

const buildActionsPerResource = resources => (prevResources, name) => {
  const config = resources[name];

  return {
    ...prevResources,
    [name]: methods.reduce(buildActionsPerMethod(config, name), {}),
  };
};

const buildFetchActions = resources => {
  const names = Object.keys(resources);
  return names.reduce(buildActionsPerResource(resources), {});
};

export {
  FETCH,
  SET_FETCH_REQUEST_SENT,
  SET_FETCH_REQUEST_SUCCEEDED,
  SET_FETCH_REQUEST_FAILED,
  setFetchRequestSent,
  setFetchRequestSucceeded,
  setFetchRequestFailed,
  fetch,
  buildFetchActions,
};
