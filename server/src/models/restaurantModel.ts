import mongoose from "mongoose";

interface IRestaurant {
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  totalAverage: number;
}

const restaurantSchema = new mongoose.Schema(
  {
    restaurantTitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    totalAverage: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
