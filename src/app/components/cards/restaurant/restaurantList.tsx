import data from "@/app/data/restaurants.json";
import RestaurantCard from "@/app/components/cards/restaurant/restaurantCard";

const Restaurants: React.FC = () => {
  return (
    <div className="flex flex-col gap-10">
      {data.restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          title={restaurant.title}
          description={restaurant.description}
          image={restaurant.image}
          rating={restaurant.rating}
          slug={restaurant.slug}
        />
      ))}
    </div>
  );
};

export default Restaurants;
