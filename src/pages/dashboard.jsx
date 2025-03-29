import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">PRODCEDE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/account">Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
            </ul>
            <div className="d-flex">
              {user ? (
                <span className="text-white me-3">Welcome, {user.name}</span>
              ) : (
                <>
                  <a href="/login" className="btn btn-outline-light me-2">Login</a>
                  <a href="/signup" className="btn btn-primary">Sign Up</a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <div className="container mt-4">
        <h1 className="text-primary text-center mb-4">Available Products</h1>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {loading ? (
          <div className="text-center mt-3">
            <p className="text-muted">Loading products...</p>
          </div>
        ) : (
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="col-md-4">
                  <div className="card text-center shadow-sm mb-4">
                    <img src={product.image} className="card-img-top" alt={product.name} />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                      <button className="btn btn-primary">Select</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-3">
                <p className="text-muted">No products available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
