import { notFound } from "next/navigation";
import { fetchRestaurants } from "@/app/utils/api";
import RestaurantDetails from "@/app/components/restaurant/restaurantDetails";

export async function generateStaticParams() {
  const { restaurants } = await fetchRestaurants();
  return restaurants.map((restaurant: any) => ({
    slug: restaurant.slug,
  }));
}

async function getRestaurantBySlug(slug: string) {
  const { restaurants } = await fetchRestaurants();
  return restaurants.find((restaurant: any) => restaurant.slug === slug);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const restaurant = await getRestaurantBySlug(params.slug);

  if (!restaurant) {
    notFound();
  }

  return <RestaurantDetails restaurant={restaurant} />;
}
