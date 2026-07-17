import prisma from "../utils/prisma";

export const findMedia = async (mediaId: string) => {
  return prisma.media.findUnique({
    where: {
      id: mediaId,
    },
  });
};
export const findUser = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
export const alreadyPurchased = async (
  userId: string,
  mediaId: string
) => {
  return prisma.purchase.findUnique({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
  });
};
export const deductCoins = async (
  userId: string,
  amount: number
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      coins: {
        decrement: amount,
      },
    },
  });
};
export const createPurchase = async (
  userId: string,
  mediaId: string
) => {
  return prisma.purchase.create({
    data: {
      userId,
      mediaId,
    },
  });
};
export const createTransaction = async (
  userId: string,
  amount: number,
  description: string
) => {
  return prisma.transaction.create({
    data: {
      userId,
      amount,
      type: "PURCHASE",
      description,
    },
  });
};
export const findPurchasesByUser = async (userId: string) => {
  return prisma.purchase.findMany({
    where: {
      userId,
    },
    include: {
      media: true,
    },
  });
};