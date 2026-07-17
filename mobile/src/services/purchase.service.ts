import api from "../api/api";

export const purchaseMedia = async (mediaId: string) => {
  const response = await api.post("/purchase", {
    mediaId,
  });

  return response.data;
};

export const getMyPurchases = async () => {
  const response = await api.get("/purchase");
  return response.data;
};