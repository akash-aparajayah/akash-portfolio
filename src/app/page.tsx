import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Work from "@/components/Work";
import Systems from "@/components/Systems";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import HowIWork from "@/components/HowIWork";
import Contact from "@/components/Contact";
import { site } from "@/data/site";
import { getYearsOfExperience } from "@/lib/years";

export default async function Home() {
  const years = await getYearsOfExperience();

  return (
    <>
      {site.showSampleBanner && (
        <div className="bg-accent px-4 py-2 text-center text-sm text-accent-ink">
          Sample content. Replace the data in src/data, then set showSampleBanner to false.
        </div>
      )}
      <main>
        <Hero years={years} />
        <TechMarquee />
        <Work />
        <Systems />
        <Skills />
        <Experience years={years} />
        <HowIWork />
        <Contact />
      </main>
    </>
  );
}
