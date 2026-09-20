"use client";

import { useEffect, useState } from "react";
import type { AI_DIGITAL_SERVICES, INTELLIGENT_BUSINESS_SERVICES } from "@/lib/constants";

type Service = (typeof AI_DIGITAL_SERVICES)[number] | (typeof INTELLIGENT_BUSINESS_SERVICES)[number];

interface Category {
  id: string;
  label: string;
  title: string;
  services: readonly Service[];
}

interface ServicePortfolioTabsProps {
  categories: readonly Category[];
}

export default function ServicePortfolioTabs({ categories }: ServicePortfolioTabsProps) {
  const [activeId, setActiveId] = useState(categories[0].id);

  useEffect(() => {
    // Sync initial tab from the URL hash (an external system) once, on mount.
    const hash = window.location.hash.replace("#", "");
    if (categories.some((c) => c.id === hash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from window.location on mount, not a derived-state loop
      setActiveId(hash);
    }
  }, [categories]);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div>
      <div className="tab-switch" role="tablist" aria-label="Service portfolio categories">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            id={category.id}
            aria-selected={category.id === activeId}
            className="tab-switch__btn"
            onClick={() => setActiveId(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-[var(--foreground)]">{active.title}</h3>

      <div role="tabpanel" className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {active.services.map((service) => (
          <article key={service.id} id={service.id} className="page-card flex flex-col">
            <h3 className="page-card__title">{service.title}</h3>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">Why now</p>
            <p className="page-card__text">{service.whyNow}</p>
            <div className="mt-3 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-muted)]">What we deliver</p>
              <ul className="mt-1 space-y-0.5">
                {service.delivers.map((item) => (
                  <li key={item} className="text-xs text-[var(--algovia-muted)] before:mr-1.5 before:text-[var(--algovia-green)] before:content-['›']">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-xs italic text-[var(--algovia-green)]">{service.impact}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
