import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Capabilities } from "@/components/sections/Capabilities";
import { Journey } from "@/components/sections/Journey";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Capabilities />
      <Journey />
      <About />
      <Contact />
    </>
  );
}
