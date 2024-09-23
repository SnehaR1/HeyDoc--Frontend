import React, { useEffect, useState } from 'react';
import { adminapi, doctorapi } from '../../api';
import { useDispatch } from 'react-redux';
import { updateDoc } from '../../auth/doctorauthSlice';
function EditDocProfile({ props, edit, setDocInfo }) {
    const [editInfo, setEditInfo] = useState({
        name: props.name,
        email: props.email,
        phone: props.phone,
        doc_image: props.doc_image,
        department: props.department,
        is_HOD: props.is_HOD
    });
    const [departments, setDepartments] = useState([]);
    const doc_id = props.doc_id;
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const res = await adminapi.get("doctor_form/?type=department");
                console.log(res.data.data);
                setDepartments(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDepartment();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedDept = departments.find(department => department.dept_name === editInfo.department);
        const dept_id = selectedDept ? selectedDept.dept_id : undefined;

        console.log(dept_id);

        const formData = new FormData();
        formData.append('name', editInfo.name);
        formData.append('email', editInfo.email);
        formData.append('phone', editInfo.phone);
        formData.append('department', dept_id);
        formData.append('is_HOD', editInfo.is_HOD ? 'true' : 'false');

        if (editInfo.doc_image instanceof File) {
            formData.append('doc_image', editInfo.doc_image);
        }

        try {
            const response = await doctorapi.put(`edit_profile/${doc_id}/`, formData);
            console.log(response);
            const name = editInfo.name
            const email = editInfo.email
            const phone = editInfo.phone
            const doc_image = editInfo.doc_image
            const department = editInfo.department
            const is_HOD = editInfo.is_HOD
            setDocInfo({ "name": name, "phone": phone, "email": email, "is_HOD": is_HOD, "department": department, "doc_image": doc_image })
            dispatch(updateDoc({ name, email, phone, doc_image, department, is_HOD }))
            edit(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='mt-2'>
            <form className="max-w-lg mx-auto shadow-lg p-5 my-2" onSubmit={handleSubmit} encType="multipart/form-data">
                <h4 className='flex justify-center text-2xl font-bold text-blue-700 mt-2 mb-3'>EDIT PROFILE</h4>
                <img className="h-24 mx-auto max-w-md transition-all duration-300 rounded-lg" src={`http://127.0.0.1:8000${editInfo.doc_image}`} alt="Department Image" />
                <div className="max-w-md mx-auto p-3 flex flex-col">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
                        <input
                            onChange={(e) => setEditInfo({ ...editInfo, doc_image: e.target.files[0] })}
                            name='doc_image'
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="user_avatar_help"
                            id="user_avatar"
                            type="file"
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                        value={editInfo.name}
                        onChange={e => setEditInfo({ ...editInfo, name: e.target.value })}
                        name="name"
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        value={editInfo.email}
                        onChange={e => setEditInfo({ ...editInfo, email: e.target.value })}
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                    <input
                        value={editInfo.phone}
                        onChange={e => setEditInfo({ ...editInfo, phone: e.target.value })}
                        name='phone'
                        type="text"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="max-w-sm mx-auto mb-3">
                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="department"
                        value={editInfo.department || ""}
                        onChange={(e) => setEditInfo({ ...editInfo, department: e.target.value })}
                    >
                        <option value="" disabled>Choose a Department</option>
                        {departments.map((item) => (
                            <option key={item.dept_id} value={item.dept_id}>{item.dept_name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row justify-evenly">
                    <label htmlFor="is_HOD" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HOD</label>
                    <input
                        onChange={e => setEditInfo({ ...editInfo, is_HOD: e.target.checked })}
                        checked={editInfo.is_HOD}
                        name="is_HOD"
                        type="checkbox"
                        id="is_HOD"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditDocProfile;
