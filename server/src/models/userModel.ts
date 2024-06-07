import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  reviews: IReviews[];
}

interface IReviews {
  title: string;
  reviews: { label: string; review: number }[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    reviews: [
      {
        label: { type: String, required: true },
        review: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;
