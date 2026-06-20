import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Users from '../pages/Users/Users';
import EmployeeWizard from '../pages/EmployeeForm/EmployeeWizard';
import Profile from '../pages/Profile/Profile';
import ProjectList from '../projects/ProjectList';
import AddProject from '../projects/AddProject';
import EditProject from '../projects/EditProject';
import Reports from '../pages/Reports/Reports';
import Settings from '../pages/Settings/Settings';
import RoleProtectedRoute from '../components/RoleProtectedRoute';
import Layout from '../components/Layout/Layout';
import { useSelector } from 'react-redux';
import DynamicFormBuilder from '../pages/DynamicFormBuilder/DynamicFormBuilder';
import InvoiceBuilder from '../pages/InvoiceBuilder/InvoiceBuilder';
import Unauthorized from '../pages/Unauthorized/Unauthorized';

const HomeRoute = () => {
  const { isAuthenticated, token, loading } = useSelector(state => state.auth);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }
  return isAuthenticated && token ? <Navigate to="/dashboard" replace /> : <Login />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route element={<RoleProtectedRoute><Layout /></RoleProtectedRoute>}>
        <Route path="/dynamic-form-builder" element={<DynamicFormBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/employee-form" element={<EmployeeWizard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/projects/edit/:id" element={<EditProject />} />
        <Route path="/invoice-builder" element={<InvoiceBuilder />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
