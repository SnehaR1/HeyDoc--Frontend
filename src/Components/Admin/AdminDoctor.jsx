import React from 'react'
import AdminNavBar from './AdminNavBar'
import { useNavigate } from 'react-router-dom'
function AdminDoctor() {
    const navigate = useNavigate()
    return (
        <div><AdminNavBar />
            <button onClick={() => navigate("/addDoctor")}>Add Doctor +</button></div>
    )
}

export default AdminDoctor