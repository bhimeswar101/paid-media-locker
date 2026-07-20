import axios from "axios";
import { getToken } from "../storage/authStorage";

const api = axios.create({
  baseURL: "https://paid-media-locker-rl7v.onrender.com/api",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;