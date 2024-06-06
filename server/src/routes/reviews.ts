import { Request, Response, Router } from "express";
// import Review from "../models/reviewModel";
import User from "../models/userModel";
import { CustomRequest } from "../types/types";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/api/reviews",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { title, reviews } = req.body;
    const reqBody = req.body;
    console.log(reqBody);

    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const review = {
        title,
        reviews,
      };

      user.reviews.push(review);
      await user.save();

      res.status(201).json(review);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
