import { Button } from "@nextui-org/react";
import Link from "next/link";

const RestaurantButton: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <Link href={`/restaurant/${slug}`}>
      <Button className="text-sm text-white bg-black" radius="full" size="lg">
        Go to restaurant
      </Button>
    </Link>
  );
};

export default RestaurantButton;
