import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { api } from '../../api'
import { useNavigate } from 'react-router-dom'
import { addBookingDetails } from '../../booking/bookingSlice'
import { useDispatch } from 'react-redux'
function Doctors() {
    const [doctors, setDoctors] = useState([])
    const [allDoctors, setAllDoctors] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [departments, setDepartments] = useState([])
    const [openDropDown, setOpenDropDown] = useState(false)
    const [filteredDept, setFilteredDept] = useState("All Department")
    const [searchDoc, setSearchDoc] = useState("")
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const information = await api.get("doctors/")
                console.log(information)
                setDoctors(information.data.doctors)
                setAllDoctors(information.data.doctors)
                setDepartments(information.data.departments)
            } catch (error) {
                console.log(error)
            }
        }; fetchDoctors();
    }, [])

    const handleBookingNavigation = async (doc_id) => {
        try {
            console.log(doc_id)
            const response = await api.get("booking/", { params: { "doc_id": doc_id } })
            console.log(response)

            const data = response.data
            if (response.status === 200) {
                navigate('/bookingForm');
                const availability = data.availability;
                const time_slot = data.time_slot;
                const slots = data.slots;
                const doctor = doctors.find((doctor) => doctor["doc_id"] === doc_id);
                const fee = doctor ? doctor["fee"] : null;
                const evening_slots = data.evening_slots;
                const morning_slots = data.morning_slots;
                const days_available = data.days_available;






                dispatch(addBookingDetails({ availability, time_slot, slots, doc_id, fee, evening_slots, morning_slots, days_available }))
            } else {
                console.log("Failed to fetch booking data:", data.error);
            }


        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        const searchName = searchDoc.toLowerCase()
        if (filteredDept.length !== 0) {

            setDoctors(allDoctors.filter(doctor => doctor.department.dept_name === filteredDept && doctor.name.toLowerCase().includes(searchName)))
            setFilteredDept("")
        }
        else {
            setDoctors(allDoctors.filter(doctor => doctor.name.toLowerCase().includes(searchName)))
        }

    }
    return (
        <div><NavBar />




            <div className="text-center p-10">
                <h1 className="font-bold text-3xl mb-4">Meet Our Doctors</h1>

            </div>

            <form className="max-w-lg mx-auto" onSubmit={handleSearchSubmit}>
                <div className="flex items-center space-x-4">

                    <div className="relative flex-shrink-0">
                        <select onChange={(e) => { if (e.target.value === "All Departments") { setDoctors(allDoctors) } else { setFilteredDept(e.target.value); setDoctors(allDoctors.filter(doctor => doctor.department.dept_name === e.target.value)) } }}
                            id="department-select"
                            className="block py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        >
                            <option value="All Departments">All Departments</option>
                            {departments.map((department, index) => (
                                <option key={index} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative flex-grow">
                        <input
                            onChange={(e) => setSearchDoc(e.target.value)}
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Search your Doctor"
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





            <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-3 mb-5">
                {


                    doctors.map((doctor, key) => (





                        <div className="m-3 max-w-sm">
                            <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
                                <div className="relative mx-auto w-36 rounded-full">

                                    <img className="h-32 w-32 mx-auto rounded-full" src={`http://127.0.0.1:8000${doctor.doc_image}`} alt={doctor.name} />
                                </div>
                                <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{doctor.name}</h1>
                                <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{doctor.department.dept_name}</h3>
                                <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">{doctor.description}</p>
                                <button className="w-half rounded-xl bg-blue-600 px-4 py-3 text-xl font-medium text-white mt-3" onClick={() => handleBookingNavigation(doctor.doc_id)}>Book an Appointment</button>
                            </div>
                        </div>
                    ))



                }




            </section>


        </div>


    )
}

export default Doctors