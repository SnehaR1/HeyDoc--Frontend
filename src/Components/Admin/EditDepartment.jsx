
import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import { useLocation } from 'react-router-dom';
import { adminapi } from '../../api';
import { useNavigate } from 'react-router-dom';

function EditDepartment() {
    const location = useLocation();
    const { dept } = location.state || {};
    const [info, setInfo] = useState({
        dept_name: dept?.dept_name || '',
        dept_description: dept?.dept_description || '',
    });
    const [img, setImg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (dept) {
            setInfo({
                dept_name: dept.dept_name,
                dept_description: dept.dept_description,
            });
        }
    }, [dept]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('dept_name', info.dept_name);
        formData.append('dept_description', info.dept_description);
        if (img) {
            formData.append('dept_image', img);
        }

        try {
            const response = await adminapi.put(`department/${dept.dept_id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);

            navigate('/adminDepartment');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevInfo => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setImg(e.target.files[0]);
    };

    if (!dept) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container mx-auto mt-12 p-4 max-w-4xl">
                <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1 className='text-blue-800 text-2xl my-3 font-bold'>EDIT DEPARTMENT</h1>
                    <div className="my-6">
                        <label htmlFor="dept_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input
                            onChange={handleChange}
                            value={info.dept_name}
                            name="dept_name"
                            type="text"
                            id="dept_name"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Department Name"
                            required
                        />
                    </div>
                    <div className='flex flex-col my-6'>
                        <label htmlFor="dept_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea
                            onChange={handleChange}
                            value={info.dept_description}
                            name="dept_description"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus"
                            placeholder="Department Description"
                            required
                        />
                    </div>
                    <div className="max-w-lg mx-auto p-3 flex flex-row">
                        <img className="h-24 max-w-md transition-all duration-300 rounded-lg mr-2" src={`http://127.0.0.1:8000${dept.dept_image}`} alt="Department Image" />
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="dept_image">Upload Image</label>
                            <input
                                onChange={handleFileChange}
                                name='dept_image'
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                aria-describedby="dept_image_help"
                                id="dept_image"
                                type="file"
                            />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditDepartment;
