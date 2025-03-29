import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const userId = 1; // Example user ID, replace with actual authentication ID

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        const allOrders = response.data;

        // Filter orders based on status
        const filteredOrders = allOrders.filter(order =>
          ["Pending", "Available for Collection", "On its Way"].includes(order.status)
        );

        // Separate user-specific orders
        const userSpecificOrders = filteredOrders.filter(order => order.userId === userId);
        setUserOrders(userSpecificOrders);
        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders', error);
        setError('Failed to load orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search query
  const filteredOrders = orders.filter(order =>
    order.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUserOrders = userOrders.filter(order =>
    order.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting function
  const sortOrders = (ordersList) => {
    return [...ordersList].sort((a, b) => {
      if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortOption === "status") return a.status.localeCompare(b.status);
      return 0;
    });
  };

  return (
    <div>
      {/* Navbar (Inherited from Dashboard) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">PRODCEDE</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/account">Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
            </ul>
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Orders Section */}
      <div className="container mt-5">
        <h1 className="text-center text-primary mb-4">Orders</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Search and Sort Controls */}
        <div className="d-flex justify-content-between mb-4">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select className="form-select w-25" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
            <option value="status">Sort by: Status</option>
          </select>
        </div>

        {/* User's Orders */}
        <h3 className="text-success">Your Orders</h3>
        <div className="row">
          {filteredUserOrders.length > 0 ? (
            sortOrders(filteredUserOrders).map((order) => (
              <div key={order.id} className="col-md-4">
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{order.item}</h5>
                    <p className="card-text text-muted">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p className={`badge ${
                      order.status === "Available for Collection" ? "bg-info" :
                      order.status === "On its Way" ? "bg-warning" :
                      "bg-secondary"
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No matching orders found.</p>
          )}
        </div>

        {/* Available Orders for Collection */}
        <h3 className="text-warning mt-4">Available Orders for Collection</h3>
        <div className="row">
          {filteredOrders.filter(order => order.status === "Available for Collection").length > 0 ? (
            sortOrders(filteredOrders.filter(order => order.status === "Available for Collection")).map((order) => (
              <div key={order.id} className="col-md-4">
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{order.item}</h5>
                    <p className="card-text text-muted">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p className="badge bg-info">{order.status}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No available orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
