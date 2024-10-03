import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
function ConsultationChart({ onlineAmount, offlineAmount }) {

    const onlineEarnings = onlineAmount ? onlineAmount["total"] : 0;
    const offlineEarnings = offlineAmount ? offlineAmount["total"] : 0;
    const data = [
        { name: "Online", Earnings: onlineEarnings },
        { name: "Offline", Earnings: offlineEarnings }
    ];
    const COLORS = ['#0088FE', '#00C49F'];
    return (
        <div >

            <PieChart width={500} height={400} margin={{ bottom: 0 }}>
                <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingLeft: 10 }}
                />

                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="Earnings"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />


            </PieChart>
        </div >
    )
}

export default ConsultationChart