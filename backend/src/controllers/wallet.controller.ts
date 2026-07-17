import { Request, Response } from "express";
import {
  addCoinsToWallet,
  getWalletBalance,
  getWalletHistory,
} from "../services/wallet.service";

export const getWalletController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const wallet = await getWalletBalance(userId);

    res.status(200).json(wallet);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const addCoinsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;
    const { amount } = req.body;

    const result = await addCoinsToWallet(userId, amount);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const walletHistoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const history = await getWalletHistory(userId);

    res.status(200).json(history);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
