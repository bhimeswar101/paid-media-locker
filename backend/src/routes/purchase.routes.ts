import { Router } from "express";
import {
  purchase,
  myPurchases,
} from "../controllers/purchase.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Buy media
router.post("/", authMiddleware, purchase);

// My purchases
router.get("/", authMiddleware, myPurchases);

export default router;