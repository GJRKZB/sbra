import Review from "@/app/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, reviews } = reqBody;

    const updateReview = await Review.findOneAndUpdate(
      { title },
      { reviews },
      { new: true }
    );

    if (updateReview) {
      return NextResponse.json({
        message: "Review has been updated with success",
        status: 200,
      });
    } else {
      const review = new Review({ title, reviews });

      await review.save();

      return NextResponse.json({
        message: "Review has been added with success",
        status: 201,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
