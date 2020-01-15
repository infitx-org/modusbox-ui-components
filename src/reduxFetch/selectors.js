import get from 'lodash/get';

const getRequests = state => state.api.requests;
const getRequestsByPath = (path, state) => get(getRequests(state), path);
const getLastItem = collection => collection[collection.length - 1];
const isPending = item => item.pending === true;
const isNotPending = item => item.pending === false;

function getCollectionByPath(path) {
  return function getPathCollection(state) {
    // get all the requests in the collection of a given endpoint / method
    const requestsByPath = getRequestsByPath(path, state);
    if (!requestsByPath) {
      return [];
    }
    return requestsByPath;
  };
}

function hasParams(keys, params) {
  return function filterItemByParams(item) {
    return keys.every((key, index) => item.payload[key] === params[index]);
  };
}

function getAnyRequestIsPending(requests) {
  if (!requests) {
    return false;
  }
  return requests.some(isPending);
}

function getLastRequestHasError(requests) {
  if (!requests) {
    return false;
  }
  const notPending = requests.filter(isNotPending);
  if (!notPending.length) {
    return undefined;
  }
  return getLastItem(notPending).error;
}

function getLastRequestHasData(requests) {
  if (!requests) {
    return false;
  }
  const notPending = requests.filter(isNotPending);
  if (!notPending.length) {
    return undefined;
  }
  return getLastItem(notPending).data;
}

const createPendingSelector = path => state => {
  const requests = getRequestsByPath(path, state);
  return getAnyRequestIsPending(requests);
};
const createErrorSelector = path => state => {
  const requests = getRequestsByPath(path, state);
  return getLastRequestHasError(requests);
};
const createDataSelector = path => state => {
  const requests = getRequestsByPath(path, state);
  return getLastRequestHasData(requests);
};
const createApiSelector = path => state => {
  const requests = getRequestsByPath(path, state);
  return {
    pending: getAnyRequestIsPending(requests),
    data: getLastRequestHasData(requests),
    error: getLastRequestHasError(requests),
  };
};

const createCollectionSelector = path => state => {
  const getCollection = getCollectionByPath(path);
  return getCollection(state);
};

const getPendingByParameter = (...keys) => (collection, ...params) =>
  collection.filter(hasParams(keys, params)).some(isPending);

const getErrorByParameter = (...keys) => (collection, ...params) => {
  const items = collection.filter(hasParams(keys, params)).filter(isNotPending);
  const lastItem = getLastItem(items);
  return get(lastItem, 'error');
};

const getDataByParameter = (...keys) => (collection, ...params) => {
  const items = collection.filter(hasParams(keys, params)).filter(isNotPending);
  const lastItem = getLastItem(items);
  return get(lastItem, 'data');
};

export {
  createCollectionSelector,
  createApiSelector,
  createPendingSelector,
  getPendingByParameter,
  createErrorSelector,
  getErrorByParameter,
  createDataSelector,
  getDataByParameter,
};
