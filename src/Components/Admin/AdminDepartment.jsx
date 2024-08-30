import React from 'react'
import AdminNavBar from './AdminNavBar'
import { useNavigate } from 'react-router-dom'
function AdminDepartment() {
    const navigate = useNavigate()
    return (
        <div><AdminNavBar />
            <h1>Departments</h1>
            <button onClick={() => navigate("/addDepartment")}>Add Department +</button>
        </div>
    )
}

export default AdminDepartment