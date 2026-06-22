import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { FOOTER_LINKS } from "@/lib/constants";
import "./footer.css";

const SOCIAL = [
  {
    href: "https://linkedin.com/company/algovia",
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://x.com/algovia_ai",
    label: "X (Twitter)",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/algovia",
    label: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__main">
        <div className="site-footer__grid">

          {/* ── Brand column ───────────────────────────────────────────── */}
          <div className="site-footer__brand">
            <Logo size="lg" />
            <p className="site-footer__brand-copy">
              Business AI that works for you. AI-native engineering, cloud
              platforms, and enterprise digital transformation.
            </p>
            <div className="site-footer__brand-rule" aria-hidden />
            <div className="site-footer__brand-social">
              {SOCIAL.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  className="site-footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ────────────────────────────────────────────── */}
          {(
            [
              ["Products",  FOOTER_LINKS.products ],
              ["Company",   FOOTER_LINKS.company  ],
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

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
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
