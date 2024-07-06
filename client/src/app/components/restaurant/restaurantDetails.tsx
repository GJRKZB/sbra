"use client";

import { Image, Slider, Button, Spinner } from "@nextui-org/react";
import {
  fetchUserRestaurantReviews,
  addUserRestaurantReviews,
  fetchRestaurants,
} from "@/app/utils/api";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";

interface RestaurantDetailsProps {
  initialRestaurant: {
    restaurantTitle: string;
    description: string;
    image: string;
    totalAverage: number;
    slug: string;
    _id: string;
  };
}

export default function RestaurantDetails({
  initialRestaurant: initialRestaurant,
}: RestaurantDetailsProps) {
  const { isAuthenticated, user } = useAuth();
  const [loadingSubmisson, setLoadingSubmission] = useState(false);
  const [loadingContent, isLoadingContent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<any | null>(null);
  const [userAverageRating, setUserAverageRating] = useState<number | null>(
    null
  );
  const [restaurant, setRestaurant] = useState(initialRestaurant);

  const fetchUserReviews = async () => {
    if (!isAuthenticated) {
      isLoadingContent(false);
      return;
    }
    try {
      isLoadingContent(true);
      const response = await fetchUserRestaurantReviews(restaurant.slug);
      if (response) {
        setUserReviews(response);
        setUserAverageRating(response?.average || null);
      }
    } catch (error) {
      console.error("Failed to fetch user reviews", error);
      setError("Failed to fetch reviews. Please try again later.");
    } finally {
      isLoadingContent(false);
    }
  };

  const fetchRestaurantData = async () => {
    try {
      const { restaurants } = await fetchRestaurants();
      const updatedRestaurant = restaurants.find(
        (r: any) => r.slug === restaurant.slug
      );
      if (updatedRestaurant) {
        setRestaurant(updatedRestaurant);
      }
    } catch (error) {
      console.error("Failed to fetch restaurant data", error);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, [isAuthenticated, restaurant.slug]);

  const handleChange = (reviewIndex: number) => (value: number) => {
    setUserReviews((prevReview: any) => {
      if (!prevReview) return null;
      const newReviews = [...prevReview.reviews];
      newReviews[reviewIndex].rating = value;

      const newAverage =
        newReviews.reduce((sum, review) => sum + review.rating, 0) /
        newReviews.length;

      setUserAverageRating(newAverage);

      return {
        ...prevReview,
        reviews: newReviews,
        average: newAverage,
      };
    });
  };

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      setError("You must be logged in to submit a review.");
      return;
    }

    try {
      setLoadingSubmission(true);
      const reviewsToSubmit = userReviews.reviews.map(
        ({ label, rating }: { label: string; rating: number }) => ({
          label,
          rating,
        })
      );
      const response = await addUserRestaurantReviews(
        user._id,
        restaurant._id,
        reviewsToSubmit
      );
      setUserReviews(response);
      setUserAverageRating(response.average);
      setError(null);
      await fetchRestaurantData();
    } catch (error) {
      console.error("Failed to submit review", error);
      setError("Failed to submit review. Please try again later.");
    } finally {
      setLoadingSubmission(false);
      fetchUserReviews();
    }
  };

  if (loadingContent) {
    return (
      <div className="flex justify-center">
        <Spinner
          label="Restaurant laden..."
          color="default"
          labelColor="foreground"
        />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <main className="h-full w-screen px-5 py-10 flex flex-col items-center">
      <article className="flex flex-col gap-10 max-w-2xl">
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
            <p className="font-bold text-base text-black">Gemiddelde rating</p>
            <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
              <p className="font-bold text-base text-white">
                {restaurant.totalAverage?.toFixed(1)}
              </p>
            </div>
          </div>
          {isAuthenticated && (
            <>
              <div className="flex flex-col items-center gap-5 font-bold">
                <p>Jouw rating:</p>
                <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
                  <p className="font-bold text-base text-white">
                    {userAverageRating?.toFixed(1) || 0}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                {userReviews &&
                  userReviews.reviews?.map(
                    (
                      rating: { _id: string; label: string; rating: number },
                      index: number
                    ) => (
                      <div
                        key={rating._id}
                        className="w-full flex flex-col items-center gap-2"
                      >
                        <Slider
                          size="md"
                          step={0.5}
                          color="foreground"
                          label={rating.label}
                          showSteps={true}
                          maxValue={5}
                          minValue={0}
                          value={rating.rating}
                          className="max-w-md"
                          onChange={(value) =>
                            handleChange(index)(value as number)
                          }
                        />
                      </div>
                    )
                  )}
              </div>
              <Button
                className="text-normal text-white bg-black p-8"
                radius="full"
                onClick={handleSubmit}
                disabled={loadingSubmisson || !isAuthenticated}
                isLoading={loadingSubmisson}
                spinner={<Spinner color="default" labelColor="foreground" />}
              >
                {loadingSubmisson
                  ? "Bezig met toevoegen..."
                  : "Beoordeling toevoegen"}
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </>
          )}
        </section>
      </article>
    </main>
  );
}
