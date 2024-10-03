import React, { useState } from 'react'
import {
    BarChart,
    Bar,

    XAxis,
    YAxis,

    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

function EarningsChart({ totalMonthly, totalYearly }) {
    const [type, setType] = useState("Monthly")
    console.log(totalMonthly)
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('default', { month: 'long' });
    }
    const data = []

    if (type === "Monthly") {
        if (Array.isArray(totalMonthly) && totalMonthly.length > 0) {
            for (let i = 0; i < totalMonthly.length; i++) {

                const month = totalMonthly[i]["month"].split("-")[1];


                const month_name = getMonthName(month);


                data.push({ "name": month_name, "Earnings": totalMonthly[i]["total"] });
            }
        } else {
            console.error("totalMonthly is either null or not an array");
        }


    }
    else if (type === "Yearly") {
        if (Array.isArray(totalYearly) && totalYearly.length > 0) {
            for (let i = 0; i < totalYearly.length; i++) {
                const year = totalYearly[i]["year"].split("-")[0];
                data.push({ "name": year, "Earnings": totalYearly[i]["total"] })
            }

        } else {
            console.error("totalYearly is either null or not an array");
        }
    }




    return (
        <div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Earnings" fill="#60a5fa" />

                </BarChart>
            </ResponsiveContainer>
            <div className='flex flex-row my-2 justify-center'>
                <button className='bg-blue-500 p-2 text-white mx-3 w-28 hover:bg-blue-600' onClick={() => setType("Yearly")} type="button">Yearly</button>
                <button className='bg-blue-500 p-2 text-white mx-3 w-28 hover:bg-blue-600' onClick={() => setType("Monthly")} type="button">Monthly</button>
            </div>


        </div>
    )
}

export default EarningsChart






