import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addSlotandDate } from '../../booking/bookingSlice';
const formatTime = (timeStr) => {

    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

const BookingForm = () => {
    const availability = useSelector(state => state.booking.availability)
    const slots = useSelector(state => state.booking.slots)
    const time_slot = useSelector(state => state.booking.timeSlot)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [filteredSlots, setFilteredSlots] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate <= currentDate) {
            setIsAvailable(false);
            setFilteredSlots([]);
            return;
        }


        const dayOfWeek = date.getDay();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const selectedDayName = dayNames[dayOfWeek];


        const dayAvailability = availability.find(avail => avail.day_of_week === selectedDayName);

        if (dayAvailability && dayAvailability.isAvailable) {
            setIsAvailable(true);
            setFilteredSlots(slots);
        } else {
            setIsAvailable(false);
            setFilteredSlots([]);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="mb-4">

                <div className="mt-4">
                    <h1 className="text-2xl font-medium text-gray-800 mb-2">Select The Day and Slot</h1>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText="Select date"
                        className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>




                {isAvailable ? (
                    filteredSlots.length > 0 ? (
                        <div className="flex flex-col  items-center justify-center flex-wrap gap-2 mt-4">
                            <p className="text-lg font-semibold text-gray-600 mb-2">{time_slot}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
                                {filteredSlots.map((timeSlot, index) => (
                                    <div
                                        key={index}
                                        className={`w-16 h-16 flex items-center justify-center border border-gray-300 rounded-md shadow-sm ${selectedSlot === timeSlot
                                            ? "bg-gray-200"
                                            : "bg-gray-50 hover:bg-gray-200"
                                            }`}
                                        onClick={() => setSelectedSlot(timeSlot)}
                                    >
                                        <p className="text-gray-700 text-sm">{formatTime(timeSlot)}</p>
                                    </div>
                                ))}
                            </div>


                        </div>
                    ) : (
                        <p className="text-gray-500">No slots available.</p>
                    )
                ) : (
                    <p className="text-red-500">Slots are not available for the selected day.</p>
                )}
                <button class="w-half mx-auto mt-4 rounded-xl bg-blue-600 px-6 py-3 text-xl font-medium text-white" onClick={() => { if (selectedDate && selectedSlot) { dispatch(addSlotandDate({ selectedDate, selectedSlot })); navigate("/checkoutForm") } else { alert("Select a day and slot") } }}>Proceed</button>
            </div>

        </div>

    );
};

export default BookingForm;
