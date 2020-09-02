import { Reducer, Store } from 'redux';

// We need to define the InjectReducer type extending the store the way we want
type InjectReducer = (name: string, reducer: Reducer) => () => void | undefined;
// We need to define the InjectSaga since type extending the store the way we want
type InjectSaga = (name: string, saga: () => Generator) => () => void;


interface StoreInjectors {
  injectReducer?: InjectReducer;
  injectSaga?: InjectSaga;
  asyncReducers?: any;
}

export type InjectableStore = Store & StoreInjectors;
