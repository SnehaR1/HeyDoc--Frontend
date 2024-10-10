import React, { useState } from 'react'
import DocNavBar from './DocNavBar'
import { useSelector } from 'react-redux'
import EditDocProfile from './EditDocProfile'

function DoctorProfile() {
    const [edit, setEdit] = useState(false)
    const name = useSelector(state => state.doctorauth.name)
    const doc_email = useSelector(state => state.doctorauth.doc_email)
    const doc_phone = useSelector(state => state.doctorauth.doc_phone)
    const is_HOD = useSelector(state => state.doctorauth.is_HOD)
    const department = useSelector(state => state.doctorauth.department)
    const doc_id = useSelector(state => state.doctorauth.doc_id)
    console.log(department)
    const doc_image = useSelector(state => state.doctorauth.doc_image)
    const [docInfo, setDocInfo] = useState({ "name": name, "doc_phone": doc_phone, "doc_email": doc_email, "is_HOD": is_HOD, "department": department, "doc_image": doc_image })

    return (
        <div><DocNavBar />
            {edit ? <EditDocProfile props={{ name, doc_email, doc_phone, is_HOD, department, doc_image, doc_id }} edit={setEdit} setDocInfo={setDocInfo} /> :

                <div className='mt-2'>
                    <form className="max-w-lg mx-auto shadow-lg p-5 mt-3 mb-4" >
                        <h4 className='flex justify-center text-2xl font-bold text-blue-700 my-2'>PROFILE</h4>
                        <div className="max-w-lg mx-auto p-3 flex flex-col justify-center items-center">

                            <img class="h-24 max-w-md transition-all duration-300 rounded-lg mr-2 " src={`http://127.0.0.1:8000${docInfo.doc_image}`} alt="Department Image" />

                        </div>
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input value={docInfo.name} type="text" id="name" name="name" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input value={docInfo.doc_email} type="email" id="email" name="email" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                            <input value={docInfo.doc_phone} name='phone' type="text" id="phone" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                            <input value={docInfo.department} name="department" type="text" id="department" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                        </div>
                        <div className="flex flex-row justify-evenly">
                            <label htmlFor="is_HOD" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HOD</label>
                            <input checked={docInfo.is_HOD} name="is_HOD" type="checkbox" id="is_HOD" readOnly />
                        </div>

                        <button
                            onClick={() => setEdit(true)}
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                        >
                            Edit
                        </button>
                    </form>
                </div>

            }


        </div>
    )
}

export default DoctorProfile