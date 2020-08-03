import {
  SET_FETCH_REQUEST_FAILED,
  SET_FETCH_REQUEST_SENT,
  SET_FETCH_REQUEST_SUCCEEDED,
} from './actions';

const initialState = {
  requests: {},
};

const buildReq = (id, payload, request, saveData) => ({
  id,
  payload,
  saveData,
  request,
  pending: true,
});

const buildReqByName = (requests, name) => {
  if (requests[name]) {
    return { ...requests[name] };
  }
  return {};
};

const buildReqCollectionByCrud = (collections, crud) => {
  if (collections[crud]) {
    return [...collections[crud]];
  }
  return [];
};

const buildReqsPathByNameAndCrud = (requests, name, crud) => {
  const reqByName = buildReqByName(requests, name);
  const requestsByNameAndMethod = buildReqCollectionByCrud(reqByName, crud);

  return {
    ...requests,
    [name]: {
      ...reqByName,
      [crud]: requestsByNameAndMethod,
    },
  };
};

const getReqsPathByNameAndCrud = (requests, name, crud) =>
  buildReqsPathByNameAndCrud(requests, name, crud)[name][crud];

const getReqByIndex = (requests, name, crud, id) =>
  getReqsPathByNameAndCrud(requests, name, crud)
    .map(req => req.id)
    .indexOf(id);

const ApiReducer = (state = initialState, action) => {
  const { type, payload, name, crud, request, id, saveData } = action;
  const requests = buildReqsPathByNameAndCrud(state.requests, name, crud);
  switch (type) {
    case SET_FETCH_REQUEST_SENT: {
      const req = buildReq(id, payload, request, saveData);
      requests[name][crud].push(req);
      return {
        ...state,
        requests,
      };
    }
    case SET_FETCH_REQUEST_SUCCEEDED: {
      const requestIndex = getReqByIndex(requests, name, crud, id);
      const req = requests[name][crud][requestIndex];

      requests[name][crud] = [
        ...requests[name][crud].slice(0, requestIndex),
        {
          ...requests[name][crud][requestIndex],
          data: req.saveData ? payload.data : null,
          status: payload.status,
          pending: false,
          failed: false,
        },
        ...requests[name][crud].slice(requestIndex + 1),
      ];
      return {
        ...state,
        requests,
      };
    }
    case SET_FETCH_REQUEST_FAILED: {
      const requestIndex = getReqByIndex(requests, name, crud, id);

      requests[name][crud] = [
        ...requests[name][crud].slice(0, requestIndex),
        {
          ...requests[name][crud][requestIndex],
          error: payload.data,
          status: payload.status,
          pending: false,
          failed: true,
        },
        ...requests[name][crud].slice(requestIndex + 1),
      ];
      return {
        ...state,
        requests,
      };
    }
    default: {
      return state;
    }
  }
};

export default ApiReducer;
export { initialState };
