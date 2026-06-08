import Container from "@/components/ui/Container";

type SectionBand = "default" | "elevated" | "dark";
type SectionSize = "default" | "compact" | "full";

interface SectionViewportProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** Skip max-width container — content spans full width */
  bleed?: boolean;
  /** Background band variant for alternating sections */
  band?: SectionBand;
  /** Section vertical rhythm — compact for trust bar, full for hero-like blocks */
  size?: SectionSize;
}

const bandClasses: Record<SectionBand, string> = {
  default: "",
  elevated: "section-band--elevated",
  dark: "section-band--dark",
};

const sizeClasses: Record<SectionSize, string> = {
  default: "section-viewport--default",
  compact: "section-viewport--compact",
  full: "section-viewport--full",
};

export default function SectionViewport({
  id,
  children,
  className = "",
  containerClassName = "",
  bleed = false,
  band = "default",
  size = "default",
}: SectionViewportProps) {
  const inner = bleed ? (
    <div
      className={`container section-viewport__inner !max-w-[100vw] ${containerClassName}`.trim()}
    >
      {children}
    </div>
  ) : (
    <Container
      className={`section-viewport__inner ${containerClassName}`.trim()}
    >
      {children}
    </Container>
  );

  return (
    <section
      id={id}
      className={`section-viewport ${sizeClasses[size]} ${bandClasses[band]} ${className}`.trim()}
    >
      {inner}
    </section>
  );
}
