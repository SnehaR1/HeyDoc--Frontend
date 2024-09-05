import React, { useState } from 'react'
import { HiUsers } from "react-icons/hi2";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { api } from '../../api';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/authslice';
import { FaMicroblog } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
function AdminNavBar() {
    const [isOpen, setOpen] = useState(false)
    const username = useSelector(state => state.auth.username)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {


            const response = await api.post("logout/", { withCredentials: true })


            dispatch(logout())
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div> <div className='bg-white flex flex-row justify-around shadow-md mt-6 items-center'>
            <h1 className='text-blue-600 font-bold text-3xl mb-3 '>HeyAdmin</h1>
            <div className='flex flex-row p-3 items-center mb-3'>
                <p onClick={() => navigate('/adminUsers')} className="px-4 flex justify-center   hover:text-blue-500 " ><HiUsers className='w-6 h-6 mr-2' />Users</p>
                <p onClick={() => navigate('/adminDepartment')} className="px-4  flex justify-center   hover:text-blue-500 " ><TbCategoryFilled className='w-6 h-6 mr-2' />Departments</p>
                <p onClick={() => navigate("/adminDoctor")} className="px-4  flex justify-center   hover:text-blue-500 " ><FaUserDoctor className='w-6 h-6 mr-2' />Doctors</p>
                <p onClick={() => navigate("/adminBlogs")} className=" px-4 flex justify-center  hover:text-blue-500" ><FaMicroblog className='w-6 h-6 mr-2' />Blogs</p>
                <p onClick={() => navigate("/adminBookings")} className=" px-4 flex justify-center  hover:text-blue-500" ><FaBook className='w-6 h-6 mr-2' />Bookings</p>


                <p className="ml-8 text-grey-300 font-semibold text-l hover:text-blue-500 " >{username}</p>
                <div className='relative'>


                    <VscAccount className='text-2xl mx-3 hover:text-blue-500 ml-12' onClick={() => setOpen(!isOpen)} />
                    {isOpen ? <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
                        <ul className="py-2 text-sm text-gray-700">


                            <li>


                                <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={() => navigate("/requests")}>Requests</p>
                                <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={handleLogout} >Log Out</p>
                            </li>

                        </ul>
                    </div> : <></>}
                </div>
            </div>

        </div></div>
    )
}

export default AdminNavBar