import React from 'react'
import NavBar from './NavBar'
import HomeMain from '../../Images/HomeMain.jpg'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
function Home() {
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
    return (
        <div><NavBar />
            <div style={backStyle} className='grid grid-cols-4 '>

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

            {/* departments */}
            <div className='mx-24'>
                <h2 className='text-blue-700 text-2xl font-bold my-2'>DEPARTMENTS</h2>
                <div className='grid grid-cols-2'>
                    <div>
                        <div></div>

                    </div>

                </div>

            </div>


            <Footer /></div>
    )
}

export default Home