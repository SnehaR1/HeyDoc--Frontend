import React, { useEffect, useState } from 'react'

import NavBar from './NavBar'
import { useSelector } from 'react-redux'
import { api } from '../../api'
import useRazorpay from 'react-razorpay';
import { useNavigate } from 'react-router-dom';

function CheckOutForm() {
    const user_id = useSelector(state => state.auth.user_id)
    const date = useSelector(state => state.booking.selectedDate)
    const slot = useSelector(state => state.booking.selectedSlot)
    const fee = useSelector(state => state.booking.fee)
    const doc_id = useSelector(state => state.booking.doc_id)
    const [patientName, setPatientName] = useState("")
    const Razorpay = useRazorpay();
    const [openPayButton, setOpenPayButton] = useState(false)
    const [patients, setPatients] = useState([])
    const [openModal, setOpenmodal] = useState(false)
    const [patientInfo, setPatientInfo] = useState({ "user": user_id })
    const [paymentMode, setPaymentMode] = useState("")
    const navigate = useNavigate()

    function convertToDateString(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await api.get("patient_form/", { params: { "user_id": user_id } })
                console.log(response)
                setPatients(response.data.patients)

            } catch (error) {
                console.log(error)
            }
        }; fetchPatients();
    }, [])



    const handlePatientSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("patient_form/", patientInfo)
            console.log(response)
            setOpenmodal(false)

        } catch (error) {
            console.log(error)
        }
    }

    const handlePayment = () => {
        const Razorpay = window.Razorpay;
        if (!Razorpay) {
            console.error("Razorpay SDK not loaded properly.");
            return;
        }
        const options = {
            key: "rzp_test_qBPCYkvASuS78x",
            amount: fee * 100,
            currency: "INR",
            name: "HeyDoc",
            description: "Test Transaction",
            image: "https://your_logo_url",
            handler: async function (paymentResponse) {
                try {


                    console.log(paymentResponse)
                    const formattedDate = convertToDateString(date)
                    const razorpay_payment_id = paymentResponse.razorpay_payment_id
                    const payment_status = "completed"
                    const checkoutInfo =
                        { "booked_by": user_id, "doctor": doc_id, "time_slot": slot, "booked_day": formattedDate, "amount": fee, "payment_mode": paymentMode, "patient": patientName, "payment_status": payment_status, "razorpay_payment_id": razorpay_payment_id }
                    const response = await api.post("checkout/", checkoutInfo)
                    console.log(response)
                    navigate("/checkoutSuccess", { state: { data: response.data.data, doctor_name: response.data.doctor_name, payment_mode: response.data.payment_mode, payment_status: response.data.payment_status } })
                } catch (error) {
                    console.log(error)
                }

            },

            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    };

    const handleCheckout = async () => {
        try {
            if (patientName === "") {
                alert("Please select a patient")
            }
            if (paymentMode === "Direct") {
                const formattedDate = convertToDateString(date)

                const checkoutInfo =
                    { "booked_by": user_id, "doctor": doc_id, "time_slot": slot, "booked_day": formattedDate, "amount": fee, "payment_mode": paymentMode, "patient": patientName, "payment_status": "pending" }


                const response = await api.post("checkout/", checkoutInfo)
                console.log(response)
                navigate("/checkoutSuccess", { state: { data: response.data.data, doctor_name: response.data.doctor_name, payment_mode: response.data.payment_mode, payment_status: response.data.payment_status } })


            }
            else if (paymentMode === "Razor Pay") {
                alert("Please pay before you proceed")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div><NavBar />
            <div className="w-half flex flex-col">

                <h1 className='text-2xl font-bold mt-4'>CHECKOUT FORM</h1>
                <div className="  p-5">
                    <p className='text-xl font-semibold'>Appointment For : </p>
                    {
                        patients.length !== 0 ?



                            patients.map((patient, key) => (


                                <div className="w-fit   mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-3 mb-5" >


                                    <div className="flex flex-row max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <input name="patient" id="patient" type="radio" value={patient} onClick={() => setPatientName(patient)} />
                                        <label className="ml-3 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{patient}</label>

                                    </div>
                                </div>
                            ))


                            :
                            <></>

                    }


                    <button class="w-half mx-auto mt-3 rounded-xl bg-blue-600 px-6 py-3 text-xl font-medium text-white" onClick={() => setOpenmodal(true)}>Register a Patient</button>






                    {openModal ? <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="bg-transparent flex  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className=" relative p-4 w-full max-w-md max-h-full inset-0 z-50">

                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 ">

                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Fill Out Patient Info
                                    </h3>
                                    <button onClick={() => setOpenmodal(false)} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <div className="p-4 md:p-5">
                                    <form className="space-y-4" onSubmit={handlePatientSubmit}>
                                        <div>
                                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Patient's Name" required />
                                        </div>
                                        <div>
                                            <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                            <input onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })} type="text" name="age" id="age" placeholder="Patient's Age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                            <select onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })} name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option>Choose a gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                            <input onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })} type="text" name="phone" id="phone" placeholder="Available Phone Number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>

                                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register Patient</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> : <></>}

                    <div className="w-half  flex flex-col mt-6 space-y-4">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">Mode of Payment:</p>
                        <p className="text-l font-semibold">Fee : ₹{fee}</p>
                        <div className='flex justify-center items-center flex-row'>



                            <div className="flex items-center space-x-2">
                                <input
                                    onClick={() => { setOpenPayButton(false); setPaymentMode("Direct") }}
                                    type="radio"
                                    id="Direct"
                                    name="payment_mode"
                                    value="Direct"
                                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                />
                                <label
                                    htmlFor="Direct"
                                    className="text-gray-700 dark:text-gray-300 font-medium"
                                >
                                    Direct
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    onClick={() => { setOpenPayButton(true); setPaymentMode("Razor Pay") }}

                                    type="radio"
                                    id="Razor"
                                    name="payment_mode"
                                    value="Razor Pay"
                                    className="ml-4 h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                />
                                <label
                                    htmlFor="Razor"
                                    className="text-gray-700 dark:text-gray-300 font-medium"
                                >
                                    Razor Pay
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 flex justify-center">
                        {
                            openPayButton ?

                                <button onClick={handlePayment} className="w-half my-5 font-bold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 p-4 rounded-xl text-lg text-center shadow-lg transition-transform transform hover:scale-105 dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 dark:hover:from-blue-800 dark:hover:via-blue-900 dark:hover:to-blue-950 dark:focus:ring-blue-900"
                                >
                                    RazorPay
                                </button> : <></>
                        }


                    </div>
                    <button onClick={handleCheckout} type="submit" className="w-auto mt-5 font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 px-5 py-3 rounded-full text-base text-center shadow-lg transition-transform transform hover:scale-105 dark:bg-gradient-to-r dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 dark:focus:ring-green-800"
                    >PROCEED</button>
                    <form id="rzp_payment_form"></form>
                </div>
            </div>

            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </div>
    )
}

export default CheckOutForm