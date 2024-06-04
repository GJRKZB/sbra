import { Request, Response, Router } from "express";
import Review from "../models/reviewModel";

const router = Router();

router.post("/api/reviews", async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const { title, reviews } = reqBody;

    const updateReview = await Review.findOneAndUpdate(
      { title },
      { reviews },
      { new: true }
    );

    if (updateReview) {
      return res.status(200).json({
        message: "Review has been updated with success",
      });
    } else {
      const review = new Review({ title, reviews });

      await review.save();

      return res.status(201).json({
        message: "Review has been added with success",
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
