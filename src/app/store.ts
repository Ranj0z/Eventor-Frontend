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
import { venuesAPI } from '../reducers/Venues/venuesAPI';
import { ticketsAPI } from '../reducers/Tickets/ticketsAPI'; // Add this import

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
  [venuesAPI.reducerPath]: venuesAPI.reducer,
  [paymentsAPI.reducerPath]: paymentsAPI.reducer,
  [rsvpAPI.reducerPath]: rsvpAPI.reducer,
  [ticketsAPI.reducerPath]: ticketsAPI.reducer, // Add this line
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
      .concat(venuesAPI.middleware)
      .concat(paymentsAPI.middleware)
      .concat(rsvpAPI.middleware)
      .concat(ticketsAPI.middleware), // Add this line
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;