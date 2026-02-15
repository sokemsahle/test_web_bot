import React, { useState } from 'react';
import { 
  Pencil, 
  Upload, 
  PlusCircle, 
  ChevronRight, 
  HelpCircle,
  Info
} from 'lucide-react';

const StandardForms = ({ formopen }) => {
  const [filter, setFilter] = useState('all');
  const [showNewForm, setShowNewForm] = useState(false);

  if (!formopen) return null;

  const forms = [
    { name: 'Child Profile', status: 'modified' },
    
  ];

  return (
    <div className="standard-forms">
      {showNewForm ? (
        <NewForm onClose={() => setShowNewForm(false)} />
      ) : (
        <>
          {/* Main Content Area */}
          <div className="main-content">
            <div className="header">
              <div className="title-section">
                <h1 className="title">Standard Forms</h1>
                
              </div>
              
            </div>

            <div className="form-container">
              {/* Header Bar */}
              <div className="form-header">
                <span className="header-text">Select the Form You Wish to Modify Below</span>
                
              </div>

              {/* List Items */}
              <div className="form-list">
                {forms.map((form, index) => (
                  <div 
                    key={index} 
                    className="form-item"
                  >
                    <div className="form-info">
                      {form.status === 'modified' ? (
                        <Pencil className="status-icon modified" />
                      ) : (
                        <Upload className="status-icon published" />
                      )}
                      <span className="form-name">{form.name}</span>
                      <div className="arrow-icon"></div>
                    </div>
                    <div className="actions">
                      <span className="actions-text">Actions</span>
                      <ChevronRight className="actions-icon" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="formsidebar">
            {/* Form Actions Card */}
            <div className="actions-card">
              <div className="card-header">
                <span>Form Actions</span>
                <div className="dropdown-icon"></div>
              </div>
              <div className="card-content">
                <button className="action-btn" onClick={() => setShowNewForm(true)}>
                  <PlusCircle className="btn-icon" /> Tier 1 From Scratch
                </button>
                
              </div>
            </div>

            {/* Form List Filters Card */}
            <div className="filters-card">
              <div className="card-header">
                <span>Form List Filters</span>
                <div className="dropdown-icon"></div>
              </div>
              <div className="card-content">
                <label className="filter-option">
                  <input type="radio" name="filter" defaultChecked /> All
                </label>
                <label className="filter-option">
                  <input type="radio" name="filter" /> 
                  <Upload className="filter-icon published" /> Published
                </label>
                <label className="filter-option">
                  <input type="radio" name="filter" /> 
                  <Pencil className="filter-icon modified" /> Modified
                </label>
                <label className="filter-option">
                  <input type="radio" name="filter" /> 
                  <div className="unpublished-icon">
                    <Upload className="unpublished-icon-inner" />
                  </div> Unpublished
                </label>
                <hr className="divider" />
                <label className="checkbox-option">
                  <input type="checkbox" /> Show/Hide Inactive Forms
                </label>
              </div>
              <p className="note">
                You can only sort Forms when all Forms are visible.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StandardForms;