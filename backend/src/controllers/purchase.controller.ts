import { Request, Response } from "express";
import {
  purchaseMedia,
  getUserPurchases,
} from "../services/purchase.service";

export const purchase = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;
    const { mediaId } = req.body;

    const result = await purchaseMedia(
      userId,
      mediaId
    );

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const myPurchases = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const purchases = await getUserPurchases(userId);

    res.json(purchases);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
