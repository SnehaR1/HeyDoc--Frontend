import React, { useState } from 'react'
import { basedocapi, doctorapi } from '../../api'
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { useDispatch } from 'react-redux';
import { docLogin } from '../../auth/doctorauthSlice';
import { useNavigate } from 'react-router-dom';
import DoctorForgotPass from './DoctorForgotPass';

function DoctorLogin() {
    const [openReqForm, setOpenReqForm] = useState(false)
    const [reqInfo, setReqInfo] = useState({})
    const [message, setMessage] = useState("")
    const [loginInfo, setLoginInfo] = useState({})
    const [showPass, setShowpass] = useState(false)
    const [resetPass, setResetPass] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();


        for (const key in loginInfo) {
            if (typeof loginInfo[key] === "string") {
                if (loginInfo[key].trim() === "") {
                    alert("All fields should be filled properly!");
                    return;
                } else {
                    loginInfo[key] = loginInfo[key].trim();
                }
            }
        }

        try {
            const response = await basedocapi.post("login/", loginInfo);
            console.log(response);


            if (response.data && response.data.data && response.data.data.user) {
                const { name, doc_email, doc_phone, doc_image, is_HOD, department, doc_id } = response.data.data.user;
                localStorage.setItem("refresh_token", response.data.data.refresh);
                localStorage.setItem("access_token", response.data.data.access);
                const role = "doctor";


                dispatch(docLogin({ name, doc_email, doc_phone, doc_image, is_HOD, role, department, doc_id }));


                navigate("/doctorHome");
            } else {
                console.error("Unexpected response structure:", response.data);
                alert("Login failed. Please try again.");
            }

        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    };



    const handleReqSubmit = async (e) => {
        e.preventDefault()
        for (const key in reqInfo) {
            if (typeof reqInfo[key] === "string") {
                if (reqInfo[key].trim() === "") {
                    alert("All fields needs to be filled with valid inputs and should not be left empty")
                }
                else {
                    reqInfo[key] = reqInfo[key].trim()
                }
            }
        }

        try {
            const reqResponse = await basedocapi.post("doctor_request/", reqInfo)
            console.log(reqResponse)
            setMessage("The request has been sent succesfully!")
            setOpenReqForm(false)

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className=" min-h-screen flex justify-center items-center  bg-gradient-to-r from-cyan-500 to-blue-500 ">
            {resetPass ? <DoctorForgotPass /> :
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">

                    <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Doctor Login</h1>
                    <p>
                        {message}
                    </p>
                    {openReqForm ?
                        <form className="space-y-4" onSubmit={handleReqSubmit}>
                            <div>
                                <label className="block text-md font-medium  text-blue-800">Email</label>
                                <input onChange={(e) => { setReqInfo({ ...reqInfo, [e.target.name]: e.target.value }) }} type="email" name="email" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" required />
                            </div>
                            <div>
                                <label className="block text-dm font-medium  text-blue-800" >Message</label>
                                <textarea onChange={(e) => { setReqInfo({ ...reqInfo, [e.target.name]: e.target.value }) }} type="text" name="message" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Message" required />
                            </div>
                            <div>
                                <button type="submit" className="my-3 w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-gradient-to-r from cyan-500 to-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    Request
                                </button>
                            </div>
                            <div className="text-center">
                                <p className="text-primary">Don't have an account yet? <span className='text-primary hover:underline ' onClick={() => setOpenReqForm(true)}>Request One</span></p>
                            </div>
                            <div className="text-center">
                                <p className="text-primary hover:underline">Forgot password?</p>
                            </div>
                        </form>
                        : <form className="space-y-4" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-md font-medium  text-blue-800">Email</label>
                                <input onChange={(e) => { setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value }) }} type="doc_email" name="doc_email" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" />
                            </div>
                            <div>
                                <label className="block text-dm font-medium  text-blue-800" >Password</label>
                                <div className='relative'>
                                    <input onChange={(e) => { setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value }) }} id="password" type="password" name="password" className="my-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" />
                                    {showPass ? <LiaEyeSolid onClick={() => { setShowpass(showPass => !showPass); const element = document.getElementById("password"); element.type = "text" }} className="absolute inset-y-0 right-3 flex items-center cursor-pointer my-auto" /> : <LiaEyeSlashSolid className="absolute inset-y-0 right-3 flex items-center cursor-pointer my-auto" onClick={() => { const element = document.getElementById("password"); element.type = "password"; setShowpass(showPass => !showPass) }} />}
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="my-3 w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-gradient-to-r from cyan-500 to-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    Sign in
                                </button>
                            </div>
                            <div className="text-center">
                                <p className="text-primary ">Don't have an account yet? <span className='text-primary hover:underline ' onClick={() => setOpenReqForm(true)}>Request One</span></p>
                            </div>
                            <div className="text-center">
                                <p className="text-primary hover:underline" onClick={() => setResetPass(true)}>Forgot password?</p>
                            </div>
                        </form>
                    }
                </div>}
        </div>
    )
}

export default DoctorLogin