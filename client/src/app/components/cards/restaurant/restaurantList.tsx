"use client";

import { useEffect, useState } from "react";
import { fetchRestaurants } from "@/app/utils/api";
import RestaurantCard from "./restaurantCard";
import { Spinner } from "@nextui-org/react";

interface IRestaurant {
  _id: string;
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  totalAverage: number;
}

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchAndSetRestaurants() {
    setIsLoading(true);
    try {
      const fetchedData = await fetchRestaurants();
      if (fetchedData && Array.isArray(fetchedData.restaurants)) {
        setRestaurants(fetchedData.restaurants);
      } else {
        console.error("Unexpected data structure:", fetchedData);
        setError("Unexpected data structure from fetch.");
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError("Error fetching restaurants.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAndSetRestaurants();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Spinner
          label="Loading Restaurants"
          color="default"
          labelColor="foreground"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} {...restaurant} />
        ))
      ) : (
        <div>No restaurants found....</div>
      )}
    </div>
  );
}
