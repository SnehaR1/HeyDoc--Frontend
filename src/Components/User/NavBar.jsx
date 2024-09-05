import React, { useState } from 'react'
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../api';
import { logout } from '../../auth/authslice';
function NavBar() {
    const [isOpen, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const is_staff = useSelector(state => state.auth.is_staff)
    const handleLogout = async () => {
        try {
            console.log(is_staff)

            const response = await api.post("logout/", { withCredentials: true })


            dispatch(logout())
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-white flex flex-row justify-around shadow-md mt-6 items-center'>
            <h1 className='text-blue-600 font-bold text-3xl mb-3 '>HeyDoc</h1>
            <div className='flex flex-row p-3 items-center mb-3'>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500">Home</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500 flex flex-row">Departments</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500" onClick={() => navigate("/doctors")}>Doctors</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500" onClick={() => navigate("/blogs")}>Blogs</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500" onClick={() => navigate("/aboutUs")}>About Us</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500" onClick={() => navigate("/contactUs")}>Contact Us</p>

                <button className='text-white p-3 bg-blue-900 rounded-xl ml-3 font-bold  hover:bg-blue-500'>Appointment +</button>

                {is_staff ? <p className="ml-8 text-grey-300 font-semibold text-l hover:text-blue-500 " onClick={() => navigate('/adminDashboard')}>Admin</p> : <></>}
                <div className='relative'>


                    <VscAccount className='text-2xl mx-3 hover:text-blue-500 ml-12' onClick={() => setOpen(!isOpen)} />
                    {isOpen ? <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
                        <ul className="py-2 text-sm text-gray-700">



                            {isAuthenticated ?

                                <>
                                    <li>

                                        <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={() => navigate("/profile")} >Profile</p>
                                    </li>
                                    <li>

                                        <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={() => navigate("/appointmentList")} >Appointments</p>
                                    </li>
                                    <li>

                                        <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={handleLogout} >Log Out</p>
                                    </li></> : <li>





                                    <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={() => navigate('/login')}  >Log In</p>
                                </li>
                            }





                        </ul>
                    </div> : <></>}
                </div>
            </div>

        </div>
    )
}

export default NavBar