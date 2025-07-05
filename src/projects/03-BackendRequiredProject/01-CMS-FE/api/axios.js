import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error responses
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_info');
          // Don't redirect here - let components handle it
          error.message = 'Login expired, please login again';
          break;
        case 403:
          error.message = 'Insufficient permissions to perform this operation';
          break;
        case 404:
          error.message = 'Requested resource not found';
          break;
        case 500:
          error.message = 'Server error, please try again later';
          break;
        case 502:
        case 503:
        case 504:
          error.message = 'Server temporarily unavailable, please try again later';
          break;
        default:
          error.message = message || 'Operation failed, please try again';
      }
    } else if (error.request) {
      // Network error
      error.message = 'Network connection failed, please check your network settings';
    } else {
      // Other errors
      error.message = error.message || 'Operation failed, please try again';
    }
    
    return Promise.reject(error);
  }
);

export default api;
