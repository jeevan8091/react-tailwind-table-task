import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../redux/utils/auth';
import { permissions } from "../config/rolePermissions";

const RoleProtectedRoute = ({ children }) => {
  const location = useLocation();
  // Authentication check
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  const role = (localStorage.getItem('role') || '').toLowerCase();
  const allowed = permissions[role] || [];
  // If the current path is not permitted for the role, redirect
  if (!allowed.includes(location.pathname)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RoleProtectedRoute;
