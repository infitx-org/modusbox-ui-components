import { Reducer, Store } from 'redux';

// We need to define the InjectReducerAndSaga type extending the store the way we want
type InjectReducerAndSaga = (reducer: Reducer, saga: () => Generator) => string;

interface StoreInjectors {
  injectReducerAndSaga: InjectReducerAndSaga;
  asyncReducers?: any;
}

export type InjectableStore = Store & StoreInjectors;
