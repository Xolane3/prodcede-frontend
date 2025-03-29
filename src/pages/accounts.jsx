import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [bankInfo, setBankInfo] = useState({ accountNumber: '', bankName: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/user', user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  return (
    <div>
      {/* Navbar (Inherited from Dashboard) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">PRODCEDE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/account">Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Account Details */}
      <div className="container mt-4">
        <h1 className="text-primary text-center mb-4">Account Information</h1>
        <div className="card shadow-sm p-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={user.name} disabled={!isEditing} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={user.email} disabled={!isEditing} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" value={user.phone} disabled={!isEditing} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          </div>
          <div className="text-center">
            <button className="btn btn-primary me-2" onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
            {isEditing && <button className="btn btn-success" onClick={handleSave}>Save</button>}
          </div>
        </div>
      </div>

      {/* Bank Information */}
      <div className="container mt-4">
        <h2 className="text-primary text-center mb-4">Bank Information</h2>
        <div className="card shadow-sm p-4">
          <div className="mb-3">
            <label className="form-label">Bank Name</label>
            <input type="text" className="form-control" value={bankInfo.bankName} onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Account Number</label>
            <input type="text" className="form-control" value={bankInfo.accountNumber} onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })} />
          </div>
          <div className="text-center">
            <button className="btn btn-success">Save Bank Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
