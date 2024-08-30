import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availability: [],
    slots: [],
    time_slot: null,
    doc_id: null,
    fee: null,
    selectedDate: null,
    selectedSlot: null,


}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBookingDetails(state, action) {
            state.availability = action.payload.availability;
            state.slots = action.payload.slots;
            state.time_slot = action.payload.time_slot;
            state.doc_id = action.payload.doc_id;
            state.fee = action.payload.fee;

        },
        addSlotandDate(state, action) {
            state.selectedDate = action.payload.selectedDate;
            state.selectedSlot = action.payload.selectedSlot;
        }
        ,
        clearBookingDetails(state) {
            state.availability = [];
            state.slots = [];
            state.time_slot = null;
            state.doc_id = null;
            state.fee = null;
            state.selectedDate = null;
            state.selectedSlot = null;
        }
    }
})

export const { addBookingDetails, clearBookingDetails, addSlotandDate } = bookingSlice.actions;
export default bookingSlice.reducer;