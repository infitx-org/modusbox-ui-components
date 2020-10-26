import { useState, useEffect} from 'react';
import { Reducer } from 'redux';
import { useStore } from 'react-redux';
import { InjectableStore } from '../injectors/types';

type Saga = () => Generator;

// Installs the reducer on the parent app and makes sure it is used
const useReducerLoader = (reducerFn: Reducer, saga: Saga) => {
  const store = useStore() as InjectableStore;
  const [ready, setReady] = useState(false);
  const [clone, setClone] = useState(store);

  useEffect(() => {
    function injectAndGetStoreInstance() {
      const assignedPath = store.injectReducerAndSaga(reducerFn, saga);
      setClone(
        Object.assign(Object.create(Object.getPrototypeOf(store)), store, {
          getState: function getState() {
            return store.getState()[assignedPath];
          },
        }),
      );
      setReady(true);
    }
    injectAndGetStoreInstance();
  }, []);

  if (ready) {
    return clone;
  }
  return false;
};

export { useReducerLoader };
