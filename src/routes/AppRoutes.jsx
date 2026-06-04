import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Users from '../pages/Users/Users';
import AddUser from '../pages/AddUser/AddUser';
import Profile from '../pages/Profile/Profile';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout/Layout';
import { isAuthenticated } from '../utils/auth';

const HomeRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
