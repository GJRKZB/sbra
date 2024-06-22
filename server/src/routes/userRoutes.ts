import { userLogin, userRegister, allReviewsUser } from "../controllers/index";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { CustomRequest } from "../types/types";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/users/:id/reviews", allReviewsUser);
router.get("/protected", authMiddleware, (req: CustomRequest, res) => {
  res.json({ message: "Access granted", user: req.user });
});

export default router;
