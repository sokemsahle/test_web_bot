import React, { useState } from 'react';
import { 
  Search,
  Filter,
  Plus,
  MoreVertical,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Inventory = ({ Inventoryopen }) => {
  // Mock Data for Orphanage Inventory
  const [items, setItems] = useState([
    { id: 1, name: 'Baby Formula (Stage 1)', category: 'Food & Nutrition', quantity: 45, unit: 'Cans', location: 'Pantry A', status: 'In Stock' },
    { id: 2, name: 'Diapers (Size 4)', category: 'Hygiene', quantity: 12, unit: 'Packs', location: 'Storage B', status: 'Low Stock' },
    { id: 3, name: 'Math Textbooks', category: 'Education', quantity: 30, unit: 'Books', location: 'Study Room', status: 'In Stock' },
    { id: 4, name: 'Children\'s Paracetamol', category: 'Medical', quantity: 0, unit: 'Bottles', location: 'Clinic', status: 'Out of Stock' },
    { id: 5, name: 'Winter Jackets', category: 'Clothing', quantity: 25, unit: 'Coats', location: 'Wardrobe', status: 'In Stock' },
    { id: 6, name: 'Rice (25kg)', category: 'Food & Nutrition', quantity: 2, unit: 'Bags', location: 'Pantry A', status: 'Low Stock' },
  ]);

  if (!Inventoryopen) return null;

  return (
    <div className="inventory-page">
      {/* Header Section */}
      <div className="page-header">
        <div>
            <h1 className="page-title">Inventory</h1>
            <ul className="breadcrumb">
                <li><a href="#">Management</a></li>
                /
                <li><a href="#" className="active">Inventory</a></li>
            </ul>
        </div>
        <button className="btn-primary">
            <Plus size={20} />
            <span>Add New Item</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
            <div className="stat-icon bg-blue">
                <Package size={24} className="text-blue" />
            </div>
            <div className="stat-info">
                <h3>154</h3>
                <p>Total Items</p>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon bg-green">
                <CheckCircle size={24} className="text-green" />
            </div>
            <div className="stat-info">
                <h3>120</h3>
                <p>In Stock</p>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon bg-orange">
                <AlertTriangle size={24} className="text-orange" />
            </div>
            <div className="stat-info">
                <h3>12</h3>
                <p>Low Stock</p>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon bg-red">
                <XCircle size={24} className="text-red" />
            </div>
            <div className="stat-info">
                <h3>2</h3>
                <p>Out of Stock</p>
            </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="table-container">
        <div className="table-header">
            <div className="table-title">
                <h3>Inventory Items</h3>
            </div>
            <div className="table-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search items..." />
                </div>
                <button className="btn-icon">
                    <Filter size={20} />
                </button>
            </div>
        </div>

        <table className="custom-table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td className="font-medium">{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity} {item.unit}</td>
                        <td>{item.location}</td>
                        <td>
                            <span className={`status-badge ${item.status.toLowerCase().replace(/ /g, '-')}`}>
                                {item.status}
                            </span>
                        </td>
                        <td>
                            <button className="action-btn-ghost">
                                <MoreVertical size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;