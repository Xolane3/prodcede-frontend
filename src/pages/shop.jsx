import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shops');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops', error);
      }
    };
    fetchShops();
  }, []);

  // Filter shops based on search query
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <Link className="nav-link" to="/account">Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/shop">Shop</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Shops */}
      <div className="container mt-4">
        <h1 className="text-center text-primary mb-4">Shops</h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search nearest shops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="row">
          {filteredShops.length > 0 ? (
            filteredShops.map(shop => (
              <div key={shop.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img src={shop.image} className="card-img-top" alt={shop.name} />
                  <div className="card-body">
                    <h5 className="card-title">{shop.name}</h5>
                    <p className="text-muted">{shop.location}</p>
                    <Link to={`/shop/${shop.id}`} className="btn btn-primary">View Products</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No shops found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
