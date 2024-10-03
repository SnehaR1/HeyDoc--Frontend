import React, { useState, useEffect } from 'react'
import DocNavBar from './DocNavBar'
import { useLocation } from 'react-router-dom'
import { doctorapi } from '../../api'
import { useNavigate } from 'react-router-dom'
function PatientReports() {
    const { state } = useLocation()
    const { patient } = state || {}
    const [patientInfo, setPatientInfo] = useState({})
    const [reports, setReports] = useState([])
    const [dates, setDates] = useState([])
    const [selectedReport, setSelectedReport] = useState({})
    const [date, setDate] = useState(null)
    const navigate = useNavigate()



    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await doctorapi.get("report/", { params: { "patient": patient } })
                console.log(response)
                setPatientInfo(response.data.patient)
                setReports(response.data.reports)

                const reportDates = response.data.reports.map(report => report.report_date);
                setDates(reportDates);
            } catch (error) { console.log(error) }
        }; fetchReports();

    }, [])
    console.log(dates)
    const handleSelection = (date) => {
        setDate(date)
        let report = null;
        for (let i = 0; i < reports.length; i++) {
            if (reports[i]["report_date"] === date) {
                report = reports[i];

                break;
            }
        }



        if (report) {
            setSelectedReport(report);


        } else {
            alert("No report made on this date!");
        }
    };



    return (
        <div><DocNavBar />

            <div className='flex flex-col mx-32 justify-center  items-center'>

                <div className='p-12 shadow-md bg-blue-50 my-6'>

                    <div className='flex items-center space-x-4  my-3' >
                        <div className='bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center '>
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7m0 0L3 9m9 5l9-5-9-5" />
                            </svg>
                        </div>
                        <h4 className='text-xl font-semibold text-gray-800'>{patientInfo.name}</h4>
                    </div>

                    <div className='border-t border-gray-200 pt-4 '>
                        <p className='text-gray-600'><span className='font-semibold'>Patient ID:</span> <span className='text-gray-800'>{patientInfo.patient_id}</span></p>
                        <p className='text-gray-600'><span className='font-semibold'>Gender:</span> <span className='text-gray-800'>{patientInfo.gender}</span></p>
                        <p className='text-gray-600'><span className='font-semibold'>Age:</span> <span className='text-gray-800'>{patientInfo.age}</span></p>
                        <p className='text-gray-600'><span className='font-semibold'>Phone:</span> <span className='text-gray-800'>{patientInfo.phone}</span></p>
                    </div>

                </div>
            </div>
            <div className='grid gird-col-6 my-2'>

                <div className='col-span-1 p-2 mx-6'>
                    <h3 className='text-blue-800 '>Select a Date</h3>

                    <select name="date" id="date" onClick={(e) => { e.preventDefault(); handleSelection(e.target.value) }}>
                        {
                            dates.map(date => (<option key={date} value={date}>{date}</option>))
                        }

                    </select>

                </div>
                {
                    date === null ? <div className='flex justify-center items-center font-bold text-2xl  text-blue-800'>Pick A Date</div> : <div className='mb-6 bg-slate-100 mx-24 p-4 shadow-lg  col-span-5'>
                        <h3 className='font-bold text-blue-700 text-2xl mb-12'> REPORT</h3>

                        <div className='flex flex-row p-2 justify-between mx-32 '>
                            <p className='text-gray-500'>Report ID: {selectedReport.report_id}</p>
                            <p className='text-gray-500'>Report Date: {selectedReport.report_date}</p>

                        </div>
                        <div>
                            <div>
                                <div className='flex flex-row p-2 justify-center bg-slate-50 mx-32 my-6 '>
                                    <p className='text-black font-bold mx-3'>Weight: <span className='text-gray-700 font-normal'>{selectedReport.weight}</span></p>
                                    <p className='text-gray-black  font-bold mx-3'>Height: <span className='text-gray-700 font-normal'>{selectedReport.height}</span></p>

                                </div>
                                <div className='flex flex-col p-4 bg-slate-50 my-4'>
                                    <p className='text-black font-bold my-3 flex flex-col'>Allergies: <span className='text-gray-700 font-normal'>{selectedReport.allergies}</span></p>
                                    <p className='text-black font-bold my-3 flex flex-col'>Family History: <span className='text-gray-700 font-normal'>{selectedReport.family_history}</span></p>
                                </div>
                                <div className='flex flex-col p-4 bg-slate-50 my-4'>
                                    <p className='text-black font-bold my-3 flex flex-col'>Symptoms: <span className='text-gray-700 font-normal'>{selectedReport.symptoms}</span></p>
                                    <p className='text-black font-bold my-3 flex flex-col'>Diagnosis: <span className='text-gray-700 font-normal'>{selectedReport.diagnosis}</span></p>
                                    <p className='text-black font-bold my-3 flex flex-col'>Medications: <span className='text-gray-700 font-normal'>{selectedReport.medications}</span></p>
                                </div>

                            </div>


                        </div>
                        <div className='flex justify-center items-center'><button className=' border rounded-md bg-blue-500 font-bold text-md text-white py-4 px-6' onClick={() => navigate("/editReport", { state: { report_id: selectedReport.report_id, patientInfo: patientInfo, selectedReport: selectedReport } })}>Edit</button></div>



                    </div>
                }


            </div>


        </div>
    )
}

export default PatientReports