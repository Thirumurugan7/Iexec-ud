// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import numberSlice from './numberSlice';
import cartSlice from './cartSlice'; // Import cartSlice

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  number: numberSlice,
  cart: cartSlice, // Add cartSlice to the rootReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
