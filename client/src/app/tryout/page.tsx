"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface IRestaurant {
  _id: string;
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  averageRating: number;
}

const Page = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurants`
        );
        setRestaurant(response.data.restaurant);
      } catch (error) {
        console.error("Failed to fetch restaurant", error);
      }
    }

    fetchRestaurant();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Restaurant</h1>
      {restaurant ? (
        <div>
          <h2 className="text-2xl font-bold">{restaurant.restaurantTitle}</h2>
          <p>{restaurant.description}</p>
          <img
            src={restaurant.image}
            alt={restaurant.restaurantTitle}
            className="w-64 h-64"
          />
          <p>Rating: {restaurant.averageRating}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
