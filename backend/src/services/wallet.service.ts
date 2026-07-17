import {
  findUserById,
  updateUserCoins,
  getUserTransactions,
  createWalletTransaction,
} from "../repositories/wallet.repository";

export const getWalletBalance = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    coins: user.coins,
  };
};

export const addCoinsToWallet = async (
  userId: string,
  amount: number
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await updateUserCoins(userId, amount);

  await createWalletTransaction(
    userId,
    amount,
    "Coins added to wallet"
  );

  const updatedUser = await findUserById(userId);

  return {
    success: true,
    message: "Coins added successfully",
    coins: updatedUser?.coins,
  };
};

export const getWalletHistory = async (userId: string) => {
  return getUserTransactions(userId);
};
