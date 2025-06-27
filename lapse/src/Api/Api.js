import axios from "axios";

const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instances with base configuration
const ApiFormData = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const LoginUser = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include Authorization header
Api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ApiFormData.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

LoginUser.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);

// Export API functions
export const createUserApi = (data) => ApiFormData.post("/api/test/createUsers", data);
export const loginUserApi = (data) => LoginUser.post("/api/test/loginUser", data);
export const createTaskApi = (data) => Api.post("/api/tasks", data);
export const updateTaskApi = (id, data) => Api.put(`/api/tasks/${id}`, data);
export const deleteTaskApi = (id) => Api.delete(`/api/tasks/${id}`);
export const getTasksApi = () => Api.get("/api/tasks");