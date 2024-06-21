import { Request, Response, Router } from "express";
import { User, Restaurant, Review } from "../models/index";
import { CustomRequest } from "../types/types";
import authMiddleware from "../middleware/authMiddleware";
import mongoose from "mongoose";

const router = Router();

router.post(
  "/api/restaurant/:id/review",
  authMiddleware,
  async (req: CustomRequest, res: Response) => {
    const { reviews } = req.body;
    const restaurantId = new mongoose.Types.ObjectId(req.params.id);

    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res.status(400).json({ message: `User not found` });
      }

      const existingReview = await Review.findOne({
        restaurantId,
        userId: req.user?._id,
      });
      if (existingReview) {
        existingReview.reviews = reviews;
        existingReview.updatedAt = new Date();
        await existingReview.save();

        const updateReviews = await Review.find({ restaurantId });
        const averageRating =
          updateReviews.reduce((acc, review) => {
            const reviewRating =
              review.reviews.reduce((acc, review) => acc + review.rating, 0) /
              review.reviews.length;
            return acc + reviewRating;
          }, 0) / updateReviews.length;

        await Restaurant.findByIdAndUpdate(restaurantId, { averageRating });

        return res.status(201).json({ message: "Review updated successfully" });
      }

      const newReview = new Review({
        restaurantId,
        userId: req.user?._id,
        reviews,
      });
      await newReview.save();

      const updateReviews = await Review.find({ restaurantId });
      const averageRating =
        updateReviews.reduce((acc, review) => {
          const reviewRating =
            review.reviews.reduce(
              (acc: any, review: any) => acc + review.rating,
              0
            ) / review.reviews.length;
          return acc + reviewRating;
        }, 0) / updateReviews.length;

      await Restaurant.findByIdAndUpdate(restaurantId, { averageRating });

      return res.status(201).json(newReview);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "An error occurred.",
      });
    }
  }
);

// router.post(
//   "/api/review",
//   authMiddleware,
//   async (req: CustomRequest, res: Response) => {
//     const { restaurantTitle, reviews } = req.body;
//     try {
//       const user = await User.findById(req.user?._id);
//       if (!user) {
//         return res.status(400).json({ message: `User not found` });
//       }

//       const updateReview = user.restaurantReviews.find((restaurant: any) => {
//         return restaurant.restaurantTitle === restaurantTitle;
//       });

//       if (updateReview) {
//         updateReview.reviews = reviews;
//         updateReview.updatedAt = new Date();
//         console.log(restaurantTitle, reviews);
//         await user.save();
//         return res.status(201).json({ message: "Review updated successfully" });
//       } else {
//         const review = {
//           restaurantTitle,
//           reviews: reviews.map((rating: any) => ({
//             id: rating.id,
//             label: rating.label,
//             rating: rating,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           })),
//         };
//         user.restaurantReviews.push(review);
//         console.log(restaurantTitle, reviews);
//         await user.save();
//         return res.status(201).json({ message: "Review added successfully" });
//       }
//     } catch (error: any) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// );

// router.get(
//   "/api/review",
//   authMiddleware,
//   async (req: CustomRequest, res: Response) => {
//     try {
//       const user = await User.findById(req.user?._id);
//       if (!user) {
//         return res.status(400).json({ message: `User not found` });
//       }
//       return res
//         .status(200)
//         .json({ restaurantReviews: user.restaurantReviews });
//     } catch (error: any) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
// );

// router.get("/api/average-reviews", async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     const restaurants = await Restaurant.find();

//     const averageRestaurantReviews = users
//       .flatMap((user) => {
//         return user.restaurantReviews.map((data: any) => {
//           const totalRating = data.reviews.reduce(
//             (acc: number, rating: any) => {
//               return acc + rating.rating;
//             },
//             0
//           );
//           const average = totalRating / data.reviews.length;

//           return {
//             restaurantTitle: data.restaurantTitle,
//             averageRating: parseFloat(average.toFixed(2)),
//           };
//         });
//       })
//       .sort((a, b) => b.averageRating - a.averageRating);

//     const restaurantReviewsWithDetails = averageRestaurantReviews.map(
//       (review) => {
//         const restaurantDetails = restaurants.find(
//           (restaurant) => restaurant.restaurantTitle === review.restaurantTitle
//         );

//         if (restaurantDetails) {
//           return {
//             restaurantTitle: restaurantDetails.restaurantTitle,
//             description: restaurantDetails.description,
//             image: restaurantDetails.image,
//             slug: restaurantDetails.slug,
//             ...review,
//           };
//         }
//         return review;
//       }
//     );

//     console.log(restaurantReviewsWithDetails);
//     return res.status(200).json(restaurantReviewsWithDetails);
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// });

export default router;
