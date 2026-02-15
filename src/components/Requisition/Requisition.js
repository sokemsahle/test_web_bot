import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas'; // Import the library
import './Requisition.css';

const Requisition = ({ isOpen }) => {
  // State for form fields
  const [formData, setFormData] = useState({
    requestor: '',
    date: new Date().toISOString().substr(0, 10),
    department: '',
    description: '',
  });

  // State for dynamic table rows
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, price: 0, total: 0 }
  ]);

  // --- Signature State & Refs ---
  const sigPad = useRef({});
  const [signature, setSignature] = useState(null); // Stores the image URL
  const [isSigning, setIsSigning] = useState(false); // Toggles the canvas view

  // Handle input changes for header fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle changes in the items table
  const handleItemChange = (id, field, value) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Auto-calculate total if quantity or price changes
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = (updatedItem.quantity || 0) * (updatedItem.price || 0);
        }
        return updatedItem;
      }
      return item;
    });
    setItems(newItems);
  };

  // Add a new row
  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, description: '', quantity: 1, price: 0, total: 0 }
    ]);
  };

  // Remove a row
  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // --- Signature Functions ---
  const clearSignature = () => {
    sigPad.current.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    if (!sigPad.current.isEmpty()) {
      setSignature(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
      setIsSigning(false);
    }
  };

  // Calculate Grand Total
  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  if (!isOpen) return null;

  return (
    <main className="requisition-container">
      <div className="header">
        <h1>Requisition</h1>
        <ul className="breadcrumb">
          <li><a href="#">Management</a></li>
          /
          <li><a href="#" className="active">Requisition Form</a></li>
        </ul>
      </div>

      <div className="form-card">
        {/* Header Section */}
        <div className="form-header-grid">
          <div className="input-group">
            <label>General purpose</label>
            <input 
              type="text" 
              name="requestor" 
              value={formData.requestor} 
              onChange={handleInputChange} 
              placeholder="General Purpose"
            />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="input-group">
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleInputChange}>
              <option value="">Select Department</option>
              <option value="Admin">Administration</option>
              <option value="Program">Program</option>
            </select>
          </div>
        </div>

        {/* Dynamic Items Table */}
        <div className="items-table-container">
          <h3>Items Requested</h3>
          <table className="requisition-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th width="100">Quantity</th>
                <th width="120">Price/Units</th>
                <th width="120">Estimated Price </th>
                <th width="50"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input 
                      type="text" 
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      placeholder="Item name or details"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      min="0"
                      value={item.price}
                      onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value))}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={item.total} 
                      readOnly 
                      className="readonly-input"
                    />
                  </td>
                  <td>
                    <button 
                      className="btn-delete" 
                      onClick={() => removeItem(item.id)}
                      title="Remove Item"
                    >
                      <i className='bx bx-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="table-actions">
            <button className="btn-add" onClick={addItem}>
              <i className='bx bx-plus'></i> Add Item
            </button>
            <div className="grand-total">
              <span>Total:</span>
              <span className="amount">{grandTotal.toFixed(2)} Birr</span>
            </div>
          </div>
        </div>

        {/* Approval Section with Signature Canvas */}
        <div className="approvals-section">
          <h3>Approvals</h3>
          <div className="approval-grid">
            
            {/* 1. Requestor Signature Block */}
            <div className="approval-box signature-box">
              <label>Requested By:</label>
              
              {!isSigning && !signature ? (
                // State 1: No signature, show "Sign" button
                <button className="btn-sign-trigger" onClick={() => setIsSigning(true)}>
                  <i className='bx bx-pen'></i> Click to Sign
                </button>
              ) : isSigning ? (
                // State 2: Signing Mode (Canvas Active)
                <div className="signature-pad-container">
                  <SignatureCanvas 
                    ref={sigPad}
                    penColor="black"
                    canvasProps={{className: 'sigCanvas'}}
                  />
                  <div className="sig-controls">
                    <button className="btn-sig-clear" onClick={clearSignature}>Clear</button>
                    <button className="btn-sig-save" onClick={saveSignature}>Save</button>
                  </div>
                </div>
              ) : (
                // State 3: Signed (Show Image)
                <div className="signature-preview">
                  <img src={signature} alt="Requestor Signature" />
                  <button className="btn-sig-reset" onClick={() => {setSignature(null); setIsSigning(true);}}>
                    Re-sign
                  </button>
                </div>
              )}
            </div>

            <div className="approval-box">
              <label>Approved By (Manager):</label>
              <input type="text" placeholder="Waiting for approval..." disabled />
            </div>
            <div className="approval-box">
              <label>Authorized By (Finance):</label>
              <input type="text" placeholder="Waiting for authorization..." disabled />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="form-footer">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-primary">Submit Requisition</button>
        </div>
      </div>
    </main>
  );
};

export default Requisition;