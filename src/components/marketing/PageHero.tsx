import Container from "@/components/ui/Container";
import HeroBeams from "@/components/ui/HeroBeams";
import "./marketing.css";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  media?: React.ReactNode;
  /** "dark" renders the brand-green banner with animated light beams. */
  tone?: "light" | "dark";
}

export default function PageHero({ eyebrow, title, lead, media, tone = "light" }: PageHeroProps) {
  return (
    <section className={`page-hero${tone === "dark" ? " page-hero--dark" : ""}`}>
      <div className="page-hero__bg" aria-hidden />
      {tone === "dark" && <HeroBeams />}
      <Container>
        <div className="page-hero__inner">
          {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
          <h1 className="page-hero__title">{title}</h1>
          {media}
          {lead && <p className="page-hero__lead">{lead}</p>}
        </div>
      </Container>
    </section>
  );
}
