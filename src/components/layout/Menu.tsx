"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Logo from "@/components/ui/Logo";
import { AILink } from "@/components/ui/AILink";
import { FOOTER_LINKS, NAV_ITEMS } from "@/lib/constants";
import { MENU_CLOSE_EVENT } from "@/lib/menuClose";
import { gsap } from "@/lib/gsap";
import "./Menu.css";

const MENU_LINKS = [{ label: "Home", href: "/" }, ...NAV_ITEMS] as const;

const OVERLAY_FOOTER_LINKS = [
  { label: "Contact", href: "/company#contact" },
  { label: "Privacy", href: "/company#privacy" },
  { label: "Terms", href: "/company#terms" },
] as const;

function normalizePath(path: string) {
  const normalized = (path.split("?")[0].split("#")[0] || "/").replace(/\/$/, "");
  return normalized || "/";
}

function isActiveRoute(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export default function Menu() {
  const pathname = usePathname();
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hamburgerTl = useRef<gsap.core.Timeline | null>(null);
  const isMenuOpen = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(
    (immediate = false) => {
      if (!isMenuOpen.current) return;

      const tl = hamburgerTl.current;
      const overlay = overlayRef.current;
      if (!tl || !overlay) return;

      isMenuOpen.current = false;
      setMenuOpen(false);
      lenis?.start();
      tl.reverse();

      if (immediate) {
        overlay.style.transition = "none";
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        overlay.style.visibility = "hidden";
        return;
      }

      overlay.style.transition = "opacity 0.4s ease";
      overlay.style.opacity = "0";
    },
    [lenis],
  );

  const handleLinkClick = useCallback(
    (event: React.MouseEvent, href: string) => {
      if (normalizePath(pathname) !== normalizePath(href)) return;

      event.preventDefault();
      event.stopPropagation();
      closeMenu();
    },
    [pathname, closeMenu],
  );

  useEffect(() => {
    const handleMenuClose = () => closeMenu(true);
    window.addEventListener(MENU_CLOSE_EVENT, handleMenuClose);
    return () => window.removeEventListener(MENU_CLOSE_EVENT, handleMenuClose);
  }, [closeMenu]);

  useEffect(() => {
    closeMenu(true);
  }, [pathname, closeMenu]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const getHeroThreshold = () => {
      const hero = document.querySelector(".hero") as HTMLElement | null;
      return (hero?.offsetHeight ?? window.innerHeight) * 0.9;
    };

    const updateNavTopClass = () => {
      const scrollY = lenis?.scroll ?? window.scrollY;
      nav.classList.toggle("top", scrollY < getHeroThreshold());
    };

    lenis?.on("scroll", updateNavTopClass);
    updateNavTopClass();

    const spans = nav.querySelectorAll(".site-nav__hamburger span");
    const tl = gsap.timeline({ paused: true });

    tl.to(
      spans[0],
      {
        y: "0.19rem",
        rotation: 45,
        width: "1.1rem",
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    ).to(
      spans[1],
      {
        y: "-0.19rem",
        rotation: -45,
        width: "1.1rem",
        duration: 0.3,
        ease: "power2.inOut",
      },
      0,
    );

    hamburgerTl.current = tl;

    const overlay = overlayRef.current;
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== overlay || event.propertyName !== "opacity") return;
      if (!isMenuOpen.current && overlay) {
        overlay.style.pointerEvents = "none";
        overlay.style.visibility = "hidden";
      }
    };

    overlay?.addEventListener("transitionend", onTransitionEnd);

    return () => {
      lenis?.off("scroll", updateNavTopClass);
      tl.kill();
      overlay?.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [lenis]);

  const toggleMenu = () => {
    const tl = hamburgerTl.current;
    const overlay = overlayRef.current;
    if (!tl || !overlay) return;

    if (!isMenuOpen.current) {
      tl.play();
      overlay.style.visibility = "visible";
      overlay.style.pointerEvents = "all";
      overlay.style.transition = "none";
      overlay.style.opacity = "0";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.transition = "opacity 0.4s ease";
          overlay.style.opacity = "1";
        });
      });

      isMenuOpen.current = true;
      setMenuOpen(true);
      lenis?.stop();
      return;
    }

    closeMenu();
  };

  return (
    <>
      <nav ref={navRef} className={`site-nav top${menuOpen ? " menu-open" : ""}`} aria-label="Site navigation">
        <div className="container" style={{ padding: 0 }}>
          <div className="site-nav__container">
            <div className="site-nav__cta">
              <AILink className="site-nav__cta-btn hero__cta-primary !px-5 !py-2.5 !text-sm">
                Talk to Algovia AI
              </AILink>
            </div>

            <div className="site-nav__logo">
              <Logo size="lg" className="!h-8 sm:!h-9" />
            </div>

            <div className="site-nav__toggle">
              <button
                type="button"
                className="site-nav__toggle-btn"
                onClick={toggleMenu}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                Menu
                <span className="site-nav__hamburger" aria-hidden>
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="site-menu-overlay"
        ref={overlayRef}
        aria-hidden={!menuOpen}
      >
        <div className="site-menu-overlay__items">
          {MENU_LINKS.map((item) => (
            <div
              key={item.href}
              className={`site-menu-overlay__item ${
                isActiveRoute(pathname, item.href) ? "is-active" : ""
              }`}
            >
              <Link
                href={item.href}
                onClick={(event) => {
                  handleLinkClick(event, item.href);
                  closeMenu();
                }}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        {/* <div className="site-menu-overlay__footer">
          <div className="container">
            <div className="site-menu-overlay__footer-inner">
              <div className="site-menu-overlay__footer-links">
                {FOOTER_LINKS.products.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => closeMenu()}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="site-menu-overlay__footer-links">
                {OVERLAY_FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => closeMenu()}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
