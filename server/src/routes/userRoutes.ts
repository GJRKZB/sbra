import { userLogin, userRegister, allReviewsUser } from "../controllers/index";
import { Router } from "express";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/users/:id/reviews", allReviewsUser);

export default router;
