"use client";

import React, { useState, useEffect } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import ViewRestaurantBtn from "../../buttons/restaurant/viewRestaurantBtn";
import axios from "axios";

interface RestaurantCardProps {
  title: string;
  description: string;
  image?: string;
  slug: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  title,
  description,
  image,
  slug,
}) => {
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
    <div className="h-96">
      <Card className="h-full font-mono text-start" isFooterBlurred>
        <Image
          removeWrapper
          alt={title}
          className="z-0 w-screen h-full scale-125 -translate-y-6 object-cover"
          src={image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-base font-normal">{description}</p>
            <p className="text-sm">
              {average !== null ? average.toFixed(1) : 0}
            </p>
          </div>
          <ViewRestaurantBtn slug={slug} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantCard;
