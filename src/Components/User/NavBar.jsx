import React, { useEffect, useState } from 'react'
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../api';
import { logout } from '../../auth/authslice';
import { FaAngleDown } from "react-icons/fa";
function NavBar() {
    const [isOpen, setOpen] = useState(false)
    const [openDepts, setOpenDepts] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const is_staff = useSelector(state => state.auth.is_staff)
    console.log(is_staff)
    const [departments, setDepartments] = useState([])
    const [doctors, setDoctors] = useState([])

    useEffect(() => { fetchDepartments(); }, [])

    const fetchDepartments = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            const response = await api.get("departments/", { headers: { Authorization: `Bearer ${access_token}` } },)
            console.log(response)
            setDepartments(response.data.departments)
            setDoctors(response.data.doctors)

        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async () => {
        try {
            console.log(is_staff);
            const refresh_token = localStorage.getItem('refresh_token');

            const response = await api.post('logout/', {
                refresh_token: refresh_token // Changed to use shorthand
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // localStorage.removeItem('access_token');
            // localStorage.removeItem('refresh_token');

            dispatch(logout());
            console.log(response);

        } catch (error) { console.log(error) }
        //     let refresh = false; // Use 'let' to allow re-assignment
        //     console.log(error); // Move this up to log the error first
        //     if (error.response && error.response.status === 401 && !refresh) {
        //         const refresh_token = localStorage.getItem('refresh_token');

        //         refresh = true; // Update the refresh variable correctly
        //         console.log(localStorage.getItem('refresh_token'));
        //         const response = await api.post(
        //             'http://localhost:8000/token/refresh/',
        //             {
        //                 refresh: localStorage.getItem('refresh_token')
        //             },
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json'
        //                 },
        //                 withCredentials: true
        //             }
        //         );

        //         if (response.status === 200) {
        //             api.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
        //             localStorage.setItem('access_token', response.data.access);
        //             localStorage.setItem('refresh_token', response.data.refresh);
        //             // Retry the original request
        //             return api.post('logout/', { refresh_token }); // Re-attempt the logout
        //         }
        //     }
        //     return error; // Return the original error if no action was taken
        // }
    };


    return (
        <div className='bg-white flex flex-row justify-around shadow-md mt-6 items-center'>
            <h1 className='text-blue-600 font-bold text-3xl mb-3 '>HeyDoc</h1>
            <div className='flex flex-row p-3 items-center mb-3'>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500" onClick={() => navigate("/")}>Home</p>
                <p className="mx-4 text-grey-300 font-semibold text-l hover:text-blue-500 flex flex-row " onClick={() => setOpenDepts(!openDepts)}>Departments <FaAngleDown className='mt-1.5 ml-2' /></p>

                {openDepts && <div className="z-10 mt-32 ml-36 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
                    <ul className="py-2 text-sm text-gray-700">
                        {
                            departments.map((dept, key) => (
                                <li key={key}>

                                    <p className="block px-4 py-2 hover:bg-gray-100 font-semibold " onClick={() => { const docs = doctors.filter(doctor => doctor.department === dept.dept_name); navigate("/department", { state: { department: dept, docs: docs } }) }}  >{dept.dept_name}</p>
                                </li>
                            ))
                        }


                    </ul>
                </div>}

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

                                        <p className="block px-4 py-2 hover:bg-gray-100 font-semibold" onClick={() => navigate("/reciepts")} >Reciepts</p>
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