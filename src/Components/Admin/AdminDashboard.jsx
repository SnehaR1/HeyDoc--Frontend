import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminNavBar'
import { adminapi } from '../../api'
function AdminDashboard() {
    useEffect(() => {
        const fetchDashboardInfo = async () => {
            try {
                const response = await adminapi.get("/dashboard")
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }; fetchDashboardInfo()
    }, [])

    return (
        <div>
            <AdminNavBar />
        </div>
    )
}

export default AdminDashboard