import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import LoginPage from './login_page'; 
import Inventory from './components/inventory';
import Report from './components/Report';
import Record_Managment from './components/Record_Managment';
import UserControle from './components/usercontrole';
import Settings from './components/Settings';
import Form from './components/Form/Form';
import Requisition from './components/Requisition/Requisition';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [News, setNews] = useState('There is no News at the moment.');
  const [Notice, setNotice] = useState('There is no Notice at the moment.');



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const handleLogout = () => {
    // Handle logout logic here
    setIsLoggedIn(false);
    console.log('Logout clicked');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ?(
        <LoginPage handleLogin={handleLogin} News={News} Notice={Notice}/>
      )  : (
        <>
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            handleLogout={handleLogout}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            
          />
          <div className={`content ${sidebarOpen ? '' : 'sidebar-close'}`}>
            <Nav toggleSidebar={toggleSidebar} />
            
            {activeItem === 'Dashboard' && <Dashboard />}
            {activeItem === 'Report' && <Report Reportopen={true} />}
            {activeItem === 'Inventory' && <Inventory Inventoryopen={true} />}
            {activeItem === 'Record Management' && <Record_Managment RecordManopen={true} />}
            {activeItem === 'User Access Control' && <UserControle UserControlopen={true} />}
            {activeItem === 'User Access Control' && <UserControle UserControleopen={true} />}
            {activeItem === 'Requisition' && <Requisition isOpen={true} />}
            {activeItem === 'Settings' && <Settings settinopen={true} setNews={setNews} setNotice={setNotice} />}
            {activeItem === 'Design Form' && <Form Formopen={true} />}

          </div>
        </>
      )}
    </div>
  );
}

export default App;
