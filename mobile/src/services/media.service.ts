import api from "../api/api";

export const getAllMedia = async () => {
  const response = await api.get("/media");
  return response.data;
};

export const uploadMedia = async (
  title: string,
  image: string,
  preview: string,
  price: number
) => {
  const response = await api.post("/media", {
    title,
    image,
    preview,
    price,
  });

  return response.data;
};