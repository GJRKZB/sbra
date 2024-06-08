"use client";

import { useState, useEffect } from "react";
import { Button, Slider } from "@nextui-org/react";
import axios from "axios";
import { useAuth } from "@/app/hooks/useAuth";

interface ReviewSliderProps {
  title: string;
  reviews: { id: number; label: string; review: number }[];
}

const Reviews: React.FC<ReviewSliderProps> = ({ title, reviews }) => {
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState<string>("");
  const [values, setValues] = useState<number[]>(() => {
    return reviews.map((review) => review.review);
  });

  const userAverage = (
    values.reduce((acc, val) => acc + val, 0) / values.length
  ).toFixed(1);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User authenticated.");
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const userReview = response.data.reviews.find(
            (review: any) => review.title === title
          );
          if (userReview) {
            setValues(userReview.reviews.map((review: any) => review.review));
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchReviews();
    }
  }, [isAuthenticated, title]);

  const handleChange = (index: number) => (value: number) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    console.log(
      `Restaurant: ${title}, Factor ${reviews[index].label} rating: ${value}`
    );
  };

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews`,
        {
          title,
          reviews: reviews.map((review, index) => ({
            label: review.label,
            review: values[index],
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setMessage("Review submitted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while submitting the review.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="w-full flex justify-center flex-col text-mono items-center gap-2">
        <div className="w-full flex justify-center flex-col gap-2 items-center">
          {isAuthenticated && (
            <>
              <p className="font-bold text-base text-black">Your rating:</p>
              <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
                <p className="font-bold text-base text-white">{userAverage}</p>
              </div>
            </>
          )}
        </div>
        {isAuthenticated && (
          <>
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="w-full flex flex-col items-center gap-2"
              >
                <Slider
                  size="lg"
                  step={0.5}
                  color="foreground"
                  label={review.label}
                  showSteps={true}
                  maxValue={5}
                  minValue={0}
                  value={values[index] || 0.0}
                  className="max-w-md"
                  onChange={(value) => handleChange(index)(value as number)}
                />
              </div>
            ))}
            <p className="text-base text-black">{message}</p>
            <Button
              className="text-normal text-white bg-black p-8"
              radius="full"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </>
        )}
      </div>
      {!isAuthenticated && <p>You need to be logged in to submit a review.</p>}
    </div>
  );
};

export default Reviews;
