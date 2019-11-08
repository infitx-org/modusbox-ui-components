import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { buildFetchActions, fetch } from '../actions';
import fetchMiddleware from '../middleware';

const mockStore = configureStore([thunk, fetchMiddleware()]);

const defaultTestSvc = {
  getApplicationUrl: () => `/test-svc`,
  getApplicationHeaders: () => ({
    'svc-header': 'svc-header-value',
  }),
};

const defaultTestEndpoint = {
  service: defaultTestSvc,
  url: `/test-url`,
};

const defaultOtherEndpoint = {
  service: defaultTestSvc,
  url: '/other-url',
};

const endpointsCfgs = {};
let store = null;
const initialState = {};

describe('Build the requests correctly', () => {
  beforeEach(() => {
    // reset the store
    store = mockStore(initialState);

    // reset the fetch mock utility
    fetchMock.reset();

    // reset services and endpoints configurations to default
    endpointsCfgs.testEndpoint = { ...defaultTestEndpoint };
    endpointsCfgs.otherEndpoint = { ...defaultOtherEndpoint };
  });

  it('Should fetch with no service or endpoint config', async () => {
    fetchMock.get('*', {});

    const action = fetch({ url: '/test' });
    await store.dispatch(action);
    const [[url]] = fetchMock.calls();

    expect(url).toEqual('/test');
  });

  it('Should apply the query params to the url', async () => {
    fetchMock.get('*', {});

    const action = fetch({ url: '/test', params: { foo: 'bar', bar: 'foo' } });
    await store.dispatch(action);

    const [[url]] = fetchMock.calls();

    const params = url
      .split('?')[1]
      .split('&')
      .reduce((prev, param) => {
        const [key, value] = param.split('=');
        return {
          ...prev,
          [key]: value,
        };
      }, {});

    expect(params.foo).toBe('bar');
    expect(params.bar).toBe('foo');
  });

  it('Should set the credentials', async () => {
    fetchMock.get('*', {});

    const action = fetch({ url: '/test', credentials: 'include' });
    await store.dispatch(action);

    const [[, config]] = fetchMock.calls();
    expect(config.credentials).toBe('include');
  });

  it('Should build the correct actions tree', () => {
    const actions = buildFetchActions(endpointsCfgs);
    const actionNames = Object.keys(actions);
    const methods = Object.keys(actions.testEndpoint);

    expect(actionNames).toHaveLength(2);
    expect(actions.testEndpoint).not.toBeUndefined();
    expect(methods).toHaveLength(5);
  });

  it('Should build the request url correctly', async () => {
    endpointsCfgs.testEndpoint.url = ({ id }) => `/test-url/${id}`;

    fetchMock.get('*', {});
    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read({ id: 'test-id' });

    await store.dispatch(action);
    const [call] = fetchMock.calls();
    const [url] = call;

    expect(url).toBe('/test-svc/test-url/test-id');
  });

  it('Should build the request headers correctly', async () => {
    fetchMock.get('*', {});

    endpointsCfgs.testEndpoint.headers = { 'endpoint-header': 'endpoint-header-value' };

    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read({ headers: { 'req-header': 'req-header-value' } });

    await store.dispatch(action);
    const [call] = fetchMock.calls();
    const [, { headers }] = call;

    expect(headers['endpoint-header']).toBe('endpoint-header-value');
    expect(headers['req-header']).toBe('req-header-value');
    expect(headers['svc-header']).toBe('svc-header-value');
  });

  it('Should override the service headers when set directly', async () => {
    fetchMock.get('*', {});

    defaultTestSvc.getApplicationHeaders = () => ({
      'my-header': 'my-header-value',
    });

    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read({
      headers: { 'my-header': 'overidden-header-value' },
    });

    await store.dispatch(action);
    const [call] = fetchMock.calls();
    const [, { headers }] = call;

    expect(headers['my-header']).toBe('overidden-header-value');
  });

  it('Should transform the credentials dynamically', async () => {
    fetchMock.get('*', {});

    defaultTestSvc.credentials = state => (state ? 'same-site' : 'include');
    endpointsCfgs.testEndpoint.credentials = undefined;

    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read();

    await store.dispatch(action);
    const [[, config]] = fetchMock.calls();
    expect(config.credentials).toBe('same-site');
  });

  it('Should override the credentials dynamically', async () => {
    fetchMock.get('*', {});

    defaultTestSvc.credentials = state => (state ? 'same-site' : 'include');
    endpointsCfgs.testEndpoint.credentials = null;

    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read();

    await store.dispatch(action);
    const [[, config]] = fetchMock.calls();
    expect(config.credentials).toBe(null);
  });
});

describe('Builds the responses correctly', () => {
  beforeEach(() => {
    // reset the store
    store = mockStore(initialState);
    // reset the fetch mock utility
    fetchMock.reset();
    // reset services and endpoints configurations to default
    endpointsCfgs.testEndpoint = { ...defaultTestEndpoint };
    endpointsCfgs.otherEndpoint = { ...defaultOtherEndpoint };
  });

  it('Should return status code and the data key', async () => {
    fetchMock.get('*', {
      status: 200,
      body: 'null',
      headers: { 'content-type': 'text/plain' },
    });
    const action = fetch({ url: '/test', parseAsText: true });
    const response = await store.dispatch(action);

    expect(response.data).toBeDefined();
    expect(response.status).toBeDefined();
  });

  it('Should return the correct status codes', async () => {
    const statusCodes = [200, 201, 204, 400, 401, 404, 500];
    const action = fetch({ url: '/test' });

    for (let i = 0; i < statusCodes.length; i += 1) {
      const statusCode = statusCodes[i];
      fetchMock.reset();
      fetchMock.get('*', { status: statusCode });
      // eslint-disable-next-line
      const response = await store.dispatch(action);
      expect(response.status).toBe(statusCode);
    }
  });

  it('Should return the correct body', async () => {
    fetchMock.get('*', { body: 'test' });
    const action = fetch({ url: '/test' });

    const response = await store.dispatch(action);
    expect(response.data).toBe('test');
  });

  it('Should send the body as url encoded if set', async () => {
    fetchMock.get('*', 200);
    const action = fetch({
      url: '/test',
      sendAsFormUrlEncoded: true,
      body: { test: 'key', value: 'x' },
    });

    await store.dispatch(action);

    const [call] = fetchMock.calls();
    const [, config] = call;
    expect(config.body).toBe('test=key&value=x');
    expect(config.headers['content-type']).toBe('application/x-www-form-urlencoded');
  });

  it('Should parse the body as json by default', async () => {
    fetchMock.get('*', { body: { key: 'value' }, headers: { 'content-type': 'application/json' } });
    const action = fetch({ url: '/test' });

    const response = await store.dispatch(action);
    expect(typeof response.data).toBe('object');
  });

  it('Should not parse the body as json if specified in the configuration', async () => {
    fetchMock.get('*', { body: { key: 'value' }, headers: { 'content-type': 'application/json' } });
    const action = fetch({ url: '/test', parseAsJson: false });

    const response = await store.dispatch(action);
    expect(typeof response.data).toBe('string');
  });

  it('Should not parse the body as json if the content type header is not application/json', async () => {
    fetchMock.get('*', { body: { key: 'value' }, headers: { 'content-type': 'text/plain' } });
    const action = fetch({ url: '/test', parseAsJson: false });

    const response = await store.dispatch(action);
    expect(typeof response.data).toBe('string');
  });

  it('Should transform the data with "handleData"', async () => {
    fetchMock.get('*', {
      body: { value: 10 },
      headers: { 'content-type': 'application/json' },
    });

    endpointsCfgs.testEndpoint.parseAsJson = true;
    endpointsCfgs.testEndpoint.handleData = data => {
      data.value = 'MAGIC_NUMBER';
      return data;
    };

    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read();
    const response = await store.dispatch(action);
    expect(response.data.value).toBe('MAGIC_NUMBER');
  });

  it('Should handle the authentication with "handleError"', async () => {
    const handleErrorStatus = jest.fn();
    const handleErrorBody = jest.fn();
    fetchMock.get('*', {
      status: 401,
      body: 'Unauthorized',
      headers: { 'content-type': 'text/plain' },
    });

    endpointsCfgs.testEndpoint.handleError = (error, status) => {
      handleErrorStatus(status);
      handleErrorBody(error);
    };

    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read();
    await store.dispatch(action);

    expect(handleErrorStatus).toHaveBeenCalledWith(401);
    expect(handleErrorBody).toHaveBeenCalledWith('Unauthorized');
  });

  it('Should transform the error with "handleError"', async () => {
    fetchMock.get('*', {
      status: 400,
      body: 'Bad Request',
    });

    endpointsCfgs.testEndpoint.handleError = () => 'transformed';

    const actions = buildFetchActions(endpointsCfgs);
    const action = actions.testEndpoint.read();
    const response = await store.dispatch(action);

    expect(response.status).toEqual(400);
    expect(response.data).toEqual('transformed');
  });
});
