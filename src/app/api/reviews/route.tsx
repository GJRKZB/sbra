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

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const review = await Review.findOne({ title });

  try {
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(review, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
