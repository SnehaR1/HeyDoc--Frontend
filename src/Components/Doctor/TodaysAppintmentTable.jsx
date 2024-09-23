import React, { useState, useEffect } from 'react'
import { doctorapi } from '../../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function TodaysAppintmentTable() {
    const [patients, setPatients] = useState([])
    const doc_id = useSelector(state => state.doctorauth.doc_id)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchInfo = async () => {
            try {

                const response = await doctorapi.get("dashboard/", { params: { "doc_id": doc_id } })
                console.log(response)
                setPatients(response.data.patients)
            } catch (error) {
                console.log(error)
            }
        }; fetchInfo()
    }, [])
    return (

        <div>

            <div className="relative overflow-x-auto mx-72">
                <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-blue-800 dark:bg-blue-900 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Mode of Consultation
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Report
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            patients && patients.map((patient, key) => (
                                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {patient.patient}
                                    </th>
                                    <td className="px-6 py-4">
                                        {patient.time_slot}
                                    </td>
                                    <td className="px-6 py-4">
                                        {patient.consultation_mode === "Online" ?
                                            <p className='text-blue-600 underline' onClick={() => navigate("/onlineRoom")}> Video Call</p> : <p>{patient.consultation_mode}</p>

                                        }  </td>

                                    <td className="px-6 py-4 ">
                                        <span className='text-blue-600 underline' onClick={() => navigate("/addReport", { state: { user_id: patient.booked_by, patient_name: patient.patient } })}> Add Report</span>
                                    </td>
                                </tr>

                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>



    )
}

export default TodaysAppintmentTable