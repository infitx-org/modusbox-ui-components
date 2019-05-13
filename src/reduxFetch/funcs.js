const esc = encodeURIComponent;
const urlEncode = body => Object.keys(body).map(key => `${esc(key)}=${esc(body[key])}`).join('&')

const buildServiceConfig = (initialConfig = {}, state) => {
  const config = { ...initialConfig };
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

const buildEndpointConfig = (config = {}) => {
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
    body: undefined,
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

  if (config.sendAsFormUrlEncoded) {
    config.headers['content-type'] = 'application/x-www-form-urlencoded';
    config.body = urlEncode(config.body);
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
    return `${url}?${buildQueryString(queryParams)}`;
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
  'sendAsFormUrlEncoded',
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
  buildServiceConfig,
  buildEndpointConfig,
  buildConfig,
  buildRequestConfig,
  buildRequestUrl,
  getEndpointVariables,
};
