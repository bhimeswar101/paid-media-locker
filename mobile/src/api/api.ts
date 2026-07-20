import axios from "axios";
import { getToken } from "../storage/authStorage";

const api = axios.create({
  baseURL: "https://paid-media-locker-vy2t.onrender.com/api",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  console.log("========== REQUEST ==========");
  console.log("BASE URL:", config.baseURL);
  console.log("URL:", config.url);
  console.log("METHOD:", config.method);

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("FULL URL:", `${config.baseURL}${config.url}`);
  console.log("=============================");

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("SUCCESS:", response.status);
    return response;
  },
  (error) => {
    console.log("ERROR:", error.message);

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;