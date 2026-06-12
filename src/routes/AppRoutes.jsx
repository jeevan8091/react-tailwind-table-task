import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Users from '../pages/Users/Users';
import EmployeeWizard from '../pages/EmployeeForm/EmployeeWizard';
import Profile from '../pages/Profile/Profile';
import ProjectList from '../projects/ProjectList';
import AddProject from '../projects/AddProject';
import EditProject from '../projects/EditProject';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout/Layout';
import { isAuthenticated } from '../redux/utils/auth';

const HomeRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />;
};

const AppRoutes = () => {
  return (
    
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/employee-form" element={<EmployeeWizard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
  );
};

export default AppRoutes;
