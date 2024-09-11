import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useLocation, useNavigate } from 'react-router-dom'


function BookingConfirmation() {
    const location = useLocation()
    const { data, doctor_name, payment_mode, payment_status } = location.state || {};
    const navigate = useNavigate()


    return (
        <div>
            <NavBar />
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Appointment Receipt</h2>
                <div className="space-y-4">
                    <p className="text-lg text-gray-700"><span className="font-semibold">Booked By: </span> {data["patient"]}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Booked Day: </span> {data["booked_day"]}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Booked Time: </span> {data["time_slot"]}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Amount: </span>₹{data["amount"]}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Doctor: </span> {doctor_name}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Payment Mode: </span> {payment_mode}</p>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Payment Status: </span> {payment_status}</p>
                    {data["razorpay_payment_id"] ? <p className="text-lg text-gray-700"><span className="font-semibold">Razor Payment ID: </span> {data["razorpay_payment_id"]}</p> : <></>}
                </div>
                <div className="border-t mt-6 pt-4 text-center">
                    <p className="text-sm text-gray-500">Thank you for your booking!<span onClick={() => navigate("/")}>Go Home</span></p>

                </div>
            </div>
        </div>
    )
}

export default BookingConfirmation