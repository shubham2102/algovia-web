import Container from "@/components/ui/Container";
import { AI_VALUE_GAP } from "@/lib/constants";

export default function ValueGap() {
  return (
    <section id="value-gap" className="gap-band">
      <Container>
        <h2 className="gap-band__title">The AI Value Gap</h2>
        <p className="gap-band__lead">
          Most AI initiatives stall between strategy and measurable value. Here is how we close each gap.
        </p>

        <ol className="gap-band__steps">
          {AI_VALUE_GAP.map((item) => (
            <li key={item.id} className="gap-step">
              <h3 className="gap-step__title">{item.title}</h3>
              <span className="gap-step__marker" aria-hidden>
                {Number(item.id)}
              </span>
              <p className="gap-step__problem">{item.problem}</p>
              <p className="gap-step__solution">{item.solution}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
