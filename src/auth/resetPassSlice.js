import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: false,
    email: null,
    phone: null,
    otp_verified: false  // Ensure this matches the usage elsewhere
};

const resetPassSlice = createSlice({
    name: 'resetPass',
    initialState,
    reducers: {
        userConfirmation(state, action) {
            state.isUser = true;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        otpVerified(state) {
            state.otp_verified = true;  // This should update the state correctly
        },
        removeResetPassInfo(state) {
            state.isUser = false;
            state.email = null;
            state.phone = null;
            state.otp_verified = false;
        }
    }
});

export const { userConfirmation, otpVerified, removeResetPassInfo } = resetPassSlice.actions;


export default resetPassSlice.reducer;
