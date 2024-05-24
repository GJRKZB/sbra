import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export const RestaurantCard: React.FC = () => {
  return (
    <div className="h-96">
      <Card isFooterBlurred className="h-full font-mono text-start">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h1 className="text-xl font-bold">Irure in anim eu cillum</h1>
          <p className="text-base font-normal">
            Tempor est nisi nostrud mollit adipisicing excepteur.
          </p>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="https://nextui.org/images/card-example-6.jpeg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-sm">Available soon.</p>
            <p className="text-sm">Get notified.</p>
          </div>
          <Button className="text-sm" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
