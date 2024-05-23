import { HeroImage } from "./components/hero/heroImage";

export default function Page() {
  return (
    <main className="h-screen w-screen px-5 pt-10">
      <article className="flex justify-center flex-col items-center gap-10 w-full">
        <header className="font-mono text-center">
          <h1>Main title</h1>
          <p>Some random text</p>
        </header>
        <section className="justify-center items-center flex">
          <HeroImage
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            alt="hero"
          />
        </section>
      </article>
    </main>
  );
}
