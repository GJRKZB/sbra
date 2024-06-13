import mongoose from "mongoose";

interface IReview {
  id: number;
  label: string;
  review: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    label: { type: String, required: true },
    review: { type: Number, default: 0, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
  }
);

const Review =
  mongoose.models.reviews || mongoose.model<IReview>("reviews", reviewSchema);

export { Review, reviewSchema, IReview };
