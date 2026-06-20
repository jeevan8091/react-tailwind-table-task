import authApi from '../api/authApi';

const authService = {
  loginUserService: async (credentials) => {
    try {
      return await authApi.login(credentials);
    } catch (error) {
      throw new Error(error.message || 'Error occurred during login service call', { cause: error });
    }
  },

  getAdminInfoService: async (token) => {
    try {
      return await authApi.getAdminInfo(token);
    } catch (error) {
      throw new Error(error.message || 'Error occurred during fetch admin info service call', { cause: error });
    }
  },
};

export default authService;
