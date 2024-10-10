

import React, { useState } from 'react';

import { otpVerified, userConfirmation } from '../../auth/resetPassSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { basedocapi, doctorapi } from '../../api';

function DoctorForgotPass() {
    const [receiver, setReceiver] = useState('email');
    const [cred, setCred] = useState({});
    const [otpPage, setOtpPage] = useState(false);
    const dispatch = useDispatch()
    const [otp, setOTP] = useState({})
    const navigate = useNavigate()
    const handleCredSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await basedocapi.post("otp_verification/", cred);
            console.log(response);

            let email = null;
            let phone = null;

            if (receiver === "email") {
                email = cred["doc_email"];

            } else if (receiver === "phone") {
                phone = cred["doc_phone"];

            } else {
                alert("Receiver value not set! Something went wrong from our side!");
                return;
            }

            dispatch(userConfirmation({ email, phone }));

            setOtpPage(true);

        } catch (error) {
            console.log(error);
        }


    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        try {
            const doc_phone = receiver === "phone" ? cred["doc_phone"] : null;
            const doc_email = receiver === "email" ? cred["doc_email"] : null;

            const info = { otp: String(otp), doc_email, doc_phone };

            const response = await basedocapi.post("reset_password/", info);
            console.log(response);
            dispatch(otpVerified());
            navigate('/docResetPassword');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>{
            otpPage ? (
                <div className="max-w-xl mx-auto px-8 py-12 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">OTP Verification</h1>
                    <form className="space-y-6 max-w-md mx-auto p-6" onSubmit={handleOTPSubmit}>

                        <div className="flex flex-col items-center justify-center ">

                            <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                            <input
                                onChange={(e) => setOTP(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                type="text"
                                name="otp"
                                placeholder="Enter OTP"
                                required
                            />





                        </div>
                        <div>
                            <button

                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="max-w-xl mx-auto px-8 py-12 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">SEND OTP</h1>
                    <form className="space-y-6 max-w-md mx-auto p-6" onSubmit={handleCredSubmit}>
                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                onClick={() => setReceiver('email')}
                                className={`${receiver === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-3 w-32 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors`}
                            >
                                Email
                            </button>
                            <button
                                type="button"
                                onClick={() => setReceiver('phone')}
                                className={`${receiver === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-3 w-32 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors`}
                            >
                                Phone
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            {receiver === 'email' ? (
                                <input
                                    onChange={(e) => setCred({ ...cred, receiver: 'email', "doc_email": e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    type="email"
                                    name="email"
                                    placeholder="Enter Registered Email"
                                    required
                                />
                            ) : (
                                <input
                                    onChange={(e) => setCred({ ...cred, receiver: 'phone', "doc_phone": e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter Registered Phone Number"
                                    required
                                />
                            )}
                        </div>
                        <div>
                            <button

                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default DoctorForgotPass