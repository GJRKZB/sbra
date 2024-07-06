import { userLogin, userRegister, allReviewsUser } from "../controllers/index";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/users/:slug/reviews", authMiddleware, allReviewsUser);

export default router;
