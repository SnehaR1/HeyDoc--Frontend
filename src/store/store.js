import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authslice';
import doctorauthReducer from '../auth/doctorauthSlice';
import bookingReducer from '../booking/bookingSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        doctorauth: doctorauthReducer,
        booking: bookingReducer,
    },
})