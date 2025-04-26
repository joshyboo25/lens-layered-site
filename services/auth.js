// frontend/services/auth.js
import api from '../utils/api.js';

const auth = {
  signupUser: async (username, email, password) => {
    try {
      const data = await api.signup(username, email, password);
      console.log('✅ Signup success:', data);
      return data;
    } catch (error) {
      console.error('❌ Signup failed:', error.message);
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      const data = await api.login(email, password);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        console.log('✅ Login success:', data);
        return data;
      } else {
        throw new Error(data.message || "Login failed.");
      }
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      throw error;
    }
  },

  logoutUser: () => {
    localStorage.removeItem('authToken');
    console.log('🚪 Logged out');
  },

  isLoggedIn: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
};

export default auth;

