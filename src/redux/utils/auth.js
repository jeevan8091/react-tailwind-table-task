const AUTH_KEY = 'isAuthenticated';
const PASSWORD_KEY = 'adminPassword';
const PROFILE_KEY = 'adminProfile';

const defaultProfile = {
  firstName: 'Admin',
  lastName: 'User',
  employeeCode: 'EMP001',
  email: 'admin@gmail.com',
  role: 'Administrator',
  status: 'Active',
};

export const isAuthenticated = () =>
  localStorage.getItem(AUTH_KEY) === 'true';

export const login = ({ username, password }) => {
  const storedPassword = localStorage.getItem(PASSWORD_KEY) || 'password';
  const isValid = username.trim() === 'admin' && password === storedPassword;

  if (!isValid) {
    return false;
  }

  localStorage.setItem(AUTH_KEY, 'true');
  return true;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};

export const getAdminProfile = () => {
  const profile = localStorage.getItem(PROFILE_KEY);
  return profile ? JSON.parse(profile) : defaultProfile;
};

export const updateAdminProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const updateAdminPassword = (newPassword) => {
  localStorage.setItem(PASSWORD_KEY, newPassword);
};

export const checkAdminPassword = (password) => {
  const storedPassword = localStorage.getItem(PASSWORD_KEY) || 'password';
  return password === storedPassword;
};
