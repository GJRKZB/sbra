import { Request, Response, Router } from "express";
import { User } from "../models/index";
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
        return res.status(400).json({ message: `User not found` });
      }

      const updateReview = user.reviews.find((review: any) => {
        return review.title === title;
      });

      if (updateReview) {
        updateReview.reviews = reviews;
        updateReview.updatedAt = new Date();
        console.log(title, reviews);
        await user.save();
        return res.status(201).json({ message: "Review updated successfully" });
      } else {
        const review = {
          title,
          reviews: reviews.map((review: any) => ({
            id: review.id,
            label: review.label,
            average: review.average,
            review: review.review,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        };
        user.reviews.push(review);
        console.log(title, reviews);
        await user.save();
        return res.status(201).json({ message: "Review added successfully" });
      }
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
        return res.status(400).json({ message: `User not found` });
      }
      return res.status(200).json({ reviews: user.reviews });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/api/average-reviews", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const reviews = users.map((user: any) => user.reviews).flat();

    const reviewsByTitle: { [key: string]: any[] } = {};

    reviews.forEach((review: any) => {
      if (!reviewsByTitle[review.title]) {
        reviewsByTitle[review.title] = [];
      }
      reviewsByTitle[review.title].push(...review.reviews);
    });

    const averageReviews = Object.entries(reviewsByTitle).map(
      ([title, reviews]) => {
        const totalReview = reviews.reduce(
          (acc: number, curr: any) => acc + curr.review,
          0
        );
        const averageReview = parseFloat(
          (totalReview / reviews.length).toFixed(1)
        );
        return {
          title,
          averageReview,
        };
      }
    );

    res.status(200).json({ averageReviews });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
