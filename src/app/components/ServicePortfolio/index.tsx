"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { AI_DIGITAL_SERVICES, INTELLIGENT_BUSINESS_SERVICES } from "@/lib/constants";

type Service = (typeof AI_DIGITAL_SERVICES)[number] | (typeof INTELLIGENT_BUSINESS_SERVICES)[number];

const CATEGORIES: { id: string; label: string; icon: React.ReactNode; services: readonly Service[] }[] = [
  {
    id: "ai-digital",
    label: "AI & Digital Solutions",
    services: AI_DIGITAL_SERVICES,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M30 10c-8 0-14 5-14 12 0 2 .5 4 1.5 5.5C14 29.5 12 33 12 37c0 6 5 10 11 10h1v7h6V10Z" />
        <path d="M30 10v44M30 22h-8M30 32h-10M30 42h-6M36 18h10M36 30h14M36 42h8" />
        <circle cx="48" cy="18" r="2.5" /><circle cx="52" cy="30" r="2.5" /><circle cx="46" cy="42" r="2.5" />
      </svg>
    ),
  },
  {
    id: "intelligent-business",
    label: "Intelligent Business Solutions",
    services: INTELLIGENT_BUSINESS_SERVICES,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M24 30c-4-2-6-5-6-9a9 9 0 0 1 18 0c0 4-2 7-6 9v4H24v-4Z" />
        <path d="M24 38h6M25 42h4" />
        <circle cx="46" cy="22" r="5" /><path d="M46 14v3M46 27v3M38 22h3M51 22h3M40.3 16.3l2 2M49.7 25.7l2 2M40.3 27.7l2-2M49.7 18.3l2-2" />
        <path d="M6 48l10-4 12 2 12-6c3-1 5 2 2 4l-14 8H20l-8-2-6 2v-4Z" />
      </svg>
    ),
  },
];

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="portfolio-detail">
      <div className="portfolio-detail__block portfolio-detail__block--deliver">
        <p className="portfolio-detail__label portfolio-detail__label--green">What we deliver</p>
        <ul className="portfolio-detail__list">
          {service.delivers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="portfolio-detail__block portfolio-detail__block--why">
        <p className="portfolio-detail__label portfolio-detail__label--dark">Why now</p>
        <p className="portfolio-detail__why">{service.whyNow}</p>
      </div>
      <div className="portfolio-detail__block portfolio-detail__block--impact">
        <p className="portfolio-detail__label portfolio-detail__label--green">Business impact</p>
        <p className="portfolio-detail__impact">{service.impact}</p>
      </div>
    </div>
  );
}

export default function ServicePortfolio() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [openService, setOpenService] = useState<string | null>(null);

  useEffect(() => {
    // One-time sync from the URL hash (external system) so deep links open the right category.
    const hash = window.location.hash.replace("#", "");
    const match = CATEGORIES.find((c) => c.id === hash || c.services.some((s) => s.id === hash));
    if (match) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from window.location on mount
      setActiveCategory(match.id);
    }
  }, []);

  return (
    <section id="service-portfolio" className="portfolio">
      <Container>
        <h2 className="portfolio__title">Our Service Portfolio</h2>

        <div className="portfolio__cols">
          {CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <div key={category.id} id={category.id} className="portfolio__col" data-active={isActive}>
                <span className="portfolio__icon">{category.icon}</span>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className="portfolio__tab"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>

                <ul className="portfolio__list">
                  {category.services.map((service) => {
                    const isOpen = openService === service.id;
                    return (
                      <li key={service.id} id={service.id} className="portfolio__item">
                        <button
                          type="button"
                          className="portfolio__item-btn"
                          aria-expanded={isOpen}
                          aria-controls={`${service.id}-panel`}
                          onClick={() => setOpenService(isOpen ? null : service.id)}
                        >
                          <ChevronRight className="portfolio__chevron" strokeWidth={2.5} aria-hidden />
                          {service.title}
                        </button>
                        {isOpen && (
                          <div id={`${service.id}-panel`}>
                            <ServiceDetail service={service} />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
