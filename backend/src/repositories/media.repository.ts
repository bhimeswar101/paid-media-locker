import prisma from "../utils/prisma";

export const createMedia = async (
  title: string,
  image: string,
  preview: string,
  price: number,
  ownerId: string
) => {
  return prisma.media.create({
    data: {
      title,
      image,
      preview,
      price,
      ownerId,
    },
  });
};

export const getAllMedia = async () => {
  return prisma.media.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          coins: true,
        },
      },
    },
  });
};

export const getMediaById = async (id: string) => {
  return prisma.media.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          coins: true,
        },
      },
    },
  });
};
