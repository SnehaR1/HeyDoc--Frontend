import React, { useState } from 'react';
import DocNavBar from './DocNavBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { doctorapi } from '../../api';

function LeaveApplicationForm() {
    const doc_id = useSelector(state => state.doctorauth.doc_id);

    const [info, setInfo] = useState({ "doctor": doc_id });
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setInfo({ ...info, [name]: files[0] });
        } else {
            setInfo({ ...info, [name]: value });
        }
    };

    const handleDateChange = (date, field) => {

        const formattedDate = date ? date.toISOString().split('T')[0] : '';
        setInfo({ ...info, [field]: formattedDate });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();



        for (const key in info) {
            formData.append(key, info[key]);
        }

        try {
            const response = await doctorapi.post("leave_application/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response);
            setInfo({ "doctor": doc_id })
            setMessage("Leave Application Submitted Successfully ")

        } catch (error) {
            console.error(error.response.data);

        }
    };

    return (
        <div>
            <DocNavBar />
            <h1 className='text-blue-800 text-2xl my-4 font-bold'>Leave Application</h1>
            <div>
                <form className="max-w-lg mx-auto mt-3 mb-4 p-4 shadow-xl" onSubmit={handleSubmit} encType='multipart/form-data'>
                    {
                        error !== "" && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
                        </div>
                    }
                    {
                        message !== "" && <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span class="font-medium">Success alert!</span> Change a few things up and try submitting again.
                        </div>
                    }

                    <div>
                        <label htmlFor="leave_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave Type</label>
                        <select onChange={handleChange} id="leave_type" name='leave_type' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Vacation Leave">Vacation Leave</option>
                            <option value="Personal Leave">Personal Leave</option>
                            <option value="Maternity Leave">Maternity Leave</option>
                            <option value="Paternity Leave">Paternity Leave</option>
                            <option value="Bereavement Leave">Bereavement Leave</option>
                        </select>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div className="mt-4">
                            <label htmlFor="leave_start_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                            <DatePicker
                                selected={info.leave_start_date ? new Date(info.leave_start_date) : null}
                                onChange={(date) => handleDateChange(date, 'leave_start_date')}
                                placeholderText="Select date"
                                className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="leave_end_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                            <DatePicker
                                selected={info.leave_end_date ? new Date(info.leave_end_date) : null}
                                onChange={(date) => handleDateChange(date, 'leave_end_date')}
                                placeholderText="Select date"
                                className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reason</label>
                        <textarea onChange={handleChange} id="reason" name="reason" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Reason for Leave"></textarea>
                    </div>

                    <div className="max-w-lg mx-auto">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="supporting_document">Upload file</label>
                        <input onChange={handleChange} name='supporting_document' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Submit a document that supports your claim, if any.</div>
                    </div>

                    <button type="submit" className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default LeaveApplicationForm;
