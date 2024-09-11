import React, { useState, useEffect } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
function CancelledBooking() {
    const location = useLocation()
    const { booking_id } = location.state || {}
    const [info, setInfo] = useState({})
    const [user, setUser] = useState("")
    const [doctor, setDoctor] = useState("")
    const options = ["No Refund", "Refund Applicable", "Refund Processing", "Refund Completed"]
    const [refund, setRefund] = useState({ "booking_id": booking_id })
    const navigate = useNavigate()
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await adminapi.get("cancel_appointment/", { params: { "booking_id": booking_id } })
                console.log(response)
                setInfo(response.data.cancel_info)
                setUser(response.data.cancelled_by)
                setDoctor(response.data.doctor)

            } catch (error) {
                console.log(error)
            }
        }; fetchInfo()

    }, [booking_id])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminapi.patch("cancel_appointment/", refund)
            console.log(response)
            navigate("/adminBookings")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div><AdminNavBar /> <div className="container mx-auto mt-12 max-w-4xl" onSubmit={handleSubmit}>
            <form className="bg-white shadow-2xl rounded-lg px-8 pb-8" >
                <h1 className='text-blue-800 text-2xl my-3 font-bold'>Cancel Information</h1>
                <div className="my-6">
                    <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cancelled By</label>
                    <input
                        value={user}
                        name="patient"
                        type="text"
                        id="patient"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        readOnly

                    />
                </div>
                <div className="my-6">
                    <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor</label>
                    <input
                        value={doctor}
                        name="patient"
                        type="text"
                        id="patient"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        readOnly

                    />
                </div><div className="my-6">
                    <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reason</label>
                    <input
                        value={info.reason}
                        name="patient"
                        type="text"
                        id="patient"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        readOnly

                    />
                </div>

                <div className="my-6">
                    <label for="refund" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Refund</label>
                    <select onChange={(e) => setRefund({ ...refund, [e.target.name]: e.target.value })} name="refund" id="refund" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {
                            options.map((option, key) => (
                                <option selected={info.refund === option} key={key} >{option}</option>
                            ))
                        }


                    </select>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
            </form>
        </div></div>
    )
}

export default CancelledBooking