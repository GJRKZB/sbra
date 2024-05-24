import { HeroImage } from "@/app/components/cards/hero/card";
import { RestaurantCard } from "./components/cards/restaurant/card";

export default function Page() {
  return (
    <main className="h-full w-screen px-5 pt-10">
      <article className="flex justify-center flex-col items-center gap-10 w-full">
        <header className="font-mono text-center flex flex-col gap-10">
          <h1 className="font-bold text-2xl">
            Nulla incididunt proident nostrud incididunt veniam.
          </h1>
          <p className="font-normal text-base">
            Cupidatat qui in anim elit eiusmod duis. Proident laboris
            reprehenderit aliqua eiusmod deserunt laboris quis aliqua aute
            magna. Sit exercitation laborum tempor ex sunt nulla.
          </p>
        </header>
        <section className="justify-center">
          <HeroImage
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            alt="hero"
          />
        </section>
        <section className="font-mono text-center flex flex-col gap-10">
          <h2 className="font-bold text-2xl">
            Do proident elit eiusmod ipsum laboris nisi.
          </h2>
          <p className="font-normal text-base">
            Veniam officia ipsum sit nostrud dolor cupidatat in ut irure irure
            anim sit reprehenderit. Consectetur aliqua irure nisi velit officia
            eu exercitation ad. Id et dolor ut excepteur ullamco aliqua ullamco
            proident aliqua.
          </p>
          <RestaurantCard />
        </section>
      </article>
    </main>
  );
}
