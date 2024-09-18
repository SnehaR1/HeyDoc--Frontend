import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availability: [],
    slots: [],
    time_slot: null,
    doc_id: null,
    fee: null,
    selectedDate: null,
    selectedSlot: null,
    online: null,
    evening_slots: null,
    morning_slots: null,
    days_available: null,




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
            state.evening_slots = action.payload.evening_slots;
            state.morning_slots = action.payload.morning_slots;
            state.days_available = action.payload.days_available;


        },
        addSlotandDate(state, action) {
            state.selectedDate = action.payload.selectedDate;
            state.selectedSlot = action.payload.selectedSlot;
            state.online = action.payload.online;
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
            state.online = null;
            state.evening_slots = null;
            state.morning_slots = null;
            state.days_available = null;
        }
    }
})

export const { addBookingDetails, clearBookingDetails, addSlotandDate } = bookingSlice.actions;
export default bookingSlice.reducer;