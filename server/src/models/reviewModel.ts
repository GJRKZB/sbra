import mongoose, { Schema, Document, Model } from "mongoose";

interface IReviewItem {
  label: string;
  rating: number;
}

interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  reviews: IReviewItem[];
}

const reviewItemSchema = new Schema({
  label: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
});

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    reviews: [reviewItemSchema],
  },
  { timestamps: true }
);

reviewSchema.post<IReview>("save", async function (doc) {
  const restaurant = await mongoose
    .model("Restaurant")
    .findById(doc.restaurant);
  if (restaurant) {
    const reviews = await mongoose.model<IReview>("Review").find({
      restaurant: restaurant._id,
    });
    const totalRating = reviews.reduce(
      (acc, review) =>
        acc +
        review.reviews.reduce((sum, item) => sum + item.rating, 0) /
          review.reviews.length,
      0
    );
    const averageRating = totalRating / reviews.length;
    restaurant.averageRating = averageRating;
    await restaurant.save();
  }
});

const Review: Model<IReview> = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
