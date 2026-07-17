import api from "../api/api";

export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};