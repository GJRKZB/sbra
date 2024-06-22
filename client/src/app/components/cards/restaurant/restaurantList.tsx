import { fetchRestaurants } from "@/app/utils/api";
import RestaurantCard from "./restaurantCard";

interface IRestaurant {
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  averageRating: number;
}

async function getRestaurants() {
  const res = await fetchRestaurants();
  return res.restaurants;
}

export default async function Restaurants() {
  const restaurants = await getRestaurants();

  return (
    <div className="flex flex-col gap-10">
      {restaurants.map((restaurant: IRestaurant) => (
        <RestaurantCard
          key={restaurant.slug}
          restaurantTitle={restaurant.restaurantTitle}
          description={restaurant.description}
          image={restaurant.image}
          slug={restaurant.slug}
          averageRating={restaurant.averageRating}
        />
      ))}
    </div>
  );
}
