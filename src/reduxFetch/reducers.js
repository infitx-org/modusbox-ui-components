import { SET_FETCH_STATUS, UNSET_FETCH_STATUS } from './actions';

const initialState = {
  pendingRequests: {},
};

const buildPendingRequest = (id, payload, request) => ({
  id,
  payload,
  request,
});

const getPendingRequestByName = (pendingRequests, name) => {
  if (pendingRequests[name]) {
    return { ...pendingRequests[name] };
  }
  return {};
};

const getPendingRequestCollectionByMethod = (collections, crud) => {
  if (collections[crud]) {
    return [...collections[crud]];
  }
  return [];
};

const buildPendingRequestsPathByNameAndMethod = (pendingRequests, name, crud) => {
  const pendingRequestByName = getPendingRequestByName(pendingRequests, name);
  const pendingRequestsByNameAndMethod = getPendingRequestCollectionByMethod(
    pendingRequestByName,
    crud
  );

  return {
    ...pendingRequests,
    [name]: {
      ...pendingRequestByName,
      [crud]: pendingRequestsByNameAndMethod,
    },
  };
};

const Api = (state = initialState, action) => {
  const { type, payload, name, crud, request, id } = action;
  const pendingRequests = buildPendingRequestsPathByNameAndMethod(
    state.pendingRequests,
    name,
    crud
  );
  switch (type) {
    case SET_FETCH_STATUS: {
      const pendingRequest = buildPendingRequest(id, payload, request);
      pendingRequests[name][crud].push(pendingRequest);
      return {
        ...state,
        pendingRequests,
      };
    }
    case UNSET_FETCH_STATUS: {

      const requestIndex = pendingRequests[name][crud].map(req => req.id).indexOf(id);

      pendingRequests[name][crud].splice(requestIndex, 1);

      if (pendingRequests[name][crud].length === 0) {
        delete pendingRequests[name][crud];
      }
      if (Object.keys(pendingRequests[name]).length === 0) {
        delete pendingRequests[name];
      }

      return {
        ...state,
        pendingRequests,
      };
    }
    default: {
      return state;
    }
  }
}

export default Api;
export { initialState };
