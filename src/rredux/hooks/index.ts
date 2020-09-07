import { useState, useEffect} from 'react';
import { Reducer } from 'redux';
import { useStore } from 'react-redux';
import { InjectableStore } from '../types';

type Saga = () => Generator;

// Installs the reducer on the parent app and makes sure it is used
const useReducerLoader = (name: string, reducerFn: Reducer, saga: Saga) => {
  const store = useStore() as InjectableStore;
  const [isReducerLoaded, setReducerLoaded] = useState(false);

  useEffect(() => {
    store.injectReducer(name, reducerFn);
    store.injectSaga(name, saga);
  }, []);

  useEffect(() => {
    if (!isReducerLoaded && store.getState()[name] !== undefined) {
      setReducerLoaded(true);
    }
  }, []);
  return isReducerLoaded;
};


export { useReducerLoader }