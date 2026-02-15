import React from "react";


const UserControle = ({UserControlopen}) => {
    if (!UserControlopen) return null;
    const users = [
        { username: 'admin', role: 'Administrator', status: 'Active' },
        ];
    const Roles = [
        { role: 'Administrator', permissions: 'Full Access' },
        { role: 'Editor', permissions: 'Edit Content' },
    ];
    const siteandprograms = [
        { site: 'Main Office', program: 'After School' },
        { site: 'Community Center', program: 'Summer Camp' },
    ];


    return (    
    <div className="user-control-section">
            <h2>User Control</h2>
            <table className="user-control-table"> 
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>    
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Roles</h2>
            <table className="roles-table"> 
                <thead> 
                    <tr>
                        <th>Role</th>
                        <th>Permissions</th>

                    </tr>
                </thead>
                <tbody>
                    {Roles.map((role, index) => (
                        <tr key={index}>
                            <td>{role.role}</td>
                            <td>{role.permissions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Sites and Programs</h2>
            <table className="sites-programs-table">    
                <thead>
                    <tr>
                        <th>Site</th>
                        <th>Program</th>
                    </tr>
                </thead>
                <tbody>
                    {siteandprograms.map((sp, index) => (
                        <tr key={index}>
                            <td>{sp.site}</td>
                            <td>{sp.program}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserControle;