import React, { useState, useEffect } from 'react'
import DocNavBar from './DocNavBar'
import { doctorapi } from '../../api'
import { useSelector } from 'react-redux'

function DocPatients() {
    const [patients, setPatients] = useState([])
    const [filterPatients, setFilterPatients] = useState([])
    const [refresh, setRefresh] = useState(false)

    const doc_id = useSelector(state => state.doctorauth.doc_id)
    const [searchPatient, setSearchPatient] = useState(null)
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await doctorapi.get("patients/", { params: { "doc_id": doc_id } })
                console.log(response)
                setPatients(response.data.patients)
                setFilterPatients(response.data.patients)


            } catch (error) {
                console.log(error)
            }
        }; fetchPatients()
    }, [doc_id, refresh])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchPatient) {
            alert("Type something to search");
            return;
        }

        const searchTerm = searchPatient.toLowerCase();

        setPatients(filterPatients.filter(patient => {
            return (
                patient.name.toLowerCase().includes(searchTerm) ||
                (Number(searchPatient) === patient.id)
            );
        }));
        setSearchPatient('');
    };
    return (
        <div><DocNavBar />
            <h1 className='text-blue-800 text-2xl my-4 font-bold'>Patients</h1>

            <form className="max-w-lg mx-auto mb-4 mt-6" onSubmit={handleSearchSubmit} >
                <div className="flex items-center space-x-4">
                    <button className='bg-blue-600 py-3 px-4 rounded-md text-white font-bold' onClick={() => { setRefresh(refresh => !refresh); }}>All</button>

                    <div className="relative flex-grow">
                        <input
                            value={searchPatient}
                            onChange={e => setSearchPatient(e.target.value)}
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Search Patient by Name or ID"
                            required
                        />
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>


            <div className="relative overflow-x-auto flex justify-center items-center ">
                {patients.length > 0 ?
                    <table className="w-3/4 mx-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-blue-900 dark:bg-blue-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Age
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Appointment Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patients.map((patient, key) => (

                                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            {patient.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient.age}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient.gender}
                                        </td>
                                        <td className="px-6 py-4">
                                            {patient.last_appointment}
                                        </td>
                                    </tr>
                                ))

                            }

                        </tbody></table> : <h1 className='text-3xl text-blue-700 font-bold'> NO PATIENTS</h1>}
            </div></div>
    )
}

export default DocPatients