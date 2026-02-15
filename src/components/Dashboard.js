import React from 'react';

const Dashboard = () => {
  // Simple summary cards
  const cards = [
    { icon: 'bx bx-face', value: '42', label: 'Total Children' },
    { icon: 'bx bx-child', value: '4', label: 'Underage Children' },
    { icon: 'bx bx-user', value: '15', label: 'Staff Members' },
    
    { icon: 'bx bx-bed', value: '8', label: 'Empty Beds' },
  ];

  // Simple Staff List Data
  const staffList = [
    { id: 1, name: 'Betelhame ', role: 'Orphanage Manager', contact: '+251 123 456 789', status: 'Active' },
    { id: 2, name: 'Dr betty', role: 'Pediatrician', contact: '+251 987 654 321', status: 'On Call' },
    { id: 3, name: 'Tigist', role: 'Head Caretaker', contact: '+251 555 0103', status: 'Active' },
    { id: 4, name: 'Abebe', role: 'Security', contact: '+251 555 0104', status: 'Active' },
    { id: 5, name: 'Hana', role: 'Cook', contact: '+251 555 0105', status: 'On Leave' },
    { id: 6, name: 'Hilina', role: 'HR', contact: '+251 555 0106', status: 'Active' },
  ];

  return (
    <main>
      <div className="header">
        <h1>Dashboard</h1>
        <ul className="breadcrumb">
          <li><a href="#">Home</a></li>
          /
          <li><a href="#" className="active">Dashboard</a></li>
        </ul>
      </div>

      {/* Summary Cards */}
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={index} className="card-item">
            <div className="card-icon">
                <i className={card.icon}></i>
            </div>
            <span className="info">
              <h3>{card.value}</h3>
              <p>{card.label}</p>
            </span>
          </li>
        ))}
      </ul>

      {/* Simple Staff Table Section */}
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Staff Members</h3>
            <i className='bx bx-search'></i>
            <i className='bx bx-filter'></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <p style={{fontWeight: '500'}}>{staff.name}</p>
                  </td>
                  <td>{staff.role}</td>
                  <td>{staff.contact}</td>
                  <td>
                    <span className={`status ${staff.status.toLowerCase().replace(' ', '-')}`}>
                      {staff.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;