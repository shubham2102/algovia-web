/**
 * Decorative brand banner background: soft light beams that slowly pulse and
 * flicker. Pure CSS (see .hero-beams in globals.css); static under
 * prefers-reduced-motion.
 */
export default function HeroBeams() {
  return (
    <div className="hero-beams" aria-hidden>
      <span className="hero-beams__beam hero-beams__beam--1" />
      <span className="hero-beams__beam hero-beams__beam--2" />
      <span className="hero-beams__beam hero-beams__beam--3" />
      <span className="hero-beams__beam hero-beams__beam--4" />
      <span className="hero-beams__beam hero-beams__beam--5" />
      <span className="hero-beams__beam hero-beams__beam--6" />
    </div>
  );
}
