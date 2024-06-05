import { Router, Response } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { CustomRequest } from "../types/types";

const router = Router();

router.get(
  "/api/protected",
  authMiddleware,
  (req: CustomRequest, res: Response) => {
    return res
      .status(200)
      .json({ message: "This is a protected route", user: req.user });
  }
);

export default router;
