import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import {
  buildFetchActions,
  setFetchRequestFailed,
  setFetchRequestSent,
  setFetchRequestSucceeded,
} from '../actions';
import fetchMiddleware from '../middleware';
import api from '../reducers';

const getStore = initialState => {
  const ReduxFetch = fetchMiddleware();
  const middlewares = compose(applyMiddleware(thunk, ReduxFetch));
  const reducer = combineReducers({ api });
  return createStore(reducer, initialState, middlewares);
};

const librarySvc = {
  getApplicationUrl: () => `/my-svc`,
};
const books = {
  service: librarySvc,
  url: ({ bookId }) => `/books/${bookId}`,
};

let store = null;

describe('Sets the pending state correctly', () => {
  beforeEach(() => {
    // reset the store
    store = getStore(undefined);
  });

  it('Should create the pending request with the correct name', () => {
    const action = setFetchRequestSent('requestName', 'read', null, {}, '1');
    store.dispatch(action);

    const { requests } = store.getState().api;
    const [request] = Object.keys(requests);

    expect(request).toEqual('requestName');
  });

  it('Should create the pending request with the correct crud operation', () => {
    const action = setFetchRequestSent('requestName', 'read', null, {}, '1');
    store.dispatch(action);

    const { requestName } = store.getState().api.requests;
    const [crud] = Object.keys(requestName);

    expect(crud).toEqual('read');
  });

  it('Should create the pending request with the correct fields set', () => {
    const action = setFetchRequestSent('requestName', 'read', {}, {}, '1');
    store.dispatch(action);

    const requests = store.getState().api.requests.requestName.read;

    expect(requests).toHaveLength(1);
    expect(requests[0].id).toEqual('1');
    expect(requests[0].pending).toEqual(true);
    expect(requests[0].data).toEqual(undefined);
    expect(requests[0].error).toEqual(undefined);
    expect(requests[0].status).toEqual(undefined);
  });

  it('Should create the pending request with the correct payload', () => {
    const action = setFetchRequestSent('requestName', 'read', { foo: 'bar' }, {}, '1');
    store.dispatch(action);

    const requests = store.getState().api.requests.requestName.read;

    expect(requests).toHaveLength(1);
    expect(requests[0].id).toEqual('1');
    expect(requests[0].payload.foo).toEqual('bar');
  });
});

describe('Sets the success state correctly', () => {
  const fakeResponse = {
    data: [1, 2, 3],
    status: 200,
  };

  beforeEach(() => {
    // reset the store
    store = getStore(undefined);

    const action = setFetchRequestSent('requestName', 'read', null, {}, '1', true);
    store.dispatch(action);
  });

  it('Should create the success request with the correct name', () => {
    const action = setFetchRequestSucceeded('requestName', 'read', '1', {});
    store.dispatch(action);

    const { requests } = store.getState().api;
    const [request] = Object.keys(requests);

    expect(request).toEqual('requestName');
  });

  it('Should create the success request with the correct crud operation', () => {
    const action = setFetchRequestSucceeded('requestName', 'read', '1', {});
    store.dispatch(action);

    const { requestName } = store.getState().api.requests;
    const [crud] = Object.keys(requestName);

    expect(crud).toEqual('read');
  });

  it('Should create the success request with the correct fields set', () => {
    const action = setFetchRequestSucceeded('requestName', 'read', '1', fakeResponse);
    store.dispatch(action);

    const requests = store.getState().api.requests.requestName.read;

    expect(requests).toHaveLength(1);
    expect(requests[0].id).toEqual('1');
    expect(requests[0].pending).toEqual(false);
    expect(requests[0].data).toEqual(fakeResponse.data);
    expect(requests[0].error).toEqual(undefined);
    expect(requests[0].status).toEqual(fakeResponse.status);
  });
});

describe('Sets the failed state correctly', () => {
  const fakeError = {
    data: 'Internal Server Error',
    status: 500,
  };

  beforeEach(() => {
    // reset the store
    store = getStore(undefined);

    const action = setFetchRequestSent('requestName', 'read', null, {}, '1');
    store.dispatch(action);
  });

  it('Should create the failed request with the correct name', () => {
    const action = setFetchRequestFailed('requestName', 'read', '1', {});
    store.dispatch(action);

    const { requests } = store.getState().api;
    const [request] = Object.keys(requests);

    expect(request).toEqual('requestName');
  });

  it('Should create the failed request with the correct crud operation', () => {
    const action = setFetchRequestFailed('requestName', 'read', '1', {});
    store.dispatch(action);

    const { requestName } = store.getState().api.requests;
    const [crud] = Object.keys(requestName);

    expect(crud).toEqual('read');
  });

  it('Should create the failed request with the correct fields set', () => {
    const action = setFetchRequestFailed('requestName', 'read', '1', fakeError);
    store.dispatch(action);

    const requests = store.getState().api.requests.requestName.read;

    expect(requests).toHaveLength(1);
    expect(requests[0].id).toEqual('1');
    expect(requests[0].pending).toEqual(false);
    expect(requests[0].data).toEqual(undefined);
    expect(requests[0].error).toEqual(fakeError.data);
    expect(requests[0].status).toEqual(fakeError.status);
  });
});

describe('Dispatches the pending requests correctly', () => {
  beforeEach(() => {
    // reset the store
    store = getStore(undefined);
  });

  it('Should create the pending request with the correct request config', async () => {
    const actions = buildFetchActions({ books });
    const action = actions.books.create({ body: 'test' });
    store.dispatch(action);

    const requests = store.getState().api.requests.books.create;
    const [request] = requests;

    expect(requests).toHaveLength(1);
    expect(request.id).not.toBeUndefined();
    expect(request.request.body).toEqual('test');
  });

  it('Should create the pending request with the correct payload config', async () => {
    const actions = buildFetchActions({ books });
    const action = actions.books.update({ bookId: '23', body: 'test' });
    store.dispatch(action);

    const requests = store.getState().api.requests.books.update;
    const [request] = requests;

    expect(requests).toHaveLength(1);
    expect(request.id).not.toBeUndefined();
    expect(request.payload.bookId).toEqual('23');
  });
});
