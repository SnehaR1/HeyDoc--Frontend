import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminapi } from '../../api'

function EditDoctor() {
    const location = useLocation()
    const { doc } = location.state || {}
    console.log(doc)
    const [info, setInfo] = useState({
        name: doc?.name || '',
        doc_email: doc?.doc_email || '',
        doc_phone: doc?.doc_phone || '',
        department: doc?.department || '',
        fee: doc?.fee || 0,
        is_HOD: doc?.is_HOD || false,
        description: doc?.description || '',
        doc_image: doc?.doc_image || null,
    });
    const [departments, setDepartments] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (doc) {
            setInfo(doc);
        }


        const fetchDepartment = async () => {
            try {
                const res = await adminapi.get("doctor_form/?type=department")
                console.log(res.data.data)
                setDepartments(res.data.data)

            } catch (error) {
                console.log(error)
            }
        }; fetchDepartment();
    }, [doc])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();


            formData.append('name', info.name);
            formData.append('doc_email', info.doc_email);
            formData.append('doc_phone', info.doc_phone);
            formData.append('department', info.department);
            formData.append('fee', info.fee);
            formData.append('is_HOD', info.is_HOD);
            formData.append('description', info.description);


            if (info.doc_image instanceof File) {
                formData.append('doc_image', info.doc_image);
            }

            const response = await adminapi.put(`doctor_form/${doc.doc_id}/`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            });

            console.log(response);
            navigate("/adminDoctor");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div><AdminNavBar />

            <div className="container mx-auto mt-4 p-4 max-w-4xl">
                <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8" encType="multipart/form-data" onSubmit={handleSubmit} >
                    <h1 className='text-blue-800 text-2xl my-3 font-bold'>EDIT DOCTOR</h1>
                    <div className="my-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={info.name} onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="name" type="text" id="ame" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Doctor's Name" required />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={info.doc_email} onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="doc_email" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus" placeholder="Email" required />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input value={info.doc_phone} onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} name="doc_phone" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus" placeholder="Phone" required />
                    </div>

                    <div className="max-w-sm mx-auto">
                        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <select
                            name="department"
                            value={info.department || ""}
                            onChange={(e) => setInfo({ ...info, department: e.target.value })}
                        >
                            <option disabled={!info.department} value="">
                                Choose a Department
                            </option>
                            {departments.map((item) => (
                                <option
                                    key={item.dept_id}
                                    value={item.id}
                                    selected={info.department === item.dept_name}
                                >
                                    {item.dept_name}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="max-w-sm mx-auto my-3">

                        <label htmlFor="fee" className="block text-sm font-medium text-gray-700">
                            Fee in INR
                        </label>
                        <input
                            type="number"
                            name="fee"
                            id="fee"
                            value={info.fee}
                            onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }}

                            step="1"
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Enter fee amount"
                        />
                    </div>

                    <div className="flex justify-center items-center my-6">
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.checked }) }} checked={info.is_HOD === true} name="is_HOD" id="inline-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="isDeptHead" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department Head</label>
                    </div>
                    <div className="my-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.value }) }} value={info.description} name="description" type="text" id="ame" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Doctor's description" required />
                    </div>
                    <div className="max-w-lg mx-auto p-3 flex flex-row">
                        <img class="h-24 max-w-md transition-all duration-300 rounded-lg mr-2 " src={`http://127.0.0.1:8000${doc.doc_image}`} alt="Department Image" />
                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
                            <input onChange={(e) => { setInfo({ ...info, [e.target.name]: e.target.files[0] }) }} name='doc_image' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                </form>
            </div>




        </div>
    )
}

export default EditDoctor
