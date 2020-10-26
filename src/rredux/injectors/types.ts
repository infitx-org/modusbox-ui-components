import { Reducer, Store } from 'redux';

export type Saga = () => Generator;
export type SagaRunner = (Saga: Saga) => number;
export type SagaInjector = (key: string, saga: Saga) => void;

// We need to define the InjectReducerAndSaga type extending the store the way we want
type InjectReducerAndSaga = (reducer: Reducer, saga: Saga) => string;

interface StoreInjectors {
  injectReducerAndSaga: InjectReducerAndSaga;
  asyncReducers?: any;
}

export type InjectableStore = Store & StoreInjectors;
