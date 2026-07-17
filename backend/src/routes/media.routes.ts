import { Router } from "express";
import { create, getAll, getOne } from "../controllers/media.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Create media (protected)
router.post("/", authMiddleware, create);

// List all media
router.get("/", getAll);

// Get one media
router.get("/:id", getOne);

export default router;