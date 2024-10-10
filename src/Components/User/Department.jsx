import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { api } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addBookingDetails } from '../../booking/bookingSlice'

function Department() {
    const { state } = useLocation()
    const { department, docs } = state || {}
    console.log(docs)
    const [doctors, setDoctors] = useState(docs)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(department)
    const description = (description) => {
        const listDescriptions = description.split("./n-")
        return listDescriptions


    }
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

    return (
        <div><NavBar />
            <div>
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white my-4">Welcome To {department.dept_name} </h2>
                <div className=" grid grid-cols-2 gap-12 my-12 mx-6 ">
                    <div className='col-span-1 '>
                        {description(department.dept_description).map((value, key) => (
                            <p key={key} className="font-normal text-base leading-6 text-gray-600 dark:text-white">
                                {value}

                            </p>


                        ))
                        }


                    </div>
                    <div className='col-span-1'>
                        <img src={`http://127.0.0.1:8000${department.dept_image}`} alt="department Image" />

                    </div>

                </div>

                <div>
                    <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white my-4">Meet Our Doctors </h2>
                    <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-3 mb-5">
                        {


                            docs.map((doctor, key) => (





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
            </div>



            <Footer />
        </div>
    )
}

export default Department