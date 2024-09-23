import React, { useEffect } from 'react'
import DocNavBar from './DocNavBar'
import { useLocation } from 'react-router-dom'
import { doctorapi } from '../../api'

function PatientReports() {
    const { state } = useLocation()
    const { patient } = state || {}
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await doctorapi.get("report/", { params: { "patient": patient } })
                console.log(response)

            } catch (error) { console.log(error) }
        }; fetchReports();

    }, [])

    return (
        <div><DocNavBar />
        </div>
    )
}

export default PatientReports