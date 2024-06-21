import mongoose, { Schema, Document } from "mongoose";

interface IRestaurant extends Document {
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  averageRating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    restaurantTitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true },
    averageRating: { type: Number, min: 0, max: 5 },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model<IRestaurant>("restaurant", restaurantSchema);

export default Restaurant;
