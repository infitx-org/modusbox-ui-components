import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from '../middleware';
import api from '../reducers';
import { buildFetchActions } from '../actions';
import {
  createPendingSelector,
  createPendingCollectionSelector,
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

const createSelector = createPendingSelector('books.create');
const readSelector = createPendingSelector('books.read');

const createCollectionSelector = createPendingCollectionSelector('books.create');
const readCollectionSelector = createPendingCollectionSelector('books.read');

describe('Sets the pending state correctly', () => {
  beforeEach(() => {
    // reset the store
    store = getStore(undefined);
  });

  it('Should retrieve the correct pending state for a craete operation', () => {
    const action = actions.books.create({ body: 'test' });
    store.dispatch(action);

    const isCreatePending = createSelector(store.getState());
    const isReadPending = readSelector(store.getState());

    expect(isCreatePending).toBeTruthy();
    expect(isReadPending).toBeFalsy();
  });

  it('Should retrieve the correct pending collection for a create operation', () => {
    const action = actions.books.read({ bookId: '23' });
    store.dispatch(action);

    const createCollection = createCollectionSelector(store.getState());
    const readCollection = readCollectionSelector(store.getState());

    expect(createCollection.length).toBe(0);
    expect(readCollection.length).toBe(1);
  });

  it('Should retrieve the correct pending collection for the given action payload ', () => {
    const action = actions.books.read({ bookId: '23' });
    store.dispatch(action);

    const createCollection = createCollectionSelector(store.getState());
    const readCollection = readCollectionSelector(store.getState());

    const pendingByBookId = getPendingByParameter('bookId');

    expect(pendingByBookId(readCollection, '00')).toBe(false);
    expect(pendingByBookId(readCollection, '23')).toBe(true);
  });
});
