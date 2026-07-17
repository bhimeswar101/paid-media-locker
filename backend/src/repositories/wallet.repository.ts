import prisma from "../utils/prisma";

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const updateUserCoins = async (
  userId: string,
  amount: number
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      coins: {
        increment: amount,
      },
    },
  });
};

export const getUserTransactions = async (userId: string) => {
  return prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createWalletTransaction = async (
  userId: string,
  amount: number,
  description: string
) => {
  return prisma.transaction.create({
    data: {
      userId,
      amount,
      type: "DEPOSIT",
      description,
    },
  });
};
