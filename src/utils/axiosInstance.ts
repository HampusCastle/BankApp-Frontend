import axios from 'axios';
import { getJwtToken } from './jwtUtil';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    console.log("Token before attaching to request:", token);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers['Authorization']);
    } else {
      console.warn("No token found to set in Authorization header.");
    }
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;