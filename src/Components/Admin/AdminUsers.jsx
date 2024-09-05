import React, { useState, useEffect } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api';
import { MdBlock } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
function AdminUsers() {
    const [users, setUsers] = useState([])
    const [block, setBlock] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState(null)
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await adminapi.get("users/")
                console.log(response)
                setUsers(response.data.users)

            } catch (error) {
                console.log(error)
            }
        }; fetchUsers();
    }, [refresh])

    const handleEdit = async () => {
        const info = { "id": id, "block": block }
        try {
            const response = await adminapi.patch("users/", info)
            console.log(response)
            setOpenModal(false)
            setId(null)
            setBlock(false)
            setRefresh(refresh => !refresh)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div><AdminNavBar />
            <h1 className='text-blue-800 text-2xl my-3 font-bold'>USERS</h1>
            <div className="relative overflow-x-auto flex justify-center items-center ">
                <table className="w-full mx-32 mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-blue-900 dark:bg-blue-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>



                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            users.map((user, key) => (


                                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.id}
                                    </th>


                                    <td className="px-6 py-4">
                                        {user.username}
                                    </td>



                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.phone}
                                    </td>

                                    {
                                        user.is_active ?

                                            <td onClick={() => { setId(user.id); setBlock(false); setOpenModal(true) }} className="relative px-6 py-4 flex flex-row  ">

                                                <MdBlock className='text-red-500 text-xl mr-2' /> <span className='font-semibold'>Block</span>


                                            </td>
                                            :
                                            <td onClick={() => { setId(user.id); setBlock(true); setOpenModal(true) }} className="relative px-6 py-4 flex flex-row ">
                                                <FaRegCircle className='text-green-500 text-xl mr-2' /><span className='font-semibold'>Unblock</span>


                                            </td>

                                    }
                                </tr>
                            ))




                        }


                        {openModal ? <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button onClick={() => setOpenModal(false)} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only" >Close modal</span>
                                    </button>
                                    <div class="p-4 md:p-5 text-center">
                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        {block ? <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Unblock the User?</h3> : <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Block the User?</h3>}
                                        <button onClick={handleEdit} data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                            Yes, I'm sure
                                        </button>
                                        <button onClick={() => setOpenModal(false)} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            : <></>}


                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default AdminUsers