import { notFound } from "next/navigation";
import restaurantsData from "@/app/data/restaurants.json";

interface IParams {
  params: { id: string };
}

interface IRestaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
}

export function generateStaticParams() {
  return restaurantsData.restaurants.map((restaurant) => ({
    id: restaurant.id.toString(),
  }));
}

async function getRestaurant(id: number): Promise<IRestaurant | undefined> {
  return restaurantsData.restaurants.find((restaurant) => restaurant.id === id);
}

const RestaurantPage = async ({ params }: IParams) => {
  const restaurantId = parseInt(params.id, 10);
  const restaurant = await getRestaurant(restaurantId);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <img src={restaurant.image} alt={restaurant.name} />
      <p>{restaurant.rating}</p>
    </div>
  );
};

export default RestaurantPage;
