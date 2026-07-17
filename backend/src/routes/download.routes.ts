import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { downloadController } from "../controllers/download.controller";

const router = Router();

router.post("/", authMiddleware, downloadController);

export default router;
