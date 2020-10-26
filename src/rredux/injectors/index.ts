import uuid from 'common/uuid';
import { Store, Reducer, combineReducers } from 'redux';
import { InjectableStore, Saga, SagaRunner, SagaInjector } from './types';

function createSagaInjector(runSaga: SagaRunner, rootSaga: Saga): SagaInjector {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();
  const isInjected = (key: string) => injectedSagas.has(key);
  const injectSaga: SagaInjector = (key: string, saga: Saga) => {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;
    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);
    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  // Inject the root saga as it is a statically loaded file
  injectSaga('root', rootSaga);

  return injectSaga;
}

// @ts-ignore
function addInjectors(
  store: Store,
  reducer: Record<string, Reducer>,
  rootSaga: Saga,
  runSaga: SagaRunner,
): InjectableStore {
  // Inject microfrontend reducers and sagas
  const asyncReducers: Record<string, Reducer> = {};
  return {
    ...store,
    asyncReducers,
    injectReducerAndSaga: (asyncReducer: Reducer, asyncSaga): string => {
      const path = uuid();
      const sagaInjector = createSagaInjector(runSaga, rootSaga);
      Object.assign(asyncReducers, { [path]: asyncReducer });

      store.replaceReducer(
        combineReducers({
          ...reducer,
          ...asyncReducers,
        }),
      );

      sagaInjector(path, asyncSaga);

      return path;
    },
  };
}



export { addInjectors };

export type {
  InjectableStore
};