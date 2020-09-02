import { Store, Reducer, combineReducers } from 'redux';
import { InjectableStore } from './types';

function addReducerInjector(store: Store, reducer: Record<string, Reducer>): InjectableStore {
  // Inject microfrontend reducers
  // @ts-ignore
  const asyncReducers = {};
  return {
    ...store,
    asyncReducers,
    // @ts-ignore
    injectReducer: (key: string, asyncReducer: Reducer): void => {
      Object.assign(asyncReducers, { [key]: asyncReducer });

      store.replaceReducer(
        combineReducers({
          ...reducer,
          ...asyncReducers,
        }),
      );
    },
  };
}

// @ts-ignore
function createSagaInjector(runSaga, rootSaga) {
  // Create a dictionary to keep track of injected sagas
  const injectedSagas = new Map();
  const isInjected = (key: string) => injectedSagas.has(key);
  // @ts-ignore
  const injectSaga = (key: string, saga: any) => {
    // We won't run saga if it is already injected
    if (isInjected(key)) return;
    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga);
    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task);
  };

  // Inject the root saga as it is a staticlly loaded file
  injectSaga('root', rootSaga);

  return injectSaga;
}

// @ts-ignore
function addSagaInjector(store: Store, runSaga, rootSaga) {
  return {
    ...store,
    // @ts-ignore
    injectSaga: createSagaInjector(runSaga, rootSaga),
  };
}

export { addSagaInjector, addReducerInjector };
