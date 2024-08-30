import React, { useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api';
import { useNavigate } from 'react-router-dom';

function AddDepartment() {
    const [info, setInfo] = useState({})
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const key in info) {
            if (typeof info[key] === 'string') {
                if (info[key].trim() === "") {
                    alert("Please fill all fields");
                }
                else {
                    info[key] = info[key].trim()
                }
            }
        }

        try {
            const response = await adminapi.post("department/", info, {
                headers: {
                    "Content-Type": "multipart/form-data"

                }

            }
            )
            console.log(response)
            navigate("/adminDepartment")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <AdminNavBar />
            <div className="container mx-auto mt-12 p-4 max-w-4xl">
                <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h1 className='text-2xl font-bold'>Add Department</h1>
                    <div className="my-6">
                        <label htmlFor="dept_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input name="dept_name" onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} type="text" id="dept_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Department Name" required />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="dept_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="dept_description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus" placeholder="Department Description" required />
                    </div>
                    <div class="max-w-lg mx-auto p-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
                        <input name='dept_image' onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.files[0] }) }} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment