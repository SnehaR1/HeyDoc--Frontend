import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TodaysAppintmentTable({ todaysAppointments }) {
    console.log(`Todays appointments: ${JSON.stringify(todaysAppointments)}`);

    const [todaysAppointmentsInfo, setTodaysAppointments] = useState(todaysAppointments);
    const navigate = useNavigate();

    return (
        <div>
            <div className="relative overflow-x-auto mx-72">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-blue-800 dark:bg-blue-900 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Time</th>
                            <th scope="col" className="px-6 py-3">Mode of Consultation</th>
                            <th scope="col" className="px-6 py-3">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todaysAppointmentsInfo && todaysAppointmentsInfo.map((appointment, key) => (
                            <tr key={key} className="text-black leading-normal">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {appointment.patient.name} {/* Accessing the nested patient object */}
                                </th>
                                <td className="px-6 py-4">
                                    {appointment.time_slot}
                                </td>
                                <td className="px-6 py-4">
                                    {appointment.consultation_mode === "Online" ? (
                                        <p className='text-blue-600 underline' onClick={() => navigate("/onlineRoom")}>Video Call</p>
                                    ) : (
                                        <p>{appointment.consultation_mode}</p>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className='text-blue-600 underline' onClick={() => navigate("/addReport", { state: { user_id: appointment.booked_by, patient_name: appointment.patient.name } })}>Add Report</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TodaysAppintmentTable;
