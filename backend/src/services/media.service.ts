import {
  createMedia,
  getAllMedia,
  getMediaById as findMediaById,
} from "../repositories/media.repository";

export const uploadMedia = async (
  title: string,
  image: string,
  preview: string,
  price: number,
  ownerId: string
) => {
  if (!title || !image || !preview) {
    throw new Error("All fields are required");
  }

  if (price < 0) {
    throw new Error("Invalid price");
  }

  return createMedia(
    title,
    image,
    preview,
    price,
    ownerId
  );
};

export const listMedia = async () => {
  return getAllMedia();
};

export const getSingleMedia = async (id: string) => {
  const media = await findMediaById(id);

  if (!media) {
    throw new Error("Media not found");
  }

  return media;
};
export const getMediaById = async (id: string) => {
  return getSingleMedia(id);
};
