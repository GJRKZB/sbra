import { Image, Card } from "@nextui-org/react";

interface HeroImageProps {
  src: string;
  alt: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
  return (
    <div className="h-96">
      <Card className="h-full font-mono text-start">
        <Image
          removeWrapper
          alt={alt}
          className="w-screen h-full object-cover"
          src={src}
        />
      </Card>
    </div>
  );
};
