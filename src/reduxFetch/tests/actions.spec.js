import {
  FETCH,
  fetch,
  SET_FETCH_STATUS,
  setFetchStatus,
  UNSET_FETCH_STATUS,
  unsetFetchStatus,
} from '../actions';

describe('Returns the correct action descriptions', () => {
  it('Should match the generic fetch action type', () => {
    expect(FETCH).toEqual('@@ReduxFetch / Fetch');
  });

  it('Should match the "setFetchStatus" action type', () => {
    expect(SET_FETCH_STATUS).toEqual('@@ReduxFetch / Set fetch action status');
  });

  it('Should match the "unsetFetchStatus" action type', () => {
    expect(UNSET_FETCH_STATUS).toEqual('@@ReduxFetch / Unset fetch action status');
  });
});

describe('Builds the actions correctly', () => {
  it('Should build the correct "fetch" action object', () => {
    const action = fetch('test-config');
    expect(action.type).toEqual(FETCH);
    expect(action.config).toEqual('test-config');
  });

  it('Should build the correct "setFetchStatus" action', () => {
    const action = setFetchStatus('name', 'get', null, { 'content-type': null }, '1');

    expect(action.type).toEqual(SET_FETCH_STATUS);
    expect(action.payload).toEqual(null);
    expect(action.request).toEqual({ 'content-type': null });
    expect(action.crud).toEqual('get');
    expect(action.name).toEqual('name');
    expect(action.id).toEqual('1');
  });

  it('Should build the correct "unsetFetchStatus" action', () => {
    const action = unsetFetchStatus('name', 'get', '1');

    expect(action.type).toEqual(UNSET_FETCH_STATUS);
    expect(action.crud).toEqual('get');
    expect(action.name).toEqual('name');
    expect(action.id).toEqual('1');
  });
});
