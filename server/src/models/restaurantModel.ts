import mongoose from "mongoose";
import { reviewSchema, IReview } from "./reviewModel";

interface IRestaurant {
  title: string;
  description: string;
  image: string;
  slug: string;
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Restaurant =
  mongoose.models.restaurants ||
  mongoose.model<IRestaurant>("restaurants", restaurantSchema);

export default Restaurant;
