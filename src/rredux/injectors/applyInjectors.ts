import hash from 'object-hash';
import { combineReducers, Reducer, Store, StoreCreator, AnyAction } from 'redux';
import { Saga, Task } from '@redux-saga/types';
import { SagaRunner, SagaInjector, ReducerMap, ReducerInjector, InjectableStore } from './types';

function createSagaInjector(runSaga: SagaRunner): SagaInjector {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();

  return function sagaInjector(key: string, saga: Saga) {
    // We won't run saga if it is already injected
    // Sagas return task when they executed, which can be used to cancel them
    // Save the task if we want to cancel it in the future
    if (injectedSagas.has(key)) {
      return;
    }
    const task = runSaga(saga);
    injectedSagas.set(key, task);
  };
}

function createReducerInjector(
  replaceReducer: (reducer: Reducer) => void,
  reducers: ReducerMap,
): ReducerInjector {
  const asyncReducers: ReducerMap = {};

  return function reducerInjector(asyncReducer: Reducer): string {
    const hashValue = hash(asyncReducer(undefined, {} as AnyAction));

    // do not replace reducer if already mounted
    if (!(hashValue in asyncReducers)) {
      // save new reducer
      Object.assign(asyncReducers, { [hashValue]: asyncReducer });

      replaceReducer(
        combineReducers({
          ...reducers,
          ...asyncReducers,
        }),
      );
    }

    return hashValue;
  };
}

function createInjectors(injectSaga: SagaInjector, injectReducer: ReducerInjector) {
  return function inject(asyncReducer: Reducer, asyncSaga: Saga): string {
    const hashValue = injectReducer(asyncReducer);

    if (asyncSaga) {
      // let's run the child app sagas by using the same unique hashValue
      injectSaga(hashValue, asyncSaga);
    }

    return hashValue;
  };
}

function addInjectors(store: Store, reducers: ReducerMap, sagaRunner: SagaRunner): InjectableStore {
  // Create injectors
  const sagaInjector = createSagaInjector(sagaRunner);
  const reducerInjector = createReducerInjector(store.replaceReducer, reducers);

  // Create inject function to expose on store object
  const injector = createInjectors(sagaInjector, reducerInjector);

  return {
    ...store,
    inject: ({ reducer, saga }) => {
      const path = injector(reducer, saga);
      return {
        ...store,
        getState: () => store.getState()[path],
      };
    },
  };
}

// Creates the composer
function applyInjectors({
  staticReducers,
  sagaRunner,
}: {
  staticReducers: ReducerMap;
  sagaRunner: SagaRunner;
}) {
  return (createStore: StoreCreator) => {
    return function injectStoreCreator(reducerFn: Reducer, preloadedState: ReturnType<Reducer>) {
      const store = createStore(reducerFn, preloadedState);
      return addInjectors(store, staticReducers, sagaRunner);
    };
  };
}

export default applyInjectors;
