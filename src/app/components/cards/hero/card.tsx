import { Image, Card } from "@nextui-org/react";

interface HeroImageProps {
  src: string;
  alt: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
  return (
    <div className="flex h-96">
      <Image src={src} alt={alt} className="object-cover h-full" />
    </div>
  );
};
