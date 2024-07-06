import mongoose from "mongoose";

interface IRating {
  label: string;
  rating: number;
}

interface IReviewItems {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  reviews: IRating[];
  average: number;
}

const reviewItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
});

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    reviews: [reviewItemSchema],
    average: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReviewItems>("Review", reviewSchema);

export default Review;
