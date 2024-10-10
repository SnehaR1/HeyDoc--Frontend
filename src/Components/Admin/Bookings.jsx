import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api'
import { TbPencilCancel } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
function Bookings() {
    const [bookings, setBookings] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [info, setInfo] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await adminapi.get("bookings/")
                setBookings(response.data.bookings)
                console.log(response)

            } catch (error) {
                console.log(error)
            }
        }; fetchBookings();

    }, [refresh])
    const handleClick = (booking) => {
        setShowModal(true)
        setInfo({ "id": booking.id, "cancelled_by": booking.booked_by, "patient": booking.patient, "reason": "Other" })
    }
    const handleSubmit = async () => {
        try {
            const response = await adminapi.post("cancel_appointment/", info)
            console.log(response)
            setShowModal(false)
            setRefresh(refresh => !refresh)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div ><AdminNavBar />
            <div>
                <h1 className='text-blue-800 text-2xl my-3 font-bold'>BOOKINGS</h1>

                <div className="relative overflow-x-auto flex justify-center items-center  mt-4">
                    {
                        bookings.length !== 0 ? <table className="w-full mx-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-blue-900 dark:bg-blue-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        User ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Patient
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Doctor
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Day
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Payment Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Payment Mode
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Booking Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        date of booking
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Edit
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, key) => (

                                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{booking.booked_by}</td>
                                        <td className="px-6 py-4">{booking.patient}</td>

                                        <td className="px-6 py-4">
                                            {booking.doctor.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.booked_day}
                                        </td>
                                        <td className="px-6 py-4 ">
                                            {booking.payment_status}
                                        </td>
                                        <td className="relative px-6 py-4">
                                            {booking.payment_mode === "Razor Pay" ? (
                                                <div className="flex flex-row space-x-2">
                                                    <span>{booking.payment_mode} | </span>
                                                    <span>{booking.razorpay_payment_id}</span>
                                                </div>
                                            ) : (
                                                <span>{booking.payment_mode}</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 ">
                                            {booking.amount}
                                        </td>
                                        <td className=" px-6 py-4">
                                            {booking.booking_status === "cancelled" ?
                                                <p className='underline text-blue-700' onClick={() => { navigate("/cancelledBooking", { state: { booking_id: booking.id } }) }}>{booking.booking_status}</p> : <p>{booking.booking_status}</p>
                                            }

                                        </td>
                                        <td className="px-6 py-4 ">
                                            {booking.date_of_booking}
                                        </td>
                                        <td className="px-6 py-4 ">
                                            <TbPencilCancel onClick={() => handleClick(booking)} className='text-xl text-blue-800' />
                                        </td>
                                    </tr>


                                ))


                                }


                            </tbody>
                        </table> : <div className='flex justify-center items-center my-32'> <h1 className='text-blue-500 font-bold text-2xl'>No Bookings</h1></div>

                    }

                </div>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Are You Sure To Cancel The Booking?
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>

                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            If you cancel this booking, you can't undo it. Are you still sure to go ahead with the appointment cancellation?
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}

                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
                }

            </div>

        </div>
    )
}

export default Bookings