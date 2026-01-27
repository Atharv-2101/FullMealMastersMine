import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SERVER_IP:4000', // e.g. http://192.168.1.5:4000
});

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
