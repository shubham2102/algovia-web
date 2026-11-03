"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageSection from "@/components/marketing/PageSection";
import { SECTORS, splitClientTitle, type Sector } from "@/lib/case-studies";

const ALL = "all";

function StoryCard({ id, client, challenge }: { id: string; client: string; challenge: string }) {
  const { name, headline } = splitClientTitle(client);
  return (
    <article className="page-card story-card flex flex-col">
      <h3 className="page-card__title">{name}</h3>
      {headline && <p className="story-card__headline">{headline}</p>}
      <p className="page-card__text story-card__excerpt flex-1">{challenge}</p>
      <Link href={`/success-stories/${id}`} className="story-card__cta">
        View case study
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </Link>
    </article>
  );
}

function SectorSection({ sector, elevated }: { sector: Sector; elevated: boolean }) {
  const columns = sector.studies.length >= 6 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <PageSection id={sector.id} title={sector.title} elevated={elevated}>
      {sector.intro && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">{sector.intro}</p>
      )}
      {sector.studies.length > 0 && (
        <div className={`mt-6 grid gap-5 ${columns}`}>
          {sector.studies.map((s) => (
            <StoryCard key={s.id} id={s.id} client={s.client} challenge={s.challenge} />
          ))}
        </div>
      )}
    </PageSection>
  );
}

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

      {visible.map((sector, i) => (
        <SectorSection key={sector.id} sector={sector} elevated={i % 2 === 0} />
      ))}
    </>
  );
}
