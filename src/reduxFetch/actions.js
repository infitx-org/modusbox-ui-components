const FETCH = '@@ReduxFetch / Fetch';
const SET_FETCH_STATUS = '@@ReduxFetch / Set fetch action status';
const UNSET_FETCH_STATUS = '@@ReduxFetch / Unset fetch action status';

const setFetchStatus = (name, crud, payload, request, id) => ({
  type: SET_FETCH_STATUS,
  payload,
  request,
  crud,
  name,
  id,
});

const unsetFetchStatus = (name, crud, id) => ({
  type: UNSET_FETCH_STATUS,
  crud,
  name,
  id,
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
  SET_FETCH_STATUS,
  UNSET_FETCH_STATUS,
  setFetchStatus,
  unsetFetchStatus,
  fetch,
  buildFetchActions,
};
