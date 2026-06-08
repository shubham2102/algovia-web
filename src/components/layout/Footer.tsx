import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { FOOTER_LINKS } from "@/lib/constants";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__main">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo size="lg" />
            <p className="site-footer__brand-copy">
              Business AI that works for you. AI-native engineering, cloud
              platforms, and enterprise digital transformation.
            </p>
          </div>

          {(
            [
              ["Products", FOOTER_LINKS.products],
              ["Company", FOOTER_LINKS.company],
              ["Resources", FOOTER_LINKS.resources],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <h4 className="site-footer__column-title">{title}</h4>
              <ul className="site-footer__links">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="site-footer__bar">
        <Container className="site-footer__bar-inner">
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} Algovia AI. All rights reserved.
          </p>
          <div className="site-footer__legal">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
