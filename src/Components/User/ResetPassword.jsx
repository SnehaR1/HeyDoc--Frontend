import React, { useState } from 'react'
import drimage from '../../Images/drimage.jpg';
import { baseapi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeResetPassInfo } from '../../auth/resetPassSlice';
import { useSelector } from 'react-redux';
function ResetPassword() {
    const bodyStyle = {
        backgroundImage: `url(${drimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        backgroundAttachment: 'fixed',
        overflowY: 'auto',
    };
    const email = useSelector(state => state.resetPass.email)
    const phone = useSelector(state => state.resetPass.phone)
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            if (password !== confirmPass) {
                alert("Passwords don't match! Please try again.")
            }

            const info = { "password": password, "email": email, "phone": phone }
            const response = await baseapi.patch("reset_password/", info)
            console.log(response)
            dispatch(removeResetPassInfo())
            navigate("/login")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={bodyStyle} className="flex justify-center items-center h-screen ">
            <div className="max-w-xl mx-auto px-6 py-8 bg-white shadow-md rounded-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Reset Password</h1>
                <form className="space-y-4 " onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className='relative'>

                            <input onChange={(e) => setPassword(e.target.value)} id='password' o type="password" name="password" className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" required />

                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className='relative'>

                            <input onChange={(e) => setConfirmPass(e.target.value)} id='confirm_password' type="password" name='confirm_password' className="my-3 block w-full md:w-96 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-3" placeholder="Enter your Password" required />

                        </div>
                    </div>
                    <div>
                        <button type="submit" className="my-3  w-full py-3 px-4 border border-grey-300 rounded-md shadow-sm text-white bg-black hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                            Reset
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default ResetPassword