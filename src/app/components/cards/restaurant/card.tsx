"use client";

import { Card, CardFooter, Image, Button } from "@nextui-org/react";

interface IRestaurantCardProps {
  title: string;
  description: string;
  image?: string;
  rating?: number;
}

export const RestaurantCard: React.FC<IRestaurantCardProps> = ({
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
          alt="Card example background"
          className="z-0 w-screen h-full scale-125 -translate-y-6 object-cover"
          src={image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-base font-normal">{description}</p>
            <p className="text-sm">{rating}</p>
          </div>
          <Button
            className="text-sm text-white bg-black"
            radius="full"
            size="lg"
            onClick={() => console.log("Give review")}
          >
            Give review
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
