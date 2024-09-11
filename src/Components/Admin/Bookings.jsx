import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api'
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function Bookings() {
    const [bookings, setBookings] = useState([])
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

    }, [])
    return (
        <div><AdminNavBar />
            <h1 className='text-blue-800 text-2xl my-3 font-bold'>Bookings</h1>
            <div className="relative overflow-x-auto flex justify-center items-center ">
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
                                        {booking.booking_status === "Cancelled" ?
                                            <p className='underline text-blue-700' onClick={() => { navigate("/cancelledBooking", { state: { booking_id: booking.id } }) }}>{booking.booking_status}</p> : <p>{booking.booking_status}</p>
                                        }

                                    </td>
                                    <td className="px-8 py-4">

                                        <MdOutlineModeEdit

                                            className='mr-2 text-xl text-blue-900'

                                        />

                                    </td>
                                </tr>


                            ))


                            }


                        </tbody>
                    </table> : <div className='flex justify-center items-center my-32'> <h1 className='text-blue-500 font-bold text-2xl'>No Bookings</h1></div>

                }

            </div>
        </div>
    )
}

export default Bookings