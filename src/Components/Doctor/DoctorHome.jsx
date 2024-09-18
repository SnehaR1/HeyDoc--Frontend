import React, { useState, useEffect } from 'react'
import DocNavBar from './DocNavBar'
import { doctorapi } from '../../api';
import { useSelector } from 'react-redux';

function DoctorHome() {
    const [patients, setPatients] = useState([])
    const doc_id = useSelector(state => state.doctorauth.doc_id)
    useEffect(() => {
        const fetchInfo = async () => {
            try {

                const response = await doctorapi.get("dashboard/", { params: { "doc_id": doc_id } })
                console.log(response)
                setPatients(response.data.patients)
            } catch (error) {
                console.log(error)
            }
        }; fetchInfo()
    }, [])

    return (
        <div><DocNavBar />
            Home
        </div>
    )
}

export default DoctorHome