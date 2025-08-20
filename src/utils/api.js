// src/utils/api.js
import axios from "axios";

// export const API_URL = "http://192.168.0.104:3003";
export const API_URL = "https://d2l873mxalz3b9.cloudfront.net";
// export const API_URL = "http://localhost:3003";

const api = axios.create({
  // baseURL: "http://192.168.0.104:3003",
  baseURL: "https://d2l873mxalz3b9.cloudfront.net",
  // baseURL: "http://localhost:3003",
});

// Add request interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
