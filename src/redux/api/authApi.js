const BASE_URL = '/api/auth';

const getErrorMessage = async (response, fallback) => {
  try {
    const errorData = await response.json();
    return errorData.detail || errorData.message || errorData.error || JSON.stringify(errorData) || fallback;
  } catch {
    try {
      const text = await response.text();
      return text || fallback;
    } catch {
      return fallback;
    }
  }
};

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
      throw new Error(await getErrorMessage(response, 'Login failed'));
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
      throw new Error(await getErrorMessage(response, 'Failed to fetch admin info'));
    }

    return await response.json();
  },
};

export default authApi;
