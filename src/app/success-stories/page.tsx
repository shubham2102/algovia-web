import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import CTASection from "@/app/components/CTASection";
import SuccessStoriesBrowser from "@/app/components/SuccessStoriesBrowser";
import DacLogo from "@/components/ui/DacLogo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Success Stories",
  description:
    "Credentials delivered by DAC Digital, Algovia's strategic AI specialist partner, across Government, Financial Services, Energy, Healthcare, Real Estate, Retail & Manufacturing, and more.",
  path: "/success-stories",
});

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success Stories"
        title="Real outcomes. Proven execution."
        media={<DacLogo className="page-hero__partner-logo" />}
        lead="Within ALGOVIA's global ecosystem, DAC Digital is our strategic AI specialist partner. The credentials below showcase work designed and delivered by DAC Digital for clients globally in AI, computer vision, data, IoT and beyond. Through our partnership, ALGOVIA brings this proven capability to clients in the Middle East and Australia. We combine it with our own transformation expertise as one integrated team, with ALGOVIA leading and accountable for every engagement in our markets."
      />

      <SuccessStoriesBrowser />

      <CTASection
        eyebrow="Your sector. Our expertise."
        heading="AI built for"
        headingAccent="your business."
        lead="Practical AI, shaped around your challenges and built to deliver value."
      />
    </>
  );
}
