import { notFound } from "next/navigation";
import { fetchRestaurants } from "@/app/utils/api";
import RestaurantDetails from "@/app/components/restaurant/restaurantDetails";

async function getRestaurantBySlug(slug: string) {
  const { restaurants } = await fetchRestaurants();
  return restaurants.find((restaurant: any) => restaurant.slug === slug);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const initialRestaurant = await getRestaurantBySlug(params.slug);

  if (!initialRestaurant) {
    notFound();
  }

  return <RestaurantDetails initialRestaurant={initialRestaurant} />;
}
