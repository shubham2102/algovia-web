import HeroSection from "./components/HeroSection";
import CTASection from "./components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CTASection
        lead="Talk to Algovia AI or request a meeting to scope the engagement model that fits your next AI transformation."
      />
    </>
  );
}
