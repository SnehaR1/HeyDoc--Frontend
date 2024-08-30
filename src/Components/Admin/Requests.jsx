import React, { useState, useEffect } from 'react'
import AdminNavBar from './AdminNavBar'
import { doctorapi } from '../../api';

function Requests() {
    const [requests, setRequests] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await doctorapi.get("doctor_request/")
                console.log(response)
                setRequests(response.data.data)


            } catch (error) {
                console.log(error)
            }
        };
        fetchRequests();
    }, [refresh])

    const handleEdit = async (id, action) => {
        try {

            const response = await doctorapi.delete(`doctor_request/${id}`, { data: { action: action } })
            console.log(response)
            setRefresh(!refresh)

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <AdminNavBar />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-12 my-6 ">




                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-24 py-3">
                                Message
                            </th>
                            <th scope="col" className=" px-24 py-3 ">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map(request => (





                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" >
                                    <td className="px-6 py-4">


                                        {request.email}
                                    </td>
                                    <td className="px-24 py-4">
                                        {request.message}


                                    </td>
                                    <td className="px-12 py-4">
                                        <div >

                                            <button onClick={() => handleEdit(request.id, "accept")} name="message" value="accept" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-3">
                                                Accept
                                            </button>
                                            <button onClick={() => handleEdit(request.id, "reject")} name="message" value="reject" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                                Reject
                                            </button>
                                        </div>
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

export default Requests