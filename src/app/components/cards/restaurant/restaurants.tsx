import data from "@/app/data/restaurants.json";
import RestaurantCard from "@/app/components/cards/restaurant/card";

const Restaurants: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      {data.restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          title={restaurant.name}
          description={restaurant.description}
          image={restaurant.image}
          rating={restaurant.rating}
        />
      ))}
    </div>
  );
};

export default Restaurants;
