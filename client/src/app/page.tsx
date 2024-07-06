import { HeroImage } from "@/app/components/cards/hero/heroCard";
import RestaurantList from "@/app/components/cards/restaurant/restaurantList";

export default function Page() {
  return (
    <main className="h-full w-screen px-5 pt-10 flex items-center flex-col">
      <article className="flex flex-col gap-10 max-w-2xl">
        <header className="font-mono text-center flex flex-col gap-10">
          <h1 className="font-bold text-2xl">Ribrates</h1>
          <div className="space-y-4 text-base font-normal">
            <p>
              Ribrates is jouw ultieme gids voor spareribs-liefhebbers. Deze
              webapplicatie stelt je in staat om beoordelingen van restaurants
              te bekijken, specifiek gericht op hun spareribs-aanbod.
            </p>
            <p>
              Door een account aan te maken, kun je zelf ook beoordelingen
              toevoegen en delen met andere gebruikers.
            </p>
            <p>
              Ontdek de beste spareribs in jouw omgeving en deel jouw ervaringen
              met een gemeenschap van mede-ribfans.
            </p>
          </div>
        </header>
        <section className="font-mono text-center">
          <HeroImage
            src="webp/spareribs.webp"
            alt="spareribs with sauce and vegetables on white ceramic plate"
          />
        </section>
        <section className="font-mono text-center flex flex-col gap-10 pb-20">
          <h2 className="font-bold text-2xl">Beoordelingen</h2>
          <p className="font-normal text-base">
            Hieronder vind je onze ranglijst van restaurants, gesorteerd op
            basis van hun algemene beoordeling voor spareribs. De lijst wordt
            samengesteld uit de beoordelingen van onze ribraters.
          </p>
          <RestaurantList />
        </section>
      </article>
    </main>
  );
}
