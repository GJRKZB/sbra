import { fetchRestaurants } from "@/app/utils/api";
import RestaurantCard from "./restaurantCard";

interface IRestaurant {
  _id: string;
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  totalAverage: number;
}

async function getRestaurants() {
  const res = await fetchRestaurants();
  return res.restaurants;
}

export default async function Restaurants() {
  const restaurants = await getRestaurants();

  return (
    <div className="flex flex-col gap-10">
      {restaurants ? (
        restaurants.map((restaurant: IRestaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurantTitle={restaurant.restaurantTitle}
            description={restaurant.description}
            image={restaurant.image}
            slug={restaurant.slug}
            totalAverage={restaurant.totalAverage}
          />
        ))
      ) : (
        <div>No restaurants found....</div>
      )}
    </div>
  );
}
