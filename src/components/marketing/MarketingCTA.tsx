import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import "./marketing.css";

interface MarketingCTAProps {
  title?: string;
  description?: string;
}

export default function MarketingCTA({
  title = "Start with a conversation.",
  description = "Talk to Algovia AI or connect with our experts to scope your next AI-native platform.",
}: MarketingCTAProps) {
  return (
    <section className="page-cta-band">
      <h2 className="page-cta-band__title">{title}</h2>
      <p className="page-cta-band__desc">{description}</p>
      <div className="page-cta-band__actions">
        <Link href="/#ai-panel" className="hero__cta-primary">
          Talk to Algovia AI
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
        <a
          href={SITE.workshopUrl}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          target={SITE.workshopUrl.startsWith("http") ? "_blank" : undefined}
          rel={SITE.workshopUrl.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          Schedule a Workshop
        </a>
      </div>
    </section>
  );
}
