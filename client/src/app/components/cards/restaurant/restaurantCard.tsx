import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

interface RestaurantCardProps {
  restaurantTitle: string;
  description: string;
  image: string;
  slug: string;
  totalAverage: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurantTitle,
  description,
  image,
  slug,
  totalAverage,
}) => {
  return (
    <div className="h-96">
      <Card className="h-full font-mono text-start" isFooterBlurred>
        <Image
          removeWrapper
          alt={restaurantTitle}
          className="z-0 w-screen h-full scale-125 -translate-y-6 object-cover"
          src={image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <h1 className="text-xl font-bold">{restaurantTitle}</h1>
            <p className="text-base font-normal">{description}</p>
            <p className="text-sm">Average rating: {totalAverage.toFixed(1)}</p>
          </div>
          <Link href={`/restaurant/${slug}`}>
            <Button
              className="text-sm text-white bg-black"
              radius="full"
              size="lg"
            >
              Go to restaurant
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantCard;
