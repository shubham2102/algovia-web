"use client";

import { useRef } from "react";
import { Calendar, Upload } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { SITE } from "@/lib/constants";
import { scrollToAIPanel } from "@/lib/utils";
import "./cta.css";

interface CTASectionProps {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  lead?: string;
}

export default function CTASection({
  eyebrow = "Let's build together",
  heading = "Start with a",
  headingAccent = "conversation.",
  lead = "Talk to Algovia AI or connect with our experts to scope your next AI-native platform, agentic workflow, or cloud transformation.",
}: CTASectionProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const el = innerRef.current;
      if (!el) return;

      const children = el.querySelectorAll<HTMLElement>("[data-cta-item]");
      if (!children.length) return;

      gsap.from(children, {
        opacity: 0,
        y: 30,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: innerRef },
  );

  return (
    <section className="cta" aria-label="Start a conversation with Algovia AI">
      <div className="cta__bg-grid" aria-hidden />
      <div className="cta__glow-l"  aria-hidden />
      <div className="cta__glow-r"  aria-hidden />

      <div ref={innerRef} className="cta__inner">
        <p className="cta__eyebrow" data-cta-item>{eyebrow}</p>

        <h2 className="cta__heading" data-cta-item>
          {heading} <em>{headingAccent}</em>
        </h2>

        <p className="cta__lead" data-cta-item>{lead}</p>

        <div className="cta__actions" data-cta-item>
          <button
            type="button"
            onClick={() => scrollToAIPanel(true)}
            className="cta__btn-primary"
          >
            Talk to Algovia AI
          </button>

          <a
            href={SITE.workshopUrl}
            className="cta__btn-ghost"
            target={SITE.workshopUrl.startsWith("http") ? "_blank" : undefined}
            rel={SITE.workshopUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <Calendar className="h-4 w-4" strokeWidth={2} />
            Schedule a Workshop
          </a>

          <a
            href={SITE.uploadUrl}
            className="cta__btn-ghost"
            target={SITE.uploadUrl.startsWith("http") ? "_blank" : undefined}
            rel={SITE.uploadUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <Upload className="h-4 w-4" strokeWidth={2} />
            Upload Requirements
          </a>
        </div>
      </div>
    </section>
  );
}
