import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi, api } from '../../api';
import { useNavigate } from 'react-router-dom';

function AddDoctor() {
    const [departments, setDepartments] = useState([])
    const [info, setInfo] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const res = await adminapi.get("doctor/?type=department")
                console.log(res.data.data)
                setDepartments(res.data.data)

            } catch (error) {
                console.log(error)
            }
        }; fetchDepartment();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (const key in info) {
            if (typeof info[key] === "string") {
                if (info[key].trim() === "") {
                    alert("Please fill all the fields")
                }
                else {
                    info[key] = info[key].trim()
                }
            }
        }
        try {
            const response = await adminapi.post("doctor/", info, {
                headers: {
                    "Content-Type": "multipart/form-data"

                }
            })
            console.log(response)
            navigate("/adminDoctor")

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <AdminNavBar />
            <div className="container mx-auto mt-12 p-4 max-w-4xl">
                <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-bold'>Add Doctor</h1>
                    <div className="my-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="name" type="text" id="ame" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Doctor's Name" required />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="email" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus" placeholder="Email" required />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="phone" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus" placeholder="Phone" required />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="password" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus" placeholder="Password" required />
                    </div>
                    <div className="max-w-sm mx-auto">
                        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <select onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name='department' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected >Choose a Department</option>
                            {departments.map((item, key) => (


                                <option value={item.dept_id} key={item.dept_id} >{item.dept_name}</option>
                            ))


                            }



                        </select>
                    </div>

                    <div className="flex justify-center items-center my-6">
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.checked }) }} name="is_HOD" id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="isDeptHead" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department Head</label>
                    </div>
                    <div className="my-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="description" type="text" id="ame" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Doctor's description" required />
                    </div>
                    <div className="max-w-lg mx-auto p-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.files[0] }) }} name='doc_image' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddDoctor