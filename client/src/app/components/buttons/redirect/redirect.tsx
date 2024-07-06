import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

interface IRedirectProps {
  children: React.ReactNode;
  url: string;
}

const Redirect: React.FC<IRedirectProps> = ({ children, url }) => {
  const router = useRouter();
  return (
    <Button
      color="default"
      variant="ghost"
      size="lg"
      onClick={() => {
        router.push(`http://localhost:3000${url}`);
      }}
    >
      {children}
    </Button>
  );
};

export default Redirect;
