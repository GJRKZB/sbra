import { Request, Response } from "express";
import { User, Review, Restaurant } from "../models";
import { CustomRequest } from "../types/types";

export const addReview = async (req: CustomRequest, res: Response) => {
  const { userId, restaurantId, reviews } = req.body;

  try {
    let review = await Review.findOne({
      user: userId,
      restaurant: restaurantId,
    });

    if (review) {
      review.reviews = reviews;
      await review.save();
    } else {
      review = new Review({
        user: userId,
        restaurant: restaurantId,
        reviews: reviews,
      });
    }

    const totalRating = review.reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );
    review.average = totalRating / review.reviews.length;

    await review.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { reviews: review._id } },
      { new: true }
    );

    const allRestaurantReviews = await Review.find({
      restaurant: restaurantId,
    });
    const restaurantTotalRating = allRestaurantReviews.reduce(
      (sum, review) => sum + (review.average || 0),
      0
    );
    const restaurantAverageRating =
      restaurantTotalRating / allRestaurantReviews.length;

    await Restaurant.findByIdAndUpdate(
      restaurantId,
      { totalAverage: restaurantAverageRating },
      { new: true }
    );

    await Review.find({
      user: userId,
      restaurant: restaurantId,
    });
    const userAverageRating = review.average;

    return res.status(201).json({
      message: "added review succesfully",
      review: review,
      userAverageRating: userAverageRating,
      restaurantAverageRating: restaurantAverageRating,
    });
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
