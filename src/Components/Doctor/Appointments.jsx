import React, { useState, useEffect } from 'react';
import { doctorapi } from '../../api';
import { useSelector } from 'react-redux';
import DocNavBar from './DocNavBar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
    const doc_id = useSelector(state => state.doctorauth.doc_id);
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await doctorapi.get("appointments/", {
                    params: { "doc_id": doc_id },
                });
                console.log(response); // Check response structure
                setAllAppointments(response.data.appointments);
                setAppointments(response.data.appointments); // Set appointments initially
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
    }, [doc_id, refresh]);

    const handleFilter = (e) => {
        e.preventDefault();


        if (!date) {
            alert("Please enter a date.");
            return;
        }

        const filteredAppointments = allAppointments.filter(
            appointment => appointment.booked_day === date
        );


        console.log(filteredAppointments);

        setAppointments(filteredAppointments);
    };

    return (
        <div>
            <DocNavBar />
            <h1 className='text-blue-800 text-2xl my-4 font-bold'>Appointments</h1>
            <div className="relative overflow-x-auto flex flex-col justify-center items-center my-4">
                <form className="max-w-lg mx-auto mb-4 mt-6" onSubmit={handleFilter} >
                    <div className="flex flex-row items-center space-x-4">
                        <button className='bg-blue-600 py-2 px-6 rounded-md text-white font-bold' onClick={() => { setRefresh(refresh => !refresh); }}>All</button>


                        <div className="relative flex-grow">

                            <input
                                onChange={(e) => setDate(e.target.value)}

                                type="search"
                                id="search-dropdown"
                                className="block py-2.5 px-12 mr-6 w-full text-sm rounded-lg text-gray-900 bg-gray-50 rounded-r-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Enter Date : YYYY-MM-DD"

                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>

                {appointments.length > 0 ? (
                    <table className="w-3/4 mx-4 text-sm text-left rtl:text-right text-gray-500 my-4">
                        <thead className="text-xs text-white uppercase bg-blue-900">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Patient</th>
                                <th scope="col" className="px-6 py-3">Appointment Date</th>
                                <th scope="col" className="px-6 py-3">Time</th>
                                <th scope="col" className="px-6 py-3">Consultation Mode</th>
                                <th scope="col" className="px-6 py-3">Payment Status</th>
                                <th scope="col" className="px-6 py-3">Booking Day</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, key) => (
                                <tr key={key} className="bg-white border-b dark:bg-gray-800">
                                    <td className="px-6 py-4">{appointment.id}</td>
                                    <td className="px-6 py-4">{appointment.patient.name}</td>
                                    <td className="px-6 py-4">{appointment.booked_day}</td>
                                    <td className="px-6 py-4">{appointment.time_slot}</td>
                                    <td className="px-6 py-4">{appointment.consultation_mode}</td>
                                    <td className="px-6 py-4">{appointment.payment_status}</td>
                                    <td className="px-6 py-4">{appointment.date_of_booking}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='flex justify-center items-center my-32'>
                        <h3 className='text-2xl text-blue-700'>No Appointments</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Appointments;
