import React from 'react';

const Sidebar = ({ sidebarOpen, darkMode, toggleDarkMode, handleLogout, activeItem, setActiveItem }) => {
  const menuItems = [
    { icon: 'bx bxs-dashboard', text: 'Dashboard' },
    { icon: 'bx bxl-dropbox', text: 'Inventory' },
    { icon: 'bx bxs-pen', text: 'Design Form' },
    { icon: 'bx bxs-report', text: 'Report' },
    { icon: 'bx bx-folder-plus', text: 'Record Management' },
    { icon: 'bx bx-user', text: 'User Access Control' },
    { icon: 'bx bx-cog', text: 'Settings' },
    { icon: 'bx bx-receipt', text: 'Requisition' },
  ];

  return (
    <div className={`sidebar ${sidebarOpen ? '' : 'close'}`}>
      <a href="/" className="logo">
        <img src="/test_web_bot/Logo/logo-favicon.png" alt="Logo" />
        <span>
          <img src="/test_web_bot/Logo/logo-1-primary.png" alt="SOKAPP" />
        </span>
      </a>
      
      <ul className="side-menu">
        {menuItems.map((item, index) => (
          <li key={index} className={item.text === activeItem ? 'active' : ''}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setActiveItem(item.text);
            }}>
              <i className={item.icon}></i>
              {item.text}
            </a>
          </li>
        ))}
      </ul>

      <div className="side-menu">
        <ul>
          <li>
            <a href="#" className="dark-mode-toggle" onClick={(e) => {
              e.preventDefault();
              toggleDarkMode();
            }}>
              <i className='bx bx-moon'></i>dark / light
            </a>
          </li>
          <li>
            <a href="#" className="logout" onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}>
              <i className='bx bx-log-out-circle'></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
