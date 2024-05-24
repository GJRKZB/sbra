import { restaurants } from "@/app/data/restaurants";
import { RestaurantCard } from "@/app/components/cards/restaurant/card";

export const Restaurants = () => {
  return (
    <div className="flex flex-col gap-10">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          title={restaurant.name}
          description={restaurant.description}
          image={restaurant.image}
          rating={restaurant.rating}
        />
      ))}
    </div>
  );
};
