const AUTH_KEY = 'isAuthenticated';

export const isAuthenticated = () =>
  localStorage.getItem(AUTH_KEY) === 'true';

export const login = ({ username, password }) => {
  const isValid = username.trim() === 'admin' && password === 'password';

  if (!isValid) {
    return false;
  }

  localStorage.setItem(AUTH_KEY, 'true');
  return true;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
