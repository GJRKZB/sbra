import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

interface RestaurantCardProps {
  restaurantTitle: string;
  location: string;
  image: string;
  slug: string;
  totalAverage: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurantTitle,
  location,
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
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 flex">
          <div className="w-1/2 break-words">
            <h1 className="text-xl font-bold">{restaurantTitle}</h1>
            <p className="text-base font-normal">{location}</p>
            <p className="text-base font-normal">
              Rating: {totalAverage.toFixed(1) || 0}
            </p>
          </div>
          <div className="w-1/2">
            <Link href={`/restaurant/${slug}`} className="justify-end flex">
              <Button
                className="text-sm text-white bg-black"
                radius="full"
                size="lg"
              >
                Bekijk restaurant
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantCard;
