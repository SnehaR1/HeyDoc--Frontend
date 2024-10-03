import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../../api'
import SelectedReport from './SelectedReport'
import NavBar from './NavBar'
import Footer from './Footer'
function Reports() {
    const { state } = useLocation()
    const { name, age, gender } = state
    const [reports, setReports] = useState([])
    const [dates, setDates] = useState([])
    const [selectedReport, setSelectedReport] = useState({})
    const [date, setDate] = useState(null)
    useEffect(() => {
        const fetchReports = async () => {
            try {

                const response = await api.get("reports/", { params: { "name": name } },)
                console.log(response)
                setReports(response.data.reports)

                const reportDates = response.data.reports.map(report => report.report_date);
                setDates(reportDates);
            } catch (error) {
                console.log(error)
            }

        }; fetchReports();
    }, [])

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
        <div><NavBar />
            {
                reports.length === 0 ? <div className='flex justify-center items-center my-auto'><div className='my-32'><h1 className='text-blue-700 text-3xl font-bold'>No Reports to Show</h1>
                </div></div> :
                    <div className='grid gird-col-6 my-4'>

                        <div className='col-span-1 p-2 mx-6 my-3'>
                            <h3 className='text-blue-800 '>Select a Date</h3>

                            <select name="date" id="date" onClick={(e) => { e.preventDefault(); handleSelection(e.target.value) }}>
                                {
                                    dates.map(date => (<option key={date} value={date}>{date}</option>))
                                }

                            </select>

                        </div>
                        {
                            date === null ? <div className='flex justify-center items-center font-bold text-2xl  text-blue-800'>Pick A Date</div> : <div className="flex justify-center my-3"><SelectedReport name={name} age={age} gender={gender} selectedReport={selectedReport} /></div>

                        }


                    </div>


            }
            <Footer />

        </div>
    )
}

export default Reports