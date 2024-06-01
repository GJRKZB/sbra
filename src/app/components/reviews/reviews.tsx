"use client";

import { useState, useEffect } from "react";
import { Button, Slider } from "@nextui-org/react";
import axios from "axios";

interface ReviewSliderProps {
  title: string;
  reviews: { id: number; label: string; review: number }[];
}

const Reviews: React.FC<ReviewSliderProps> = ({ title, reviews }) => {
  const [message, setMessage] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<string>("");
  const [values, setValues] = useState<number[]>(() => {
    return reviews.map((review) => review.review);
  });

  const average = (
    values.reduce((acc, val) => acc + val, 0) / values.length
  ).toFixed(1);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get(`/api/reviews?title=${title}`);
  //       const { reviews } = response.data;
  //       setValues(reviews.map((review: any) => review.review));
  //     } catch (error) {
  //       console.error(error, "No reviews to be found");
  //     }
  //   };
  //   fetchReviews();
  // }, []);

  const handleChange = (index: number) => async (value: number) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    console.log(
      `Restaurant: ${title}, Factor ${reviews[index].label} rating: ${value}`
    );
  };

  // const handleSubmit = async () => {
  //   console.log(values);
  //   try {
  //     const response = await axios.post("/api/reviews", {
  //       title,
  //       reviews: reviews.map((review, index) => ({
  //         label: review.label,
  //         review: values[index],
  //       })),
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reviews");
        const data = response.data;
        setFetchedData(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/reviews");
      const data = response.data;
      setMessage(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="w-full flex justify-center flex-col gap-2 items-center">
        <p className="font-bold text-base text-black">Your rating:</p>
        <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
          <p className="font-bold text-base text-white">{average}</p>
        </div>
      </div>
      <div className="w-full flex justify-center flex-col text-mono items-center gap-2">
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
      </div>
      <p className="text-base text-black">{fetchedData}</p>
      <p className="text-base text-black">{message}</p>
      <Button
        className="text-normal text-white bg-black p-8"
        radius="full"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Reviews;
