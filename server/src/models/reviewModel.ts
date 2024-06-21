import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  restaurantId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  reviews: Array<{ label: string; rating: number }>;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reviews: [
      {
        label: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const Review = mongoose.model<IReview>("review", reviewSchema);

export default Review;
