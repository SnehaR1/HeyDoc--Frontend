import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { useNavigate } from 'react-router-dom'
import { adminapi } from '../../api'
import { MdBlock } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
function AdminDoctor() {
    const [doctors, setDoctors] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [docId, setDocId] = useState(null)
    const navigate = useNavigate()
    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    }
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await adminapi.get("doctors/")
                console.log(response)
                setDoctors(response.data.doctors)

            } catch (error) {
                console.log(error)
            }
        }; fetchDoctors();
    }, [refresh])

    const handleBlock = async () => {
        try {
            const info = { "doc_id": docId, "is_active": isActive }
            const response = await adminapi.patch("doctors/", info)
            console.log(response)
            setOpenModal(false)
            setDocId(null)
            setIsActive(false)
            setRefresh(refresh => !refresh)


        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div><AdminNavBar />
            <h1 className='text-blue-800 text-2xl my-3 font-bold'>DOCTORS</h1>
            <button className="text-white font-bold p-3 rounded  my-3 bg-blue-700" onClick={() => navigate("/addDoctor")}>Add Doctor +</button>

            <div className="relative overflow-x-auto flex justify-center items-center ">
                <table className="w-full mx-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-blue-900 dark:bg-blue-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Doctor
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                About
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Account
                            </th>

                            <th scope="col" className="px-6 py-3">
                                fee
                            </th>
                            <th scope="col" className="px-6 py-3">
                                HOD
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc, key) => (
                            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {doc.doc_id}
                                </th>

                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white mt-4">
                                    <img className="w-10 h-10 rounded-full" src={`http://127.0.0.1:8000${doc.doc_image}`} alt="Doctor image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{doc.name}</div>
                                        <div className="font-normal text-gray-500">{doc.doc_email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {doc.doc_phone}
                                </td>
                                <td className="px-6 py-4">

                                    {doc.department}
                                </td>
                                <td className="px-6 py-4">
                                    {truncateText(doc.description, 3)}
                                </td>
                                {doc.account_activated ?
                                    <td className="px-6 py-4">
                                        Activated
                                    </td> : <td className="px-6 py-4">
                                        Not Activated
                                    </td>

                                }


                                <td className="px-6 py-4">
                                    ₹{doc.fee}
                                </td>

                                {doc.is_HOD ?
                                    <td className="px-6 py-4">
                                        HOD
                                    </td> : <td className="px-6 py-4">
                                        NO
                                    </td>
                                }



                                <td className="relative px-6 py-4   ">
                                    <div className='mb-3 flex flex-row'>

                                        <MdOutlineModeEdit
                                            className='mr-2 text-xl text-blue-900'
                                            onClick={() => navigate("/editDoctor", { state: { doc } })}

                                        /> {
                                            doc.active ?
                                                <MdBlock onClick={() => { setDocId(doc.doc_id); setIsActive(false); setOpenModal(true) }} className='text-red-500 text-xl' />



                                                :

                                                <FaRegCircle onClick={() => { setDocId(doc.doc_id); setIsActive(true); setOpenModal(true) }} className='text-green-500 text-xl mr-2' />




                                        } </div> </td>

                            </tr>


                        ))}


                    </tbody>
                </table>
                {openModal ? <div id="popup-modal" tabindex="-1" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => setOpenModal(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only" >Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                {isActive ? <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Unblock this Doctor?</h3> : <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Block this Doctor?</h3>}
                                <button onClick={handleBlock} data-modal-hide="popup-modal" type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setOpenModal(false)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                    : <></>}
            </div>


        </div>


    )
}

export default AdminDoctor