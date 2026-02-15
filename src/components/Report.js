import React from "react";

const Report = ({Reportopen}) => {
    if (!Reportopen) return null;

    const reports = [
        { title: 'Monthly Sales', date: '2024-01-31', status: 'Completed' },
        { title: 'Inventory Overview', date: '2024-02-15', status: 'In Progress' },
        { title: 'User Activity', date: '2024-03-10', status: 'Completed' },
    ];

    return (

    <div className="report-section">
            <h2>Reports</h2>
            <table className="report-table">        
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>{report.status}</td>
                        </tr>
                    ))}     

                </tbody>
            </table>
        </div>



    )
};
export default Report;
