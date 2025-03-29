import { useNavigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  const navigate = useNavigate();
  if (!token) {
    navigate('/login');
    return null;
  }

  return <Outlet />; // Render the protected route if the token exists
};

export default PrivateRoute;
