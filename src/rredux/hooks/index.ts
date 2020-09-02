import { useState, useEffect} from 'react';
import { Reducer } from 'redux';
import { useStore } from 'react-redux';
import { InjectableStore } from '../types';


// Installs the reducer on the parent app and makes sure it is used
const useReducerLoader = (name: string, reducerFunction: Reducer, sagas: () => Generator) => {
  const store = useStore() as InjectableStore;
  const [isReducerLoaded, setReducerLoaded] = useState(false);

  useEffect(() => {
    // we inject the reducer at runtime
    store.injectReducer(name, reducerFunction);
    // we inject the saga at runtime
    store.injectSaga(name, sagas);
  }, []);

  useEffect(() => {
    if (!isReducerLoaded && store.getState()[name] !== undefined) {
      setReducerLoaded(true);
    }
  }, []);
  return isReducerLoaded;
};


export { useReducerLoader }