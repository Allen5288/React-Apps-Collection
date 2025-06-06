import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Updated to match backend port
});

// Don't manually set Content-Type for FormData uploads
// The browser will automatically set it with the correct boundary parameter
// instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance;

