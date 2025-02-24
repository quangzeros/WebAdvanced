// auth.js
import axios from "axios";

export const useAuth = () => {
  const getCsrfToken = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
  };

  const login = async (credentials) => {
    await getCsrfToken();
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, credentials);
    // Handle login success or failure
  };

  // Other authentication-related functions

  return {
    getCsrfToken,
    login,
    // Other authentication-related functions
  };
};
