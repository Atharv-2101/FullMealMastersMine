import axios from "axios";
import { config } from "../../services/config";

const api = axios.create({
  baseURL: config.url,
});

// TEMP ADMIN TOKEN (DEV MODE)
const ADMIN_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2OTM0MDkwMH0.hJSmYgGc5vAvGUDVllEbhJ4FjU3cCoJcmfqlwE413qk";

// attach token automatically
api.interceptors.request.use((request) => {
  request.headers.Authorization = ADMIN_TOKEN;
  return request;
});

export default api;
