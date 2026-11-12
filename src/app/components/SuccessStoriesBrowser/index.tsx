"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { SECTORS } from "@/lib/case-studies";
import CaseStudyCard from "./CaseStudyCard";

const ALL = "all";

export default function SuccessStoriesBrowser() {
  const [active, setActive] = useState<string>(ALL);

  // Header/footer links to /success-stories#<sector> must always land on a
  // visible section, so any such click resets the filter.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (anchor?.getAttribute("href")?.startsWith("/success-stories#")) setActive(ALL);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const select = (id: string) => {
    setActive(id);
    document.getElementById("stories-filter")?.scrollIntoView({ block: "start" });
  };

  const visible = active === ALL ? SECTORS : SECTORS.filter((s) => s.id === active);

  return (
    <>
      <section className="page-section stories-intro" aria-labelledby="stories-title">
        <Container>
          <h2 id="stories-title" className="stories-intro__title">AI Built for your Business</h2>
          <p className="stories-intro__sub">See how we build what matters.</p>
        </Container>
      </section>

      <div id="stories-filter" className="stories-filter">
        <div className="stories-filter__inner" role="group" aria-label="Filter success stories by sector">
          <button type="button" className="stories-filter__chip" aria-pressed={active === ALL} onClick={() => select(ALL)}>
            All sectors
          </button>
          {SECTORS.map((sector) => (
            <button
              key={sector.id}
              type="button"
              className="stories-filter__chip"
              aria-pressed={active === sector.id}
              onClick={() => select(sector.id)}
            >
              {sector.shortTitle}
            </button>
          ))}
        </div>
      </div>

      <section className="page-section stories-grid-section">
        <Container>
          {visible.map((sector) => (
            <div key={sector.id} id={sector.id} className="stories-sector">
              <h3 className="stories-sector__title">{sector.title}</h3>
              {sector.intro && <p className="stories-sector__intro">{sector.intro}</p>}
              {sector.studies.length > 0 && (
                <div className="cs__grid">
                  {sector.studies.map((s) => (
                    <CaseStudyCard
                      key={s.id}
                      id={s.id}
                      client={s.client}
                      challenge={s.challenge}
                      sectorId={sector.id}
                      sectorLabel={sector.shortTitle}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
