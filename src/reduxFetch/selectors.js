import get from 'lodash/get';

const getPendingRequests = state => state.api.pendingRequests;

const getPendingRequestsByPath = (state, name) => get(getPendingRequests(state), name);

const createPendingSelector = path => state => {
  // just get if there is at least 1 request in the collection of a given endpoint / method
  const requestCollection = getPendingRequestsByPath(state, path);
  return requestCollection && requestCollection.length > 0;
};

const createPendingCollectionSelector = path => state => {
  // get all the requests in the collection of a given endpoint / method
  const pendingRequestsByPath = getPendingRequestsByPath(state, path);
  return pendingRequestsByPath || [];
};

const getPendingByParameter = (...keys) => (collection, ...params) => {
  const hasKeyValue = payload => (key, index) => payload[key] === params[index];
  return collection.some(name => keys.every(hasKeyValue(name.payload)));
};

export { createPendingSelector, createPendingCollectionSelector, getPendingByParameter };
