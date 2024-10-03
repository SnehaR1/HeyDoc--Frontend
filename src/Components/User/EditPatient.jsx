import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import { api } from '../../api'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
function EditPatient() {
    const { state } = useLocation()
    const { patient } = state || {}
    console.log(patient)
    const [patientInfo, setPatientInfo] = useState(patient)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.put("patient_form/", patientInfo)
            console.log(response)
            navigate("/profile")

        } catch (error) {

        }
    }
    return (
        <div>
            <NavBar />
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="flex flex-col items-center justify-center overflow-y-clip mb-6 mt-4">

                <h4 className='flex justify-center text-2xl font-bold text-blue-700 mt-4'>Edit Patient</h4>

                <div
                    className="relative p-4 w-full max-w-md rounded-lg shadow-xl mb-12 dark:bg-gray-700">

                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={patientInfo.name}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Patient's Name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="age"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Age
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={patientInfo.age}
                                    type="text"
                                    name="age"
                                    id="age"
                                    placeholder="Patient's Age"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="gender"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Gender
                                </label>
                                <select
                                    onChange={handleChange}
                                    name="gender"
                                    id="gender"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={patientInfo.gender}
                                >
                                    <option value="">Choose a gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Phone
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={patientInfo.phone}
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Available Phone Number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div className='flex flex-row justify-evenly'>
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Active?
                                </label>
                                <input
                                    onChange={(e) => setPatientInfo({ ...patientInfo, [e.target.name]: e.target.checked })}
                                    checked={patientInfo.is_active}
                                    type="checkbox"
                                    name="is_active"
                                    id="is_active"
                                    placeholder="Available Phone Number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Update Patient
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EditPatient
