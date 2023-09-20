import axios from "axios";

import { API_BASE_URL } from "./constants";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
  timeout: 2000,
});
