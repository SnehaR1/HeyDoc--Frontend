import React, { useState, useEffect } from 'react'
import DocNavBar from './DocNavBar'
import TodaysAppintmentTable from './TodaysAppointmentTable'
import { doctorapi } from '../../api';
import { useSelector } from 'react-redux';
import { GiMoneyStack } from "react-icons/gi";
import { FaBookMedical } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";

import { ImManWoman } from "react-icons/im";
import EarningsChart from './EarningsChart';
import ConsultationChart from './ConsultationChart';


function DoctorHome() {
    const doc_id = useSelector(state => state.doctorauth.doc_id)
    const [totalPatients, setTotalPatients] = useState(null)
    const [totalAppointments, setTotalAppointments] = useState(null)
    const [totalEarning, setTotalEarning] = useState(null)
    const [currentMonthEarning, setCurrentMonthEarning] = useState(null)
    const [currentAnnualEarning, setAnnualEarning] = useState(null)
    const [totalYearly, setYearlyEarning] = useState([])
    const [totalMonthly, setMonthlyEarning] = useState([])
    const [todaysAppointments, setTodaysAppointments] = useState([])
    const [onlineEarning, setOnlineEarning] = useState(null)
    const [offlineEarning, setOfflineEarning] = useState(null)
    const [monthlyDifference, setMonthlyDifference] = useState(null)

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await doctorapi.get("dashboard/", { params: { "doc_id": doc_id } })
                console.log(response)
                setCurrentMonthEarning(response.data.current_month_total)
                setAnnualEarning(response.data.current_year_total)
                setMonthlyEarning(response.data.monthly_earnings)
                setOfflineEarning(response.data.offline_consultation_earning)
                setOnlineEarning(response.data.online_consultation_earning)
                setTodaysAppointments(response.data.todays_appointment)
                setTotalAppointments(response.data.total_appointments)
                setTotalEarning(response.data.total_earning["total"])
                setTotalPatients(response.data.total_patients)
                setYearlyEarning(response.data.yearly_earnings)
                setMonthlyDifference(response.data.monthly_difference)




            } catch (error) {
                console.log(error)
            }
        }; if (doc_id) {
            fetchInfo();
        }
    }, [])


    return (
        <div><DocNavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-32 my-4">
                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-8'>
                        <h3 className='font-bold text-l text-blue-600 '>Total Earnings</h3>
                        <span className='text-black text-xl font-bold mt-2'>₹{totalEarning}</span>
                    </div>
                    <GiMoneyStack className='text-gray-400 text-6xl' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Annual Earnings</h3>
                        <span className='text-black text-xl font-bold mt-2'>₹{currentAnnualEarning}</span>
                    </div>
                    <FaIndianRupeeSign className='text-gray-400 text-4xl my-auto' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Monthly Earnings</h3>
                        <span className='text-black text-xl font-bold mt-2'>₹{currentMonthEarning}</span>
                    </div>
                    <FaCalendar className='text-gray-400 text-4xl my-auto' />
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
                        <h3 className='font-bold text-l text-blue-600 '>Total Patients</h3>
                        <span className='text-black text-xl font-bold mt-2'>{totalPatients}</span>
                    </div>
                    <ImManWoman className='text-gray-400 text-4xl my-auto' />
                </div>

                <div className="bg-slate-100 shadow-xl p-6 flex flex-row items-center justify-between h-24">
                    <div className='mr-6'>
                        <h3 className='font-bold text-l text-blue-600 '>Profit/Loss Comparison</h3>
                        <span className={`text-xl font-bold mt-2 ${monthlyDifference >= 0 ? 'text-green-500' : 'text-red-500'}`}>₹{monthlyDifference}</span>
                    </div>
                    <GoGraph className='text-gray-400 text-4xl my-auto' />
                </div>

            </div>

            {/* Charts */}
            <div className='grid grid-cols-4 gap-6 mx-24 my-6'>

                <div className='col-span-3 lg:col-span-2 shadow-md p-3 mb-4'>
                    <h3 className='font-bold text-blue-700 mb-3'>Monthly/Yearly Earnings</h3>
                    <EarningsChart totalMonthly={totalMonthly} totalYearly={totalYearly} />
                </div>
                <div className='col-span-3 lg:col-span-2 shadow-md p-3 mb-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <h3 className='font-bold text-blue-700 mb-3'>Online/Offline Earnings</h3>
                        <ConsultationChart onlineAmount={onlineEarning} offlineAmount={offlineEarning} />
                    </div>

                </div>
            </div>

            {/* Todays Appointments */}
            <div className='mx-32 my-6 grid grid-col-1 shadow-lg'>
                <h3 className='font-bold text-blue-700 mb-3'>Today's Appointments</h3>
                {todaysAppointments.length > 0 ?

                    <TodaysAppintmentTable todaysAppointments={todaysAppointments} /> : <div >
                        <h1 className="text-blue-700 dark:text-blue-300 font-bold  text-2xl my-12 ">No Appointments</h1>
                    </div>
                }

            </div>

        </div>
    )
}

export default DoctorHome