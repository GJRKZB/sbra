import { Request, Response } from "express";
import { Review } from "../models";
import { User } from "../models";

export const addReview = async (req: Request, res: Response) => {
  const { userId, restaurantId, reviews } = req.body;
  try {
    const existingRestaurant = await Review.findOne({
      user: userId,
      restaurant: restaurantId,
    });
    if (existingRestaurant) {
      existingRestaurant.reviews = reviews;
      await existingRestaurant.save();
      return res.status(201).json({ message: "Review updated successfully." });
    }

    const newReview = new Review({
      user: userId,
      restaurant: restaurantId,
      reviews: reviews,
    });
    await newReview.save();
    await User.findByIdAndUpdate(userId, { $push: { reviews: newReview._id } });
    return res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};

export const restaurantReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({
      restaurant: req.params.id,
    }).populate("user", "username");
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred.",
    });
  }
};
