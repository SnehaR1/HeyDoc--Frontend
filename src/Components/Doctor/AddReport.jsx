import React, { useEffect, useState } from 'react'
import DocNavBar from './DocNavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { doctorapi } from '../../api'
import { useSelector } from 'react-redux'
function AddReport() {
    const { state } = useLocation()
    const { user_id, patient_name } = state || {}
    const [patientInfo, setPatientInfo] = useState({})
    const doctor = useSelector(state => state.doctorauth.doc_id)
    const [next, setNext] = useState(false)
    const [reportInfo, setReportInfo] = useState({ "patient_name": patient_name, "user_id": user_id, "doctor": doctor })
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBasicInfo = async () => {
            try {
                const response = await doctorapi.get("report/", { params: { "user_id": user_id, "patient_name": patient_name } })
                console.log(response)
                setPatientInfo(response.data.patient)

            } catch (error) {
                console.log(error)
            }
        }; fetchBasicInfo();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await doctorapi.post("report/", reportInfo)
            console.log(response)
            navigate("/doctorHome")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen overflow-clip '><DocNavBar />
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-2">
                <div className="text-center border-b pb-4 mb-4">
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {patientInfo.name}
                    </h5>
                    <span className="block text-sm text-gray-500">Patient ID: {patientInfo.patient_id}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div className="text-sm flex flex-row">
                        <p className="font-semibold text-gray-600">Gender:</p>
                        <p className="text-gray-900 mx-2">{patientInfo.gender}</p>
                    </div>
                    <div className="text-sm  flex flex-row mx-8">
                        <p className="font-semibold text-gray-600">Age:</p>
                        <p className="text-gray-900 mx-2">{patientInfo.age}</p>
                    </div>

                    <div className="text-sm  flex flex-row">
                        <p className="font-semibold text-gray-600">Contact:</p>
                        <p className="text-gray-900 mx-2">{patientInfo.phone}</p>
                    </div>



                </div>
            </div>

            <div>
                <form className="max-w-lg mx-auto mt-3 mb-4" onSubmit={handleSubmit}>
                    {next ? <><div className="mb-3">
                        <label for="symptoms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Symptoms</label>
                        <textarea id="symptoms" value={reportInfo.symptoms} onChange={(e) => { setReportInfo({ ...reportInfo, [e.target.name]: e.target.value }) }} name='symptoms' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Patient's Symptoms..."></textarea>
                    </div>



                        <div className="mb-3">
                            <label for="diagnosis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diagnosis</label>
                            <textarea id="diagnosis" value={reportInfo.diagnosis} onChange={(e) => { setReportInfo({ ...reportInfo, [e.target.name]: e.target.value }) }} name="diagnosis" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Diagnosis..."></textarea>
                        </div>
                        <div className="mb-3">
                            <label for="medicine" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medications</label>
                            <textarea id="medicine" value={reportInfo.medications} onChange={(e) => { setReportInfo({ ...reportInfo, [e.target.name]: e.target.value }) }} name="medications" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Prescribe Medications..."></textarea>
                        </div>
                        <div className=' flex-row'>    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={() => setNext(false)}>Back</button>  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button></div>
                    </> :
                        <><div className='flex flex-row justify-between'>
                            <div className="mb-5 ">
                                <label for="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight(kg)</label>
                                <input type="text" value={reportInfo.weight} onChange={(e) => { setReportInfo({ ...reportInfo, [e.target.name]: e.target.value }) }} id="weight" name="weight" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Weight" required />
                            </div>
                            <div className="mb-5">
                                <label for="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height(cm)</label>
                                <input type="text" value={reportInfo.height} onChange={(e) => { setReportInfo({ ...reportInfo, [e.target.name]: e.target.value }) }} id="height" name="height" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Height" required />
                            </div>
                        </div>

                            <div className="mb-5">
                                <label for="allergies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allergies</label>
                                <textarea id="allergies" value={reportInfo.allergies} onChange={(e) => { setReportInfo({ ...reportInfo, [e.target.name]: e.target.value }) }} name="allergies" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Patient's Allergies here..."></textarea>
                            </div>
                            <div className="mb-5">
                                <label for="family" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Family History</label>
                                <textarea id="family" value={reportInfo.family_history} onChange={(e) => { setReportInfo({ ...reportInfo, [e.target.name]: e.target.value }) }} name="family_history" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Relevant Family Medical History..."></textarea>
                            </div>
                            <div>

                            </div>
                            <button onClick={() => setNext(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button></>

                    }
                </form>

            </div>



        </div>
    )
}

export default AddReport