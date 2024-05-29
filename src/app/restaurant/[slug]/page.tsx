import data from "@/app/data/restaurants.json";
import { notFound } from "next/navigation";
import { Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { ReviewSliders } from "@/app/components/reviews/reviewSlider";

interface IRestaurant {
  title: string;
  description: string;
  image: string;
  totalRating: number;
  factors: { id: number; label: string; rating: number }[];
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
          <div className="flex flex-col gap-2">
            <p className="font-bold text-base text-black">Rating:</p>
            <div className="bg-black p-5 rounded-full">
              <p className="font-bold text-base text-white">
                {restaurant.totalRating}
              </p>
            </div>
          </div>
          <p className="font-normal text-base">
            Ullamco exercitation culpa magna fugiat nostrud deserunt. Magna
            reprehenderit anim esse anim laborum id magna enim consequat nisi
            voluptate aute. Duis ex sunt fugiat consequat adipisicing anim
            adipisicing eu esse.
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-base text-black">Your rating</p>
            <div className="bg-black p-5 rounded-full">
              <p className="font-bold text-base text-white">0</p>
            </div>
          </div>
          <ReviewSliders
            factors={restaurant.factors}
            title={restaurant.title}
          />
          <Link href="/">
            <Button
              className="text-sm text-white bg-black"
              radius="full"
              size="lg"
            >
              Go back
            </Button>
          </Link>
        </section>
      </article>
    </main>
  );
};

export default Page;
