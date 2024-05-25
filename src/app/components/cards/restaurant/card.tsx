"use client";

import { Card, CardFooter, Image } from "@nextui-org/react";
import RestaurantButton from "@/app/components/buttons/restaurant/restaurant";

interface RestaurantCardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  rating?: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  title,
  description,
  image,
  rating,
}) => {
  return (
    <div className="h-96">
      <Card className="h-full font-mono text-start" isFooterBlurred>
        <Image
          removeWrapper
          alt={title}
          className="z-0 w-screen h-full scale-125 -translate-y-6 object-cover"
          src={image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-base font-normal">{description}</p>
            <p className="text-sm">{rating}</p>
          </div>
          <RestaurantButton id={id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantCard;
