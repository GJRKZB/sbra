"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface AverageProps {
  title: string;
}

const Average: React.FC<AverageProps> = ({ title }) => {
  const [average, setAverage] = useState<number | null>(0);

  useEffect(() => {
    const fetchAverageReview = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/average-reviews`
        );
        const avgReview = response.data.averageReviews.find(
          (avg: any) => avg.title === title
        );
        if (avgReview) {
          setAverage(avgReview.averageReview);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAverageReview();
  }, [title]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="font-bold text-base text-black">Rating:</p>
      <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
        <p className="font-bold text-base text-white">
          {average !== null ? average.toFixed(1) : 0}
        </p>
      </div>
    </div>
  );
};

export default Average;
