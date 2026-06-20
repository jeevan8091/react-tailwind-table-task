import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { permissions } from "../config/rolePermissions";

const RoleProtectedRoute = ({ children }) => {
  const location = useLocation();
  // Authentication check using Redux state
  const { isAuthenticated, token, user } = useSelector(state => state.auth);
  if (!isAuthenticated || !token) {
    return <Navigate to="/" replace />;
  }
  const role = (user?.role || localStorage.getItem('role') || '').toLowerCase();
  const allowed = permissions[role] || [];
  // If the current path is not permitted for the role, redirect
  if (!allowed.includes(location.pathname)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RoleProtectedRoute;
