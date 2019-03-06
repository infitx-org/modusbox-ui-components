const esc = encodeURIComponent;

// FIXME: one of our dependencies already has a dependency on a uuid library (see yarn.lock). We
// should just use that library it probably has tests.
const uuid = () => {
  let _uuid = '';
  let i;
  let random;
  for (i = 0; i < 32; i += 1) {
    random = (Math.random() * 16) | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      _uuid += '-';
    }
    let sum = 0;
    if (i === 12) {
      sum = 4;
    } else if (i === 16) {
      sum = (random & 3) | 8;
    } else {
      sum = random;
    }
    _uuid += sum.toString(16);
  }
  return _uuid;
};

const buildServiceConfig = (config = {}, state) => {
  if (typeof config.getApplicationUrl !== 'function') {
    // always return an empty string
    config.getApplicationUrl = () => '';
  }

  if (typeof config.getApplicationHeaders !== 'function') {
    // always return an empty object
    config.getApplicationHeaders = () => ({});
  }

  return {
    ...config,
    url: config.getApplicationUrl(state),
    headers: config.getApplicationHeaders(state),
  };
};

const buildEndpointConfig = (config = {}, state) => {
  let endpointUrl = config.url;

  if (typeof config.url === 'function') {
    endpointUrl = config.url(config);
  }

  return {
    ...config,
    url: endpointUrl,
  };
};

const buildConfig = (endpointConfig = {}, serviceConfig = {}) => {
  const defaultConfig = {
    url: undefined,
    headers: {},
    credentials: undefined,
    handleData: undefined,
    handleError: undefined,
    sendAsJson: true,
    parseAsJson: true,
    parseAsText: true,
  };

  // build the headers separately since they would
  // be overwritten when merging the config objects
  const headers = {
    ...defaultConfig.headers,
    ...serviceConfig.headers,
    ...endpointConfig.headers,
  };

  const config = {
    ...defaultConfig,
    ...serviceConfig,
    ...endpointConfig,
    headers,
  };

  config.url = `${serviceConfig.url}${endpointConfig.url}`;

  if (config.sendAsJson) {
    config.headers['content-type'] = 'application/json';
  }
  return config;
};

const buildQueryString = params => {
  const parts = Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`);
  return `${parts.join('&')}`;
};

const buildRequestUrl = (url, queryParams = {}) => {
  if (queryParams === null) {
    // default argument is not applied when passing null
    // since null is actually a valid value
    return url;
  }

  if (Object.keys(queryParams).length > 0) {
    url = `${url}?${buildQueryString(queryParams)}`;
  }
  return url;
};

const buildRequestConfig = (method, body = null, headers, credentials) => {
  const requestConfig = {
    method,
    headers,
    credentials,
  };

  if (body !== null && headers['content-type'] === 'application/json') {
    requestConfig.body = JSON.stringify(body);
  } else {
    requestConfig.body = body;
  }

  return requestConfig;
};

// The known request config keys
const knownRequestKeys = [
  'name',
  'service',
  'method',
  'crud',
  'url',
  'body',
  'headers',
  'params',
  'credentials',
  'handleData',
  'handleError',
  'sendAsJson',
  'parseAsJson',
  'parseAsText',
];

const getEndpointVariables = config => {
  // retrieve the endpoints config variables by removing
  // all the known keys from the config object

  const endpointVariables = {};

  Object.entries(config).forEach(([key, value]) => {
    if (!knownRequestKeys.includes(key)) {
      endpointVariables[key] = value;
    }
  });

  return endpointVariables;
};

export {
  uuid,
  buildServiceConfig,
  buildEndpointConfig,
  buildConfig,
  buildRequestConfig,
  buildRequestUrl,
  getEndpointVariables,
};
