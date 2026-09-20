import HeroSection from "./components/HeroSection";
import StickyCardsSection from "./components/StickyCardsSection";
// import TrustBar from "./components/TrustBar";
// import ServicesSection from "./components/ServicesSection";
import ArchitectureShowcase from "./components/ArchitectureShowcase";
import EngineeringSection from "./components/EngineeringSection";
import IndustriesSection from "./components/IndustriesSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import CTASection from "./components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StickyCardsSection />
      {/* <TrustBar /> */}
      {/* <ServicesSection /> */}
      <ArchitectureShowcase />
      <EngineeringSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <CTASection
        lead="Talk to Algovia AI or schedule a meeting to scope the engagement model that fits your next AI transformation."
      />
    </>
  );
}
