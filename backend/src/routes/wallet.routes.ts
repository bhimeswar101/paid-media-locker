import { Router } from "express";
import {
  getWalletController,
  addCoinsController,
  walletHistoryController,
} from "../controllers/wallet.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Get wallet balance
router.get("/", authMiddleware, getWalletController);

// Add coins
router.post("/add", authMiddleware, addCoinsController);

// Transaction history
router.get("/transactions", authMiddleware, walletHistoryController);

export default router;