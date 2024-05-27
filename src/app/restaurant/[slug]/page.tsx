import data from "@/app/data/restaurants.json";
import { notFound } from "next/navigation";
import { Image, Button } from "@nextui-org/react";
import Link from "next/link";

interface IRestaurant {
  title: string;
  description: string;
  image: string;
  rating: number;
  slug: string;
}

interface IParams {
  params: { slug: string };
}
export async function generateStaticParams() {
  const paths = data.restaurants.map((restaurant) => ({
    slug: restaurant.slug,
  }));
  return paths;
}

async function getRestaurant(slug: string): Promise<IRestaurant | undefined> {
  return data.restaurants.find((restaurant) => restaurant.slug === slug);
}

const Page = async ({ params }: IParams) => {
  const { slug } = params;
  const restaurant = await getRestaurant(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <h1>{restaurant.title}</h1>
      <p>{restaurant.description}</p>
      <Image
        src={restaurant.image}
        alt={restaurant.title}
        width={500}
        height={500}
      />
      <p>{restaurant.rating}</p>

      <Link href="/">
        <Button className="text-sm text-white bg-black" radius="full" size="lg">
          Go back
        </Button>
      </Link>
    </div>
  );
};

export default Page;
