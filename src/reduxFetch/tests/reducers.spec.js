import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from '../middleware';
import api from '../reducers';
import { buildFetchActions, setFetchStatus, unsetFetchStatus } from '../actions';

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
    const action = setFetchStatus('requestName', 'read', null, {}, '1');
    store.dispatch(action);
    //console.log(store.getState())

    const { pendingRequests } = store.getState().api;
    const [request] = Object.keys(pendingRequests);

    expect(request).toEqual('requestName');
  });

  it('Should create the pending request with the correct crud operation', () => {
    const action = setFetchStatus('requestName', 'read', null, {}, '1');
    store.dispatch(action);

    const { requestName } = store.getState().api.pendingRequests;
    const [crud] = Object.keys(requestName);

    expect(crud).toEqual('read');
  });

  it('Should create the pending request with the correct payload', () => {
    const action = setFetchStatus('requestName', 'read', { foo: 'bar' }, {}, '1');
    store.dispatch(action);

    const requests = store.getState().api.pendingRequests.requestName.read;

    expect(requests.length).toEqual(1);
    expect(requests[0].id).toEqual('1');
    expect(requests[0].payload.foo).toEqual('bar');
  });

  it('Should create the pending request with the correct request config', async () => {
    const actions = buildFetchActions({ books });
    const action = actions.books.create({ body: 'test' });
    store.dispatch(action);

    const requests = store.getState().api.pendingRequests.books.create;
    const [request] = requests;

    expect(requests.length).toEqual(1);
    expect(request.id).not.toBeUndefined();
    expect(request.request.body).toEqual(JSON.stringify('test'));
  });

  it('Should create the pending request with the correct payload config', async () => {
    const actions = buildFetchActions({ books });
    const action = actions.books.update({ bookId: '23', body: 'test' });
    store.dispatch(action);

    const requests = store.getState().api.pendingRequests.books.update;
    const [request] = requests;

    expect(requests.length).toEqual(1);
    expect(request.id).not.toBeUndefined();
    expect(request.payload.bookId).toEqual('23');
  });
});
