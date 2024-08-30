import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    email: null,
    phone: null,
    username: null,
    role: null,
    is_staff: null,
    user_id: null



}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.is_staff = action.payload.is_staff;
            state.user_id = action.payload.user_id;
        },

        logout(state) {
            state.isAuthenticated = false;
            state.email = null;
            state.phone = null;
            state.username = null;
            state.role = null;
            state.is_staff = null;
            state.user_id = null;
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;