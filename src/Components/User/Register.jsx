import React, { useState } from 'react'
import signup from '../../Images/signup.jpg'
import { baseapi } from '../../api';
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom"
function Register() {
    const bodyStyle = {
        backgroundImage: `url(${signup})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundAttachment: 'fixed',
        overflowY: 'auto',
    };
    const [info, setInfo] = useState({})
    const [error, setError] = useState()
    const [message, setMessage] = useState("")
    const [showPass, setShowpass] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (info["password"] !== info["confirm_password"])
            setError("Passwords don't match")
        alert("Passwords don't match")

        for (const key in info) {
            if (typeof info[key] === 'string') {
                info[key] = info[key].trim();
            }
        }

        try {
            const response = await baseapi.post("register/", info)
            console.log(response)
            setMessage("Account created successfully you can now login")
            setError("")
            navigate("/login")

        }
        catch (error) {

            if (error.response && error.response.data) {
                setError(error.response.data.error || "An error occurred");
            } else {
                setError("An unexpected error occurred");
            }
            console.log(error);
        }

    }
    return (
        <div style={bodyStyle}
            className="flex justify-center items-center h-screen ">
            <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md ">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h1>
                {error || message ? <div><p>{error}{message}</p></div> : <></>}

                <form className="space-y-4 " onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" >Name</label>
                        <input onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} type="text" name="username" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Name" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} type="email" name="email" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Email" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} type="text" name="phone" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Phone Number" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className='relative'>

                            <input onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} id="password" type="password" name="password" className="password my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" required />
                            {showPass ? <LiaEyeSolid onClick={() => { setShowpass(showPass => !showPass); const inputElements = document.querySelectorAll(".password"); inputElements.forEach(element => { element.type = "text" }) }} className="absolute inset-y-0 right-3 flex items-center cursor-pointer my-auto" /> : <LiaEyeSlashSolid className="absolute inset-y-0 right-3 flex items-center cursor-pointer my-auto" onClick={() => { const inputElements = document.querySelectorAll(".password"); inputElements.forEach(element => { element.type = "password" }); setShowpass(showPass => !showPass) }} />}
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>

                        <input onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} id="confirm_password" type="password" name="confirm_password" className="password my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Confirm Password" required />



                    </div>
                    <div>
                        <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Sign Up
                        </button>
                        <p className="text-primary ">Already have an account? <span className="hover:underline" onClick={() => navigate('/login')}>Login</span> </p>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Register