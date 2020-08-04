import { buildFetchActions, fetch } from './actions';
import fetchMiddleware from './middleware';
import reducers from './reducers';
import {
  createApiSelector,
  createCollectionSelector,
  createDataSelector,
  createErrorSelector,
  createPendingSelector,
  getDataByParameter,
  getErrorByParameter,
  getPendingByParameter,
} from './selectors';

export default fetchMiddleware;
export {
  reducers,
  fetch,
  buildFetchActions,
  createCollectionSelector,
  createApiSelector,
  createPendingSelector,
  createErrorSelector,
  createDataSelector,
  getErrorByParameter,
  getDataByParameter,
  getPendingByParameter,
};
