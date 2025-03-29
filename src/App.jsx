import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Shop from './pages/shop';
import Orders from './pages/orders';
import Account from './pages/accounts';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import PrivateRoute from './components/PrivateRoute.jsx'; // Make sure this file exists with the correct extension

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protect Dashboard route with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
