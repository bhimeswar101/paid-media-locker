import axios from "axios";
import { getToken } from "../storage/authStorage";

const api = axios.create({
  baseURL: "http://192.168.31.102:5000/api",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  console.log("=================================");
  console.log("INTERCEPTOR TOKEN:", token);

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;

    console.log(
      "AUTH HEADER:",
      config.headers.Authorization
    );
  } else {
    console.log("NO TOKEN FOUND");
  }

  console.log("REQUEST:", config.url);
  console.log("=================================");

  return config;
});

export default api;