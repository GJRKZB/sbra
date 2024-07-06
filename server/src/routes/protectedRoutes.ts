import { protectedControllers } from "../controllers/protectedControllers";
import authMiddleware from "../middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/protected", authMiddleware, protectedControllers);

export default router;
