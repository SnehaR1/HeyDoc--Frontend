// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


import authReducer from '../auth/authslice';
import doctorauthReducer from '../auth/doctorauthSlice';
import bookingReducer from '../booking/bookingSlice';


const persistConfig = {
    key: 'root',
    storage,
};


const rootReducer = combineReducers({
    auth: authReducer,
    doctorauth: doctorauthReducer,
    booking: bookingReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
});


export const persistor = persistStore(store);
