import api from "../api/api";

export const downloadMedia = async (mediaId: string) => {
  const response = await api.post("/download", {
    mediaId,
  });

  return response.data;
};