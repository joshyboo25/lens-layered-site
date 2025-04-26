// frontend/utils/api.js

const backendURL = window.location.hostname.includes('localhost')
  ? 'http://localhost:5000'
  : 'https://lens-backend-production-6f1d.up.railway.app';

const fallbackBackendURL = ''; // optional backup if you deploy a mirror

async function safeFetch(path, options = {}) {
  try {
    const response = await fetch(`${backendURL}${path}`, options);
    if (!response.ok) throw new Error('Primary backend failed');
    return response;
  } catch (error) {
    console.warn('⚠️ Primary backend failed:', error.message);
    if (fallbackBackendURL) {
      const fallbackResponse = await fetch(`${fallbackBackendURL}${path}`, options);
      if (!fallbackResponse.ok) throw new Error('Fallback backend also failed');
      return fallbackResponse;
    } else {
      throw new Error('Both primary and fallback backend failed');
    }
  }
}

// Core API functions
const api = {
  signup: async (username, email, password) => {
    const response = await safeFetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await safeFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getDashboard: async () => {
    const token = localStorage.getItem('authToken');
    const response = await safeFetch('/api/user/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  uploadImage: async (file) => {
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('image', file);

    const response = await safeFetch('/api/user/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    return response.json();
  }
};

export default api;
