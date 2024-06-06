import mongoose from "mongoose";

interface IRestaurant {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  reviews: { [key: string]: number };
}

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
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
