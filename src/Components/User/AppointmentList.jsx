import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { adminapi, api } from '../../api';
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
function AppointmentList() {
    const user = useSelector(state => state.auth.user_id)
    const [appointments, setAppointments] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState(null)
    const [message, setMessage] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [patient, setPatient] = useState(null)
    const navigate = useNavigate()
    function formatTime24to12(timeStr) {
        const [hour, minute] = timeStr.split(':');
        const hours = parseInt(hour, 10);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const adjustedHour = hours % 12 || 12;
        return `${adjustedHour}:${minute} ${suffix}`;
    }
    function isToday(date) {
        const today = new Date();
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get("appointment_list/", { params: { user: user } })
                console.log(response.data.data)
                setAppointments(response.data.data)


            } catch (error) {
                console.log(error)
            }
        }; fetchAppointments();


    }, [refresh])
    const handleCancelReq = async () => {
        try {
            const cancelInfo = { "id": id, "cancelled_by": user, "reason": "Patient Requested", "patient": patient }
            const response = await adminapi.post("cancel_appointment/", cancelInfo)
            console.log(response)
            setMessage(response.data.message)
            setOpenModal(false)
            setRefresh(refresh => !refresh)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div><NavBar />


            <div className="relative container-flow mt-6 mx-6 overflow-x-auto">
                {message ?


                    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <span class="font-medium flex justify-between ">{message}<RxCross2 onClick={setMessage("")} /></span>
                    </div> : <></>
                }
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-black-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Patient Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Doctor
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Day
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Slot
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Consultation Mode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.length !== 0 ?
                                appointments.map((appointment, key) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={key}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {appointment.patient}
                                        </th>
                                        <td className="px-6 py-4">
                                            {appointment.doctor_info?.doc_name || "No doctor information available"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.doctor_info?.department || "No department information available"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {appointment.booked_day}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatTime24to12(appointment.time_slot)}
                                        </td>
                                        < td className="px-6 py-4">
                                            {
                                                appointment.consultation_mode === "Online" && isToday(appointment.booked_day) ?

                                                    <p className='text-blue-500 underline' onClick={() => navigate("/onlineRoom")}>Click here for Video Call</p> : appointment.consultation_mode

                                            }</td>

                                        <td className="px-6 py-4">
                                            {appointment.payment_status}
                                        </td>
                                        {appointment.booking_status !== "Cancelled" ? (
                                            <td className="px-6 py-4 hover:underline hover:text-blue-500" onClick={() => { setOpenModal(true); setId(appointment.id); setPatient(appointment.patient) }}>
                                                Cancel
                                            </td>
                                        ) : <td className="px-6 py-4 ">
                                            Cancelled

                                        </td>}
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center align-middle">
                                            <div className="flex justify-center items-center h-full py-10">
                                                <span className="text-2xl font-semibold text-gray-600">
                                                    No appointments found.
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                )
                        }
                    </tbody>
                </table>
                {openModal ? <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => setOpenModal(false)} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only" >Close modal</span>
                            </button>
                            <div class="p-4 md:p-5 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Cancel the Appointment?</h3>
                                <button onClick={handleCancelReq} data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setOpenModal(false)} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                    : <></>}

            </div>
            <Footer />



        </div >
    )
}

export default AppointmentList