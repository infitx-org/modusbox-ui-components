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
import {
  createCollectionSelector,
  createDataSelector,
  createErrorSelector,
  createPendingSelector,
  getDataByParameter,
  getErrorByParameter,
  getPendingByParameter,
} from '../selectors';

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

const actions = buildFetchActions({ books });

describe('Sets the pending state correctly', () => {
  const getBooksCreatePending = createPendingSelector('books.create');
  const getBooksReadPending = createPendingSelector('books.read');
  const getBooksCollectionCreatePending = createCollectionSelector('books.create');
  const getBooksCollectionReadPending = createCollectionSelector('books.read');

  beforeEach(() => {
    // reset the store
    store = getStore(undefined);
  });

  it('Should retrieve the correct pending state for a create operation', () => {
    const action = actions.books.create({ body: 'test' });
    store.dispatch(action);

    const isCreatePending = getBooksCreatePending(store.getState());
    const isReadPending = getBooksReadPending(store.getState());

    expect(isCreatePending).toBeTruthy();
    expect(isReadPending).toBeFalsy();
  });

  it('Should retrieve the correct pending collection for a create operation', () => {
    const action = actions.books.read({ bookId: '23' });
    store.dispatch(action);

    const isCollectionCreatePending = getBooksCollectionCreatePending(store.getState());
    const isCollectionReadPending = getBooksCollectionReadPending(store.getState());

    expect(isCollectionCreatePending).toHaveLength(0);
    expect(isCollectionReadPending).toHaveLength(1);
  });

  it('Should retrieve the correct pending collection for the given action payload ', () => {
    const action = actions.books.read({ bookId: '23' });
    store.dispatch(action);

    const readCollection = getBooksCollectionReadPending(store.getState());
    const getPendingByBookId = getPendingByParameter('bookId');

    expect(getPendingByBookId(readCollection, '00')).toBe(false);
    expect(getPendingByBookId(readCollection, '23')).toBe(true);
  });
});

describe('Sets the success state correctly', () => {
  const getBooksCreateData = createDataSelector('books.create');
  const getBooksReadData = createDataSelector('books.read');
  const getBooksCollectionCreateData = createCollectionSelector('books.create');
  const getBooksCollectionReadData = createCollectionSelector('books.read');

  beforeEach(() => {
    // reset the store
    store = getStore(undefined);
  });

  it('Should retrieve the correct success state for a create operation', () => {
    store.dispatch(setFetchRequestSent('books', 'create', { bookId: '23' }, {}, '1', true));
    store.dispatch(setFetchRequestSucceeded('books', 'create', '1', { data: 1, status: 200 }));
    const createData = getBooksCreateData(store.getState());
    const readData = getBooksReadData(store.getState());

    expect(createData).toBe(1);
    expect(readData).toBeFalsy();
  });

  it('Should retrieve the correct success collection for a create operation', () => {
    store.dispatch(setFetchRequestSent('books', 'create', { bookId: '23' }, {}, '1'));
    store.dispatch(setFetchRequestSucceeded('books', 'create', '1', { data: 1, status: 200 }));

    const createDataCollection = getBooksCollectionCreateData(store.getState());
    const readDataCollection = getBooksCollectionReadData(store.getState());

    expect(createDataCollection).toHaveLength(1);
    expect(readDataCollection).toHaveLength(0);
  });

  it('Should retrieve the correct success collection for the given action payload ', () => {
    store.dispatch(setFetchRequestSent('books', 'create', { bookId: '23' }, {}, '1', true));
    store.dispatch(setFetchRequestSucceeded('books', 'create', '1', { data: 'test', status: 200 }));

    const createDataCollection = getBooksCollectionCreateData(store.getState());
    const getDataByBookId = getDataByParameter('bookId');

    expect(getDataByBookId(createDataCollection, '00')).toBe(undefined);
    expect(getDataByBookId(createDataCollection, '23')).toBe('test');
  });

  it('Should retrieve the correct success state for a failed create operation', () => {
    store.dispatch(setFetchRequestFailed('books', 'create', '1', { data: 1, status: 200 }));
    const createData = getBooksCreateData(store.getState());
    expect(createData).toBe(undefined);
  });
});

describe('Sets the failed state correctly', () => {
  const getBooksCreateError = createErrorSelector('books.create');
  const getBooksReadError = createErrorSelector('books.read');
  const getBooksCollectionCreateError = createCollectionSelector('books.create');
  const getBooksCollectionReadError = createCollectionSelector('books.read');

  beforeEach(() => {
    // reset the store
    store = getStore(undefined);
    store.dispatch(setFetchRequestSent('books', 'create', { bookId: '23' }, {}, '1'));
  });

  it('Should retrieve the correct failed state for a create operation', () => {
    store.dispatch(setFetchRequestFailed('books', 'create', '1', { data: 1, status: 500 }));
    const createError = getBooksCreateError(store.getState());
    const readError = getBooksReadError(store.getState());

    expect(createError).toBe(1);
    expect(readError).toBeFalsy();
  });

  it('Should retrieve the correct failed collection for a create operation', () => {
    store.dispatch(setFetchRequestFailed('books', 'create', '1', { data: 1, status: 500 }));

    const createErrorCollection = getBooksCollectionCreateError(store.getState());
    const readErrorCollection = getBooksCollectionReadError(store.getState());

    expect(createErrorCollection).toHaveLength(1);
    expect(readErrorCollection).toHaveLength(0);
  });

  it('Should retrieve the correct failed collection for the given action payload ', () => {
    store.dispatch(setFetchRequestFailed('books', 'create', '1', { data: 'test', status: 500 }));

    const createErrorCollection = getBooksCollectionCreateError(store.getState());
    const getErrorByBookId = getErrorByParameter('bookId');

    expect(getErrorByBookId(createErrorCollection, '00')).toBe(undefined);
    expect(getErrorByBookId(createErrorCollection, '23')).toBe('test');
  });

  it('Should retrieve the correct failed state for a successful create operation', () => {
    store.dispatch(setFetchRequestSucceeded('books', 'create', '1', { data: 1, status: 200 }));
    const createError = getBooksCreateError(store.getState());
    expect(createError).toBe(undefined);
  });
});
