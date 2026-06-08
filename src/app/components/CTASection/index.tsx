"use client";

import { Calendar, Upload } from "lucide-react";
import SectionViewport from "@/components/ui/SectionViewport";
import Reveal from "@/components/animations/Reveal";
import { SITE } from "@/lib/constants";
import { scrollToAIPanel } from "@/lib/utils";

export default function CTASection() {
  return (
    <SectionViewport>
      <Reveal className="w-full">
        <div
          data-reveal-item
          className="relative w-full overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16 lg:px-20 lg:py-20"
          style={{ background: "var(--gradient-cta)" }}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 50 L50 0 L100 50 L50 100 Z\' fill=\'none\' stroke=\'white\' stroke-opacity=\'0.2\'/%3E%3C/svg%3E')]" />

          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Start with a conversation.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Talk to Algovia AI or connect with our experts to scope your next
              AI-native platform, agentic workflow, or cloud transformation.
            </p>

            <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToAIPanel(true)}
                className="hero__cta-primary"
              >
                Talk to Algovia AI
              </button>
              <a
                href={SITE.workshopUrl}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                target={SITE.workshopUrl.startsWith("http") ? "_blank" : undefined}
                rel={SITE.workshopUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Calendar className="h-4 w-4" />
                Schedule a Workshop
              </a>
              <a
                href={SITE.uploadUrl}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                target={SITE.uploadUrl.startsWith("http") ? "_blank" : undefined}
                rel={SITE.uploadUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Upload className="h-4 w-4" />
                Upload Requirements
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionViewport>
  );
}
