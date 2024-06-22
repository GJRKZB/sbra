import mongoose, { Schema, Document } from "mongoose";

interface IRestaurant extends Document {
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  averageRating: number;
}

const restaurantSchema = new Schema(
  {
    restaurantTitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    averageRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "restaurant",
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
