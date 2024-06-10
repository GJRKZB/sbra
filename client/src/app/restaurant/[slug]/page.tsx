import data from "@/app/data/restaurants.json";
import { notFound } from "next/navigation";
import { Image } from "@nextui-org/react";
import Reviews from "@/app/components/reviews/reviews";
import Average from "@/app/components/reviews/average";

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
          <Average title={restaurant.title} />
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
