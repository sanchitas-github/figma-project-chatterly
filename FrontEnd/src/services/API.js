import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// process.env.REACT_APP_BASE_URL

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// API.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   config.headers["Content-Type"] = "application/json";
//   config.headers.Accept = "application/json";
//   return config;
// });

// API.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       throw error;
//     }
//     throw error;
//   }
// );

export default API;

// axios.get("http://localhost:8000/api/health");
