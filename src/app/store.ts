import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from '../reducers/login/userSlice';

import { usersAPI } from '../reducers/users/usersAPI';
import { loginAPI } from '../reducers/login/loginAPI';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersAPI.middleware)
      .concat(loginAPI.middleware)
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
