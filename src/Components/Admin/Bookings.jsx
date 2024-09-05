import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api'

function Bookings() {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await adminapi.get("bookings/")
                setBookings(response.data.bookings)
                console.log(response)

            } catch (error) {
                console.log(error)
            }
        }; fetchBookings();

    }, [])
    return (
        <div><AdminNavBar />
            <h1 className='text-blue-800 text-2xl my-3 font-bold'>Bookings</h1>
            <div className="relative overflow-x-auto flex justify-center items-center ">
                {
                    bookings.length !== 0 ? <table className="w-full mx-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-blue-900 dark:bg-blue-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                </th>
                                <td className="px-6 py-4"></td>

                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4 ">

                                </td>
                                <td className="relative px-6 py-4 flex flex-row">

                                </td>
                            </tr>





                        </tbody>
                    </table> : <div className='flex justify-center items-center my-32'> <h1 className='text-blue-500 font-bold text-2xl'>No Bookings</h1></div>

                }

            </div>
        </div>
    )
}

export default Bookings