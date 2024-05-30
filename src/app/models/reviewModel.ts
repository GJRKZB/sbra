import mongoose from "mongoose";

interface IRestaurant {
  title: string;
  reviews: { [key: string]: number };
}

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reviews: { type: Object, required: true },
});

export default mongoose.models.reviews ||
  mongoose.model<IRestaurant>("reviews", reviewSchema);
