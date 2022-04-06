import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {rootReducer} from './roots';
import {applyMiddleware, compose} from '@reduxjs/toolkit';
import tron from '@config/dev/reactotron';

/*
  Redux Persistance Configuration
  Note:
  - to persist / save the state in memory
  - put the state that u don't want to persist on the blacklist attribute
  - put the state that u want to persist on the whitelist attribute
*/
const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  blacklist: ['download'],
  whiteList: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(), tron.createEnhancer!()),
);
export const persistor = persistStore(store);

/*
  Root state is used for defining the State of the redux
  Note:
  - very useful to use when using useSelector (ex: useSelector<RootState, T>(state))
    RootState will give the state a type of RootState, if we don't give RootState as a generic type
    then it will be valued as any
*/
export type RootState = ReturnType<typeof store.getState>;

export * from './reducers';
