// src/utils/api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.1.27:3003",
  baseURL: "https://d2l873mxalz3b9.cloudfront.net",
});

// Add request interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
