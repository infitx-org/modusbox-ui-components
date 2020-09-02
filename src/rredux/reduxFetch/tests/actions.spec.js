import {
  FETCH,
  fetch,
  SET_FETCH_REQUEST_FAILED,
  SET_FETCH_REQUEST_SENT,
  SET_FETCH_REQUEST_SUCCEEDED,
  setFetchRequestSent,
  setFetchRequestSucceeded,
} from '../actions';

describe('Returns the correct action descriptions', () => {
  it('Should match the generic fetch action type', () => {
    expect(FETCH).toEqual('@@ReduxFetch / Fetch');
  });

  it('Should match the "setFetchRequestSent" action type', () => {
    expect(SET_FETCH_REQUEST_SENT).toEqual('@@ReduxFetch / Set fetch request sent');
  });

  it('Should match the "setFetchRequestSucceeded" action type', () => {
    expect(SET_FETCH_REQUEST_SUCCEEDED).toEqual('@@ReduxFetch / Set fetch request succeeded');
  });

  it('Should match the "setFetchRequestFailed" action type', () => {
    expect(SET_FETCH_REQUEST_FAILED).toEqual('@@ReduxFetch / Set fetch request failed');
  });
});

describe('Builds the actions correctly', () => {
  it('Should build the correct "fetch" action object', () => {
    const action = fetch('test-config');
    expect(action.type).toEqual(FETCH);
    expect(action.config).toEqual('test-config');
  });

  it('Should build the correct "setFetchRequestSent" action', () => {
    const action = setFetchRequestSent('name', 'get', null, { 'content-type': null }, '1');

    expect(action.type).toEqual(SET_FETCH_REQUEST_SENT);
    expect(action.payload).toEqual(null);
    expect(action.request).toEqual({ 'content-type': null });
    expect(action.crud).toEqual('get');
    expect(action.name).toEqual('name');
    expect(action.id).toEqual('1');
  });

  it('Should build the correct "setFetchRequestSucceeded" action', () => {
    const action = setFetchRequestSucceeded('name', 'get', '1');

    expect(action.type).toEqual(SET_FETCH_REQUEST_SUCCEEDED);
    expect(action.crud).toEqual('get');
    expect(action.name).toEqual('name');
    expect(action.id).toEqual('1');
  });
});
