import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavBar from '../User/NavBar';
import DocNavBar from './DocNavBar';
function OnlineRoom() {
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user_id)
    const handleEntry = useCallback(() => {
        navigate(`/onlineRoom/${value}`)
    }, [navigate, value])
    return (
        <div className="h-screen bg-blue-500 overflow-y-clip" >
            {user ? <NavBar /> : <DocNavBar />}


            <div className='flex justify-center items-center mt-24'>

                <div className=" flex flex-col justify-center items-center  max-w-sm p-12 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className='my-4'>
                        <label for="room" className=" mb-8 text-xl font-bold text-gray-900 dark:text-white">Room ID</label>
                        <input type="text" onChange={e => setValue(e.target.value)} name="room" id="room" className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter your Room ID" required />
                    </div>

                    <button className="inline-flex items-center px-6 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleEntry}>Enter</button>
                </div>
            </div>


        </div>
    )
}

export default OnlineRoom
