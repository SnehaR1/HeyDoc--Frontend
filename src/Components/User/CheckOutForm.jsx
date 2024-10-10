import React, { useEffect, useState } from 'react'

import NavBar from './NavBar'
import { useSelector } from 'react-redux'
import { api } from '../../api'
import useRazorpay from 'react-razorpay';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function CheckOutForm() {
    const user_id = useSelector(state => state.auth.user_id)
    const date = useSelector(state => state.booking.selectedDate)
    const online = useSelector(state => state.booking.online)
    const slot = useSelector(state => state.booking.selectedSlot)
    const fee = useSelector(state => state.booking.fee)
    const doc_id = useSelector(state => state.booking.doc_id)
    const day = useSelector(state => state.booking.selectedDay)
    const [patientName, setPatientName] = useState("")
    const Razorpay = useRazorpay();
    const [openPayButton, setOpenPayButton] = useState(false)
    const [patients, setPatients] = useState([])
    const [openModal, setOpenmodal] = useState(false)
    const [patientInfo, setPatientInfo] = useState({ "user": user_id })
    const [paymentMode, setPaymentMode] = useState("")
    const [refresh, setRefresh] = useState(false)
    const [consultationMode, setConsultationMode] = useState("Offline")
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
    }, [refresh])



    const handlePatientSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("patient_form/", patientInfo)
            console.log(response)

            setOpenmodal(false)
            setRefresh(refresh => !refresh)
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
                        { "booked_by": user_id, "doctor": doc_id, "time_slot": slot, "booked_day": formattedDate, "amount": fee, "payment_mode": paymentMode, "patient": patientName, "payment_status": payment_status, "razorpay_payment_id": razorpay_payment_id, "consultation_mode": consultationMode }
                    const response = await api.post("checkout/", checkoutInfo)
                    console.log(response)
                    navigate("/checkoutSuccess", { state: { data: response.data.data, doctor_name: response.data.doctor_name, payment_mode: response.data.payment_mode, payment_status: response.data.payment_status, consultation_mode: response.data.consultation_mode } })
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
                    { "booked_by": user_id, "doctor": doc_id, "time_slot": slot, "booked_day": formattedDate, "amount": fee, "payment_mode": paymentMode, "patient": patientName, "payment_status": "pending", "consultation_mode": consultationMode }


                const response = await api.post("checkout/", checkoutInfo)
                console.log(response)
                navigate("/checkoutSuccess", { state: { data: response.data.data, doctor_name: response.data.doctor_name, payment_mode: response.data.payment_mode, payment_status: response.data.payment_status, consultation_mode: response.data.consultation_mode } })


            }
            else if (paymentMode === "Razor Pay") {
                alert("Please pay before you proceed")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (


        <div>
            <NavBar />
            <div className="flex flex-col w-full max-w-7xl mx-auto p-5 ">
                <h1 className="text-3xl font-extrabold text-center text-gray-900 my-6">
                    Checkout Form
                </h1>

                <section className="bg-slate-50 shadow-xl rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                        Appointment For
                    </h2>

                    {patients.length !== 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {patients.map((patient, index) => (
                                <div
                                    key={index}
                                    className="relative bg-gray-50 border border-gray-200 rounded-lg py-4 px-2 flex items-center transition-all duration-300 hover:shadow-md"
                                >
                                    <input
                                        name="patient"
                                        id={`patient-${index}`}
                                        type="radio"
                                        value={patient}
                                        className="absolute top-4 left-4"
                                        onClick={() => setPatientName(patient)}
                                    />
                                    <label
                                        htmlFor={`patient-${index}`}
                                        className="ml-6 text-lg font-semibold text-gray-800 w-full text-center"
                                    >
                                        {patient}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No patients available.</p>
                    )}

                    <div className="flex flex-col items-center my-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-600">OR</h2>
                        <button
                            className="w-full md:w-auto mx-auto px-6 py-3 bg-blue-600 text-xl font-medium text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                            onClick={() => setOpenmodal(true)}
                        >
                            Register a Patient
                        </button>
                    </div>
                </section>

                {openModal && (
                    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg w-full max-w-md">
                            <div className="flex justify-between items-center border-b pb-3">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Fill Out Patient Info
                                </h3>
                                <button
                                    onClick={() => setOpenmodal(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <form className="mt-4 space-y-4" onSubmit={handlePatientSubmit}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-800 dark:text-gray-200"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={(e) =>
                                            setPatientInfo({
                                                ...patientInfo,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Patient's Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="age"
                                        className="block text-sm font-medium text-gray-800 dark:text-gray-200"
                                    >
                                        Age
                                    </label>
                                    <input
                                        type="text"
                                        name="age"
                                        id="age"
                                        onChange={(e) =>
                                            setPatientInfo({
                                                ...patientInfo,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Patient's Age"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block text-sm font-medium text-gray-800 dark:text-gray-200"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        onChange={(e) =>
                                            setPatientInfo({
                                                ...patientInfo,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Choose a gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-800 dark:text-gray-200"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        onChange={(e) =>
                                            setPatientInfo({
                                                ...patientInfo,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Phone Number"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium shadow-md"
                                >
                                    Register Patient
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <section className="bg-slate-50  shadow-xl mx-32 p-4 rounded-lg my-10">

                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                        Mode of Consultation
                    </h2>
                    <div className="flex justify-center space-x-8 mb-6">
                        <div className="flex items-center space-x-2">
                            <input

                                type="radio"
                                id="Direct"
                                name="consultation_mode"
                                value="Offline"
                                className="h-4 w-4"
                                onClick={e => setConsultationMode(e.target.value)}
                            />
                            <label
                                htmlFor="Offline"
                                className="text-lg font-medium text-gray-800"
                            >
                                Offline
                            </label>
                        </div>
                        {
                            online && <div className="flex items-center space-x-2">
                                <input
                                    onClick={e => setConsultationMode(e.target.value)}
                                    type="radio"
                                    id="Online"
                                    name="consultation_mode"
                                    value="Online"
                                    className="h-4 w-4"
                                />
                                <label
                                    htmlFor="Online"
                                    className="text-lg font-medium text-gray-800"
                                >
                                    Online
                                </label>
                            </div>
                        }

                    </div>

                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                        Mode of Payment
                    </h2>

                    <div className="flex justify-center space-x-8 mb-6">
                        {
                            consultationMode == "Offline" && <div className="flex items-center space-x-2">
                                <input
                                    onClick={() => {
                                        setOpenPayButton(false);
                                        setPaymentMode("Direct");
                                    }}
                                    type="radio"
                                    id="Direct"
                                    name="payment_mode"
                                    value="Direct"
                                    className="h-4 w-4"
                                />
                                <label
                                    htmlFor="Direct"
                                    className="text-lg font-medium text-gray-800"
                                >
                                    Direct
                                </label>
                            </div>
                        }

                        <div className="flex items-center space-x-2">
                            <input
                                onClick={() => {
                                    setOpenPayButton(true);
                                    setPaymentMode("Razor Pay");
                                }}
                                type="radio"
                                id="Razor"
                                name="payment_mode"
                                value="Razor Pay"
                                className="h-4 w-4"
                            />
                            <label
                                htmlFor="Razor"
                                className="text-lg font-medium text-gray-800"
                            >
                                Razor Pay
                            </label>
                        </div>
                    </div>

                    {openPayButton && (
                        <div className="flex justify-center">
                            <button
                                onClick={handlePayment}
                                className="w-half bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all hover:scale-105"
                            >
                                Pay with RazorPay
                            </button>
                        </div>
                    )}

                    <button
                        onClick={handleCheckout}
                        className="w-half mt-8 p-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
                    >
                        Proceed
                    </button>
                </section>
            </div>
            <Footer />
        </div>


    )
}

export default CheckOutForm