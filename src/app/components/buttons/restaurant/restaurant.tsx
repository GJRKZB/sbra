"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

interface RestaurantButtonProps {
  id: number;
}

const RestaurantButton: React.FC<RestaurantButtonProps> = ({ id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/restaurant/${id}`);
  };

  return (
    <Button
      className="text-sm text-white bg-black"
      radius="full"
      size="lg"
      onClick={handleClick}
    >
      Go to restaurant
    </Button>
  );
};

export default RestaurantButton;
