import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../redux/utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
