import { Request, Response, Router } from "express";
import User from "../models/userModel";
import { CustomRequest } from "../types/types";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/api/reviews",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { title, reviews } = req.body;

    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with ID ${req.user?._id} not found` });
      }

      const updateReview = user.reviews.find(
        (review: any) => review.title === title
      );

      if (updateReview) {
        updateReview.reviews = reviews;
        updateReview.updatedAt = new Date();
        res.status(200).json({ message: "Review updated successfully!" });
      } else {
        const review = {
          title,
          reviews,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        user.reviews.push(review);
        res.status(201).json({ message: "Review submitted successfully!" });
      }

      await user.save();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/api/reviews",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with ID ${req.user?._id} not found` });
      }
      return res.status(200).json({ reviews: user.reviews });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
