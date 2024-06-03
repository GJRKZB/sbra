import mongoose from "mongoose";

interface IRestaurant {
  title: string;
  reviews: { [key: string]: number };
}

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reviews: [
    {
      label: { type: String, required: true },
      review: { type: Number, required: true },
      _id: false,
    },
  ],
});

export default mongoose.models.reviews ||
  mongoose.model<IRestaurant>("reviews", reviewSchema);
