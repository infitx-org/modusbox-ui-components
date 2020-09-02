import { Store, combineReducers } from 'redux';

interface StoreInjectors {
  injectReducer?: any;
  injectSaga?: any;
  asyncReducers?: any;
}

export type InjectableStore = Store & StoreInjectors;
