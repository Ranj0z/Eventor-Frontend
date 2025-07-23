// src/app/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from '../reducers/Login/userSlice';

import { usersAPI } from '../reducers/Users/usersAPI';
import { loginAPI } from '../reducers/Login/loginAPI';
import { eventsAPI } from '../reducers/Events/eventsAPI';
import { paymentsAPI } from '../reducers/Payments/paymentsAPI';
import { rsvpAPI } from '../reducers/RSVP/rsvpAPI';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [eventsAPI.reducerPath]: eventsAPI.reducer,
  [paymentsAPI.reducerPath]: paymentsAPI.reducer,
  [rsvpAPI.reducerPath]: rsvpAPI.reducer,
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
      .concat(eventsAPI.middleware)
      .concat(paymentsAPI.middleware)
      .concat(rsvpAPI.middleware),
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
