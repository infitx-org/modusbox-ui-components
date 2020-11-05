import { useState, useEffect } from 'react';
import { Reducer } from 'redux';
import { useStore } from 'react-redux';
import { Saga } from '@redux-saga/types';
import { InjectableStore } from '../injectors/types';

// Installs the reducer on the parent app and makes sure it is used
const useReducerLoader = (reducer: Reducer, saga: Saga) => {
  const store = useStore() as InjectableStore;
  const [clone, setClone] = useState(null);

  useEffect(() => {
    function injectAndGetStoreInstance() {
      const assignedPath = store.inject({ reducer, saga });
      setClone(assignedPath);
    }
    injectAndGetStoreInstance();
  }, []);

  return clone;
};

export { useReducerLoader };
