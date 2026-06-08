import Container from "@/components/ui/Container";
import "./marketing.css";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead: string;
}

export default function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" aria-hidden />
      <Container>
        <div className="page-hero__inner">
          {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__lead">{lead}</p>
        </div>
      </Container>
    </section>
  );
}
