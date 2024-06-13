import mongoose from "mongoose";
import { reviewSchema, IReview } from "./reviewModel";

interface IUser {
  username: string;
  email: string;
  password: string;
  reviews: Array<{
    title: string;
    reviews: IReview[];
  }>;
}

const userReviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    reviews: [reviewSchema],
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reviews: [userReviewSchema],
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
