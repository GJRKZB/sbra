"use client";

import { useState, useEffect } from "react";
import { fetchRestaurantReviews } from "@/app/utils/api";

interface IClientRatingProps {
  slug: string;
}

const ClientRating: React.FC<IClientRatingProps> = ({ slug }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetchRestaurantReviews(slug);
        const totalAverage = response.restaurant[0]?.totalAverage;
        setRating(totalAverage);
      } catch (error) {
        console.error("Error fetching updated rating:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [slug]);

  if (isLoading) {
    return <p className="text-sm">Loading rating...</p>;
  }

  return <p className="text-sm">Average rating: {rating}</p>;
};

export default ClientRating;
