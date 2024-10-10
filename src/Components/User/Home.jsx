import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import HomeMain from '../../Images/HomeMain.jpg'
import { IoIosArrowDown } from "react-icons/io";
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { api, baseapi } from '../../api'

import { addBookingDetails } from '../../booking/bookingSlice'
import { useDispatch } from 'react-redux'
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const backStyle = {
        backgroundImage: `url(${HomeMain})`,
        backgroundSize: 'cover',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        BackgroundPosition: 'center',
        overflowY: 'auto',
        BackgroundAttachment: 'fixed',


    }
    const [departments, setDepartments] = useState([])
    const [doctors, setDoctors] = useState([])
    const fetchDepartments = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            const response = await baseapi.get("departments/",)
            console.log(response)
            setDepartments(response.data.departments)
            setDoctors(response.data.doctors)


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { fetchDepartments(); }, [])
    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)
    const [q3, setQ3] = useState(false)
    const [q4, setQ4] = useState(false)
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

    const reviewList = [{ "review": "HeyDoc is just awesome.Doctor Appointment Has never been this easy before.", "name": "Alaia Pradeesh", "who": "ABC News" }, { "review": "HeyDoc never dissapoints! It's the best one out there!", "name": "Aiswarya Pradeesh", "who": "Director of XYZ Medical Association" }]

    const [count, setCount] = useState(0)


    return (
        <div><NavBar />
            <div style={backStyle} className='grid grid-cols-4'>

                <div className='col-span-2 my-auto '>
                    <div className='mb-24'>
                        <div className='mb-4'>
                            <p className='font-bold text-white text-lg'>
                                We Offer The Best Available Services
                            </p>
                            <p className='text-5xl text-white font-bold'>DOCTORS TO THE RESCUE!</p>
                            <p className='font-bold text-white text-lg'>Book Your Doctor Now – Your Health Journey Starts Today!</p>
                        </div>
                        <button className='bg-blue-500 text-white p-3 rounded-md font-bold' onClick={() => navigate("/doctors")}>Book Now</button>
                    </div>
                </div>
                <div className='col-span-2 my-auto'>
                    <div className='mb-32'>
                        <h2 className='text-3xl text-white font-bold my-2'>WHY CHOOSE US?</h2>
                        <div className=' mx-36 flex flex-col'>
                            <div className='border border-y-4 rounded-tl-xl rounded-br-xl border-white p-2  hover:translate-x-5  my-2'>
                                <p className='font-bold text-white text-lg'>
                                    Expert Doctors at Your Fingertips
                                </p>

                            </div>
                            <div className='border border-y-4 rounded-tl-xl rounded-br-xl border-white p-2 hover:translate-x-5 my-2'>
                                <p className='font-bold text-white text-lg'>
                                    Online Doctor Consultations
                                </p>

                            </div>
                            <div className='border border-y-4 rounded-tl-xl rounded-br-xl border-white p-2 hover:translate-x-5 my-2'>
                                <p className='font-bold text-white text-lg'>
                                    Convenient & Easy Appointments
                                </p>

                            </div>
                            <div className='border border-y-4 rounded-tl-xl rounded-br-xl border-white p-2 hover:translate-x-5 my-2'>
                                <p className='font-bold text-white text-lg'>
                                    24/7 Access to Medical Records
                                </p>

                            </div>

                        </div>
                    </div>

                </div>

            </div>


            <div className='mx-24'>
                <h2 className='text-blue-700 text-2xl font-bold my-2'>DEPARTMENTS</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
                    {departments.map((department, index) => (

                        <div
                            onClick={() => { const docs = doctors.filter(doctor => doctor.department === department.dept_name); navigate("/department", { state: { department: department, docs: docs } }) }}
                            key={index}
                            className='flex flex-col items-center'
                            style={{
                                backgroundImage: `url(http://127.0.0.1:8000${department.dept_image})`,
                                backgroundSize: 'cover',
                                height: '200px',
                                width: '100%'
                            }}
                        >

                            <p className=' font-bold text-white hover:text-blue-700 mt-36 text-l' >{department.dept_name}</p>
                        </div>
                    ))}
                </div>

            </div>
            <div className='mx-24'>
                <h2 className='text-blue-700 text-2xl font-bold my-2'>Meet Our Doctors</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
                    {doctors.slice(0, 8).map((doctor, index) => (

                        <div key={index} className='flex flex-col items-center border shadow-xl p-3 rounded-md'>
                            <img src={`http://127.0.0.1:8000${doctor.doc_image}`} alt={doctor.name} className='w-full h-48 object-fit' />
                            <p className='mt-2 text-center font-semibold'>{doctor.name}</p>
                            <p className='mt-2 text-center font-semibold'>{doctor.department}</p>
                            <button className="w-half rounded-xl bg-blue-600 px-3 py-2 text-l font-medium text-white mt-3" onClick={() => handleBookingNavigation(doctor.doc_id)}>Book an Appointment</button>
                        </div>
                    ))}
                </div>

            </div>
            <div> <h2 className='text-blue-700 text-2xl font-bold my-2'>Frequently Asked Questions</h2>
                <div className='grid grid-cols-6 '>
                    <div className='col-start-3 col-end-5 bg-slate-100 border rounded-r-md shadow-lg my-3'>
                        <p className='text-black font-bold p-2 flex flex-row justify-center '>
                            Is Online payment a must? <IoIosArrowDown className='mt-1 ml-2 ' onClick={() => setQ1(!q1)} />

                        </p>
                        {q1 &&
                            <p className='p-2 '>
                                No,There is an option for direct payment as well.

                            </p>
                        }
                    </div>


                    <div className='col-start-3 col-end-5 bg-slate-100 border rounded-r-md shadow-lg my-3'>
                        <p className='text-black font-bold p-2 flex flex-row justify-center '>
                            Does HeyDoc provide Online Consultation? <IoIosArrowDown className='mt-1 ml-2 ' onClick={() => setQ2(!q2)} />

                        </p>
                        {q2 &&
                            <p className='p-2 '>
                                Yes,Online Consultation are provided.Video Calling services are provided in this website Only.You will be briefed on how by our team as soon as you make an apppointment.

                            </p>
                        }
                    </div>


                    <div className='col-start-3 col-end-5 bg-slate-100 border rounded-r-md shadow-lg my-3'>
                        <p className='text-black font-bold p-2 flex flex-row justify-center '>
                            Will i get a refund if I cancel the appointment? <IoIosArrowDown className='mt-1 ml-2 ' onClick={() => setQ3(!q3)} />

                        </p>
                        {q3 &&
                            <p className='p-2 '>
                                Yes,if you are eligible and is cancelling before the appointment date you will surely be able refunded and will be kept updated with each steps.Don't forget to check your emails.

                            </p>
                        }
                    </div>
                    <div className='col-start-3 col-end-5 bg-slate-100 border rounded-r-md shadow-lg my-3'>
                        <p className='text-black font-bold p-2 flex flex-row justify-center '>
                            Can I book for anytime in the future any day I want? <IoIosArrowDown className='mt-1 ml-2 ' onClick={() => setQ4(!q4)} />

                        </p>
                        {q4 &&
                            <p className='p-2 '>
                                Yes,Booking can be done for any day in the future but not on the same day you want to book.

                            </p>
                        }
                    </div>


                </div>



            </div>

            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">

                    <figure className="max-w-screen-md mx-auto">
                        <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                        </svg>
                        <blockquote>
                            <p className="text-2xl font-medium text-gray-900 dark:text-white">{reviewList[count].review}</p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3">
                            <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-gray-900 dark:text-white">{reviewList[count].name}</div>
                                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{reviewList[count].who}</div>
                            </div>
                        </figcaption>
                    </figure>

                    <div className='flex flex-row justify-center mt-4'>
                        {count > 0 && (
                            <GrFormPreviousLink
                                className='text-4xl ml-2'
                                onClick={() => setCount(prevCount => prevCount - 1)}
                            />
                        )}
                        {count < reviewList.length - 1 && (
                            <GrFormNextLink
                                className='text-4xl mr-2'
                                onClick={() => setCount(prevCount => prevCount + 1)}
                            />
                        )}
                    </div>
                </div>



            </section>


            <Footer /></div>
    )
}

export default Home