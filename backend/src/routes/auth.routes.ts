import { Router } from "express";
console.log("✅ auth.routes.ts loaded");
import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", authMiddleware, getProfile);

export default router;
