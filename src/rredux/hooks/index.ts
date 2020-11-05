import { useState, useEffect } from 'react';
import { Reducer } from 'redux';
import { useStore } from 'react-redux';
import { Saga } from '@redux-saga/types';
import { InjectableStore } from '../injectors/types';

// Installs the reducer on the parent app and makes sure it is used
const useChildStore = (reducer: Reducer, saga: Saga) => {
  const store = useStore() as InjectableStore;
  const [childStore, setChildStore] = useState(null);

  useEffect(() => {
    function injectAndGetStoreInstance() {
      const childStore = store.inject({ reducer, saga });
      setChildStore(childStore);
    }
    injectAndGetStoreInstance();
  }, []);

  return childStore;
};

export { useChildStore };
