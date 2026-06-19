const BASE_URL = 'https://mm360.makingmindstechnologies.com/api/auth';

const authApi = {
  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/admin_signin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      let errorMessage = 'Login failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData) || errorMessage;
      } catch (e) {
        // Fallback if response is not JSON
        try {
          const text = await response.text();
          errorMessage = text || errorMessage;
        } catch (_) {}
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  },

  getAdminInfo: async (token) => {
    const response = await fetch(`${BASE_URL}/admin_info/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = 'Failed to fetch admin info';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData) || errorMessage;
      } catch (e) {
        try {
          const text = await response.text();
          errorMessage = text || errorMessage;
        } catch (_) {}
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  },
};

export default authApi;
