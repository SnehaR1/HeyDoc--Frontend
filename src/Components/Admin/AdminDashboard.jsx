import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api'
import { GiMoneyStack } from "react-icons/gi";
import { FaBookMedical } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaUserDoctor } from "react-icons/fa6";
import { ImManWoman } from "react-icons/im";
import { RiAccountBoxLine } from "react-icons/ri";
import EarningsChart from './EarningsChart';
import Consultation from './ConsultationChart';
import ConsultationChart from './ConsultationChart';
import { resolvePath } from 'react-router-dom';
function AdminDashboard() {
    const [totalAppointments, setTotalAppointments] = useState(null)
    const [totalEarnings, setTotalEarnings] = useState(null)
    const [monthlyEarning, setMonthlyEarning] = useState(null)
    const [annualEarning, setAnnualEarning] = useState(null)
    const [monthlyDifference, setMonthlyDifference] = useState(null)
    const [totalDoctors, setTotalDoctors] = useState(null)
    const [totalPatients, setPatients] = useState(null)
    const [totalUsers, setUsers] = useState(null)
    const [totalYearly, setTotalYearly] = useState(null)
    const [totalMonthly, setTotalMonthly] = useState(null)
    const [onlineEarning, setOnlineEarning] = useState(null)
    const [offlineEarning, setOfflineEarning] = useState(null)
    const [topDoctors, setTopDoctors] = useState([])
    const [notifications, setNotifications] = useState([])


    useEffect(() => {
        const fetchDashboardInfo = async () => {
            try {
                const access_token = localStorage.getItem("access_token")
                const response = await adminapi.get("/dashboard", { headers: { authorization: `Bearer ${access_token}` } })
                console.log(response)
                setTotalAppointments(response.data.total_appointments)
                setTotalEarnings(response.data.total_earning["total"])
                setMonthlyEarning(response.data.current_month_total)
                setAnnualEarning(response.data.current_year)
                setMonthlyDifference(response.data.monthly_difference)
                setTotalDoctors(response.data.doctors_count)
                setPatients(response.data.patients_count)
                setUsers(response.data.users_count)
                setTotalMonthly(response.data.total_monthly)
                setTotalYearly(response.data.total_yearly)
                setOnlineEarning(response.data.online_consultations)
                setOfflineEarning(response.data.offline_consultations)
                setTopDoctors(response.data.top_doctors)
                setNotifications(response.data.notifications)
            } catch (error) {
                console.log(error)
            }
        }; fetchDashboardInfo()
    }, [])

    const handleNotification = async (id) => {
        try {
            const access_token = localStorage.getItem("access_token")
            const response = await adminapi.patch(`dashboard/${id}/`, { headers: { authorization: `Bearer ${access_token}` } })
            console.log(response)
            const filteredNotifications = notifications.filter(notification => notification.id != id)
            setNotifications(filteredNotifications)

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div>
            <AdminNavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-12 my-4">
                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-8'>
                        <h3 className='font-bold text-l text-blue-600 '>Total Earnings</h3>
                        <span className='text-black text-xl font-bold mt-2'>₹{totalEarnings}</span>
                    </div>
                    <GiMoneyStack className='text-gray-400 text-6xl' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Annual Earnings</h3>
                        <span className='text-black text-xl font-bold mt-2'>₹{annualEarning}</span>
                    </div>
                    <FaIndianRupeeSign className='text-gray-400 text-4xl my-auto' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Monthly Earnings</h3>
                        <span className='text-black text-xl font-bold mt-2'>₹{monthlyEarning}</span>
                    </div>
                    <FaCalendar className='text-gray-400 text-4xl my-auto' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Profit/Loss Comparison</h3>
                        <span className={`text-xl font-bold mt-2 ${monthlyDifference >= 0 ? 'text-green-500' : 'text-red-500'}`}>₹{monthlyDifference}</span>
                    </div>
                    <GoGraph className='text-gray-400 text-4xl my-auto' />
                </div>


                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Total Appointments</h3>
                        <span className='text-black text-xl font-bold mt-2'>{totalAppointments}</span>
                    </div>
                    <FaBookMedical className='text-gray-400 text-4xl my-auto' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Total Doctors</h3>
                        <span className='text-black text-xl font-bold mt-2'>{totalDoctors}</span>
                    </div>
                    <FaUserDoctor className='text-gray-400 text-4xl my-auto' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>User Accounts</h3>
                        <span className='text-black text-xl font-bold mt-2'>{totalUsers}</span>
                    </div>
                    <RiAccountBoxLine className='text-gray-400 text-4xl my-auto' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Total Patients</h3>
                        <span className='text-black text-xl font-bold mt-2'>{totalPatients}</span>
                    </div>
                    <ImManWoman className='text-gray-400 text-4xl my-auto' />
                </div>
            </div>


            {/* Charts */}
            <div className='grid grid-cols-3 gap-6 mx-24 my-6'>
                <div className='col-span-3 lg:col-span-2 shadow-md p-3 mb-4'>
                    <h3 className='font-bold text-blue-700 mb-3'>Monthly/Yearly Earnings</h3>
                    <EarningsChart totalMonthly={totalMonthly} totalYearly={totalYearly} />
                </div>
                <div className='col-span-3 lg:col-span-1 shadow-md p-3 mb-4'>
                    <h3 className='font-bold text-blue-700 mb-3'>Online/Offline Earnings</h3>
                    <ConsultationChart onlineAmount={onlineEarning} offlineAmount={offlineEarning} />
                </div>
            </div>

            {/* Top Doctors and Notifications */}
            <div className='grid grid-cols-2 gap-4 mx-24 mb-4'>
                <div className='col-span-1 shadow-md '>
                    <h3 className='font-bold text-blue-700 mb-3'>Top Doctors</h3>
                    <div className='mx-3 my-3'>
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mr-3 ">
                            <thead>
                                <tr className="bg-blue-500 text-white leading-normal">
                                    <th className="py-3 px-3 text-middle">Doctor</th>
                                    <th className="py-3 px-3 text-middle">Appointments</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {topDoctors.map((doctor, key) => (
                                    <tr key={key} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-3 text-middle whitespace-nowrap">

                                            <span className="font-medium ">Dr. {doctor.doctor__name}</span>

                                        </td>
                                        <td className="py-3 px-3">
                                            <span className="text-gray-800 font-semibold ">{doctor.total_bookings}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>



                </div>
                <div className='col-span-1 shadow-md'>
                    <h3 className='font-bold text-blue-700 mb-3'>Notifications</h3>

                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div className='m-3' key={notification.id}>
                                <div
                                    id="toast-interactive"
                                    className="my-2 w-full max-w-full p-4 text-gray-500 bg-blue-50 rounded-lg shadow-2xl dark:bg-gray-800 dark:text-gray-400"
                                    role="alert"
                                >
                                    <div className="flex">
                                        <div className="w-full ms-3 text-sm font-bold">
                                            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                {notification.title}
                                            </span>
                                            <div className="mb-2 text-sm font-normal">
                                                {notification.message}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleNotification(notification.id)}
                                            type="button"
                                            className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-blue-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                            data-dismiss-target="#toast-interactive"
                                            aria-label="Close"
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg
                                                className="w-3 h-3"
                                                aria-hidden="true"
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
                                </div>
                            </div>
                        ))
                    ) : (
                        <div >
                            <h1 className="text-blue-700 dark:text-blue-300 font-bold  text-2xl my-12 ">No Notifications</h1>
                        </div>
                    )}





                </div>

            </div>

        </div>


    )
}

export default AdminDashboard