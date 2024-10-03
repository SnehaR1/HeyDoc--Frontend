import React, { useState, useEffect } from 'react'
import { api } from '../../api'
import { useSelector } from 'react-redux'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
function Reciepts() {
    const user_id = useSelector(state => state.auth.user_id)
    const [reciepts, setReciepts] = useState([])
    useEffect(() => { fetchReciepts(); }, [])
    const navigate = useNavigate()

    const fetchReciepts = async () => {
        try {

            const response = await api.get("reciepts/", {
                params: { user_id: user_id },

                withCredentials: true,
            });

            console.log(response)
            setReciepts(response.data.reciepts)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <NavBar />  <h3 className="font-bold text-blue-700 text-2xl mb-4 mt-4"> RECEIPTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {reciepts.map((reciept, key) => (
                    <div key={key} className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                        <p className="text-md font-medium text-gray-800">Patient: {reciept.patient}</p>
                        <p className="text-sm text-gray-500">Date of Booking: {reciept.date_of_booking}</p>
                        <p className="text-sm text-gray-500">Amount: Rs {reciept.amount}</p>
                        <button onClick={() => { navigate("/recieptView", { state: { reciept: reciept } }) }} className="mt-2 inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Reciepts