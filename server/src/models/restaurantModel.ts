import mongoose from "mongoose";

interface IRestaurant {
  restaurantTitle: string;
  location: string;
  description: string;
  image: string;
  slug: string;
  totalAverage: number;
  reviews: number[];
}

const defaultReviewSchema = new mongoose.Schema({
  label: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

const restaurantSchema = new mongoose.Schema(
  {
    restaurantTitle: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    totalAverage: { type: Number, default: 0 },
    reviews: [defaultReviewSchema],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
