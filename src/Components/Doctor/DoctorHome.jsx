import React from 'react'
import DocNavBar from './DocNavBar'
import TodaysAppintmentTable from './TodaysAppintmentTable'


function DoctorHome() {


    return (
        <div><DocNavBar />
            <TodaysAppintmentTable />
        </div>
    )
}

export default DoctorHome