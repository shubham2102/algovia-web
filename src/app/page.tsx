import HeroSection from "./components/HeroSection";
import IndustriesSection from "./components/IndustriesSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import CTASection from "./components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <CTASection
        lead="Talk to Algovia AI or request a meeting to scope the engagement model that fits your next AI transformation."
      />
    </>
  );
}
