import Container from "@/components/ui/Container";
import "./marketing.css";

interface PageSectionProps {
  id?: string;
  label?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  elevated?: boolean;
}

export default function PageSection({
  id,
  label,
  title,
  description,
  children,
  elevated = false,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={`page-section ${elevated ? "page-section--elevated" : ""}`}
    >
      <Container>
        {label && <p className="page-section__label">{label}</p>}
        <h2 className="page-section__title">{title}</h2>
        {description && <p className="page-section__desc">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
