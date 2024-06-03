import data from "@/app/data/restaurants.json";
import { notFound } from "next/navigation";
import { Image, Button } from "@nextui-org/react";
import Link from "next/link";
import Reviews from "@/app/components/reviews/reviews";

interface IRestaurant {
  title: string;
  description: string;
  image: string;
  totalReview: number;
  reviews: { id: number; label: string; review: number }[];
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
    <main className="h-full w-screen px-5 pt-10">
      <article className="flex justify-center flex-col items-center gap-10 w-full">
        <section className="font-mono text-center flex flex-col gap-10 w-full items-center">
          <h1 className="font-bold text-2xl">{restaurant.title}</h1>
          <p className="font-normal text-base">{restaurant.description}</p>
          <Image
            removeWrapper
            src={restaurant.image}
            alt={restaurant.title}
            className="object-cover w-screen h-96"
          />
          <div className="flex flex-col gap-2 items-center">
            <p className="font-bold text-base text-black">Rating:</p>
            <div className="bg-black rounded-full w-20 h-20 items-center flex justify-center">
              <p className="font-bold text-base text-white">0</p>
            </div>
          </div>
          <p className="font-normal text-base">
            Ullamco exercitation culpa magna fugiat nostrud deserunt. Magna
            reprehenderit anim esse anim laborum id magna enim consequat nisi
            voluptate aute. Duis ex sunt fugiat consequat adipisicing anim
            adipisicing eu esse.
          </p>
          <Reviews reviews={restaurant.reviews} title={restaurant.title} />
        </section>
      </article>
    </main>
  );
};

export default Page;