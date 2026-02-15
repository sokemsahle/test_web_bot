import React, { useState } from 'react';

const Nav = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('none');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', searchQuery, 'Program:', selectedProgram);
  };

  return (
    <nav>
      <i className="bx bx-menu" onClick={toggleSidebar}></i>
      <form onSubmit={handleSearch}>
        <div className="form-input">
          <select 
            name="Select Program" 
            id="program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="none"> Select Program</option>
            <option value="program1">Program 1</option>
            <option value="program2">Program 2</option>
            <option value="program3">Program 3</option>
            <option value="program4">Program 4</option>
          </select>
          <input 
            type="search" 
            placeholder="Search......"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <i className='bx bx-search'></i>
          </button>
        </div>
      </form>
      <a href="#" className="notification">
        <i className='bx bx-bell'></i>
        <span className="num">8</span>
      </a>
      <a href="#" className="profile">
        <img src="/Logo/logo-favicon.png" alt="Profile" />
      </a>
    </nav>
  );
};

export default Nav;
