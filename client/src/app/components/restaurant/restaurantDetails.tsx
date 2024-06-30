"use client";

import { Image, Slider, Button } from "@nextui-org/react";
import {
  fetchUserRestaurantReviews,
  addUserRestaurantReviews,
} from "@/app/utils/api";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";

interface RestaurantDetailsProps {
  restaurant: {
    restaurantTitle: string;
    description: string;
    image: string;
    totalAverage: number;
    slug: string;
    _id: string;
  };
}

interface Review {
  _id: string;
  label: string;
  rating: number;
}

interface UserReview {
  _id: string;
  reviews: Review[];
  average: number;
}

export default function RestaurantDetails({
  restaurant,
}: RestaurantDetailsProps) {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [userAverageRating, setUserAverageRating] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchUserReviews() {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetchUserRestaurantReviews(restaurant.slug);
        if (response) {
          setUserReviews(response);
          setUserAverageRating(response[0]?.average || null);
        }
      } catch (error) {
        console.error("Failed to fetch user reviews", error);
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserReviews();
  }, [isAuthenticated, user, restaurant.slug]);

  const handleChange =
    (userReviewIndex: number, ratingIndex: number) => (value: number) => {
      setUserReviews((prevReviews) => {
        const newReviews = [...prevReviews];
        newReviews[userReviewIndex].reviews[ratingIndex].rating = value;

        const newAverage =
          newReviews[userReviewIndex].reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / newReviews[userReviewIndex].reviews.length;
        newReviews[userReviewIndex].average = newAverage;

        setUserAverageRating(newAverage);
        return newReviews;
      });
    };

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      setError("You must be logged in to submit a review.");
      return;
    }

    try {
      setLoading(true);
      const reviewsToSubmit = userReviews[0].reviews.map(
        ({ label, rating }) => ({ label, rating })
      );
      const response = await addUserRestaurantReviews(
        user._id,
        restaurant._id,
        reviewsToSubmit
      );
      setUserAverageRating(response.userAverageRating);
      setError(null);
    } catch (error) {
      console.error("Failed to submit review", error);
      setError("Failed to submit review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="h-full w-screen px-5 pt-10">
      <article className="flex justify-center flex-col items-center gap-10 w-full">
        <section className="font-mono text-center flex flex-col gap-10 w-full items-center">
          <h1 className="font-bold text-2xl">{restaurant.restaurantTitle}</h1>
          <p className="font-normal text-base">{restaurant.description}</p>
          <Image
            removeWrapper
            src={restaurant.image}
            alt={restaurant.restaurantTitle}
            className="object-cover w-screen h-96"
          />
          <div className="flex flex-col gap-2 items-center">
            <p className="font-bold text-base text-black">Rating:</p>
            <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
              <p className="font-bold text-base text-white">
                {restaurant.totalAverage.toFixed(1)}
              </p>
            </div>
            {userAverageRating !== null && (
              <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
                <p className="font-bold text-base text-white">
                  {userAverageRating.toFixed(1)}
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            {userReviews.map((userReview, userReviewIndex) =>
              userReview.reviews.map((rating, ratingIndex) => (
                <div
                  key={rating._id}
                  className="w-full flex flex-col items-center gap-2"
                >
                  <Slider
                    size="lg"
                    step={0.5}
                    color="foreground"
                    label={rating.label}
                    showSteps={true}
                    maxValue={5}
                    minValue={0}
                    value={rating.rating}
                    className="max-w-md"
                    onChange={(value) =>
                      handleChange(
                        userReviewIndex,
                        ratingIndex
                      )(value as number)
                    }
                  />
                </div>
              ))
            )}
          </div>
          <Button
            className="text-normal text-white bg-black p-8"
            radius="full"
            onClick={handleSubmit}
            disabled={loading || !isAuthenticated}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </section>
      </article>
    </main>
  );
}
