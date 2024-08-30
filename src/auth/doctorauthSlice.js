import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    name: null,
    email: null,
    phone: null,
    department: null,
    is_HOD: null,
    doc_image: null,
    role: null,
    doc_id: null,

}

const doctorauthSlice = createSlice({
    name: 'doctorauth',
    initialState,
    reducers: {
        docLogin(state, action) {
            state.isAuthenticated = true
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.department = action.payload.department;
            state.is_HOD = action.payload.is_HOD;
            state.doc_image = action.payload.doc_image;
            state.role = action.payload.role;
            state.doc_id = action.payload.doc_id
        },

        docLogout(state) {
            state.isAuthenticated = false;
            state.name = null;
            state.email = null;
            state.phone = null;
            state.department = null;
            state.is_HOD = null;
            state.doc_image = null;
            state.role = null;
            state.doc_id = null;

        }
    }
})
export const { docLogin, docLogout } = doctorauthSlice.actions;
export default doctorauthSlice.reducer;