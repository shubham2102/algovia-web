"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  ChevronDown,
  Infinity,
  Layers,
  LockOpen,
  Sparkles,
} from "lucide-react";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import "./sticky-cards.css";

const CARDS_ENTER_END = 100;
const CARD_FLIP_TRIGGER = 200;
const CARD_DISMISS_START = 300;
const CARD_DISMISS_DURATION = 100;

const CARD_FLIP_TILT_ANGLES = [-10, -20, -5, 10];
const CARD_DISMISS_TILT_ANGLES = [-50, -60, -45, 50];

const BACK_CARDS = [
  {
    id: "card-1",
    title: "Lorem Ipsum Dolor",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    icon: LockOpen,
  },
  {
    id: "card-2",
    title: "Consectetur Adipiscing",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    icon: Layers,
  },
  {
    id: "card-3",
    title: "Tempor Incididunt",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    icon: Sparkles,
  },
  {
    id: "card-4",
    title: "Magna Aliqua",
    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: Infinity,
  },
] as const;

export default function StickyCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFlippedRef = useRef(false);

  useGSAP(
    () => {
      registerGsapPlugins();

      const section = sectionRef.current;
      const headline = headlineRef.current;
      const frontCard = frontCardRef.current;
      const backCards = backCardRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!section || !headline || !frontCard || backCards.length === 0) return;

      const stickyCardCount = backCards.length;
      const totalScrollSvh =
        CARD_DISMISS_START + stickyCardCount * CARD_DISMISS_DURATION;
      const svhToProgress = (svh: number) => svh / totalScrollSvh;
      const totalScroll = window.innerHeight * (totalScrollSvh / 100);

      const cardDismissRanges = Array.from({ length: stickyCardCount }, (_, i) => {
        const dismissOrder = stickyCardCount - 1 - i;
        return [
          svhToProgress(CARD_DISMISS_START + dismissOrder * CARD_DISMISS_DURATION),
          svhToProgress(
            CARD_DISMISS_START + (dismissOrder + 1) * CARD_DISMISS_DURATION,
          ),
        ] as const;
      });

      const stickyCards = [frontCard, ...backCards];

      gsap.set(frontCard, { rotationY: 0 });
      gsap.set(backCards, { rotationY: -180 });

      const revealBackCards = () => {
        gsap.to(frontCard, {
          rotationY: 180,
          duration: 1,
          ease: "elastic.out(1,0.5)",
        });
        backCards.forEach((card, i) => {
          gsap.to(card, {
            rotationY: 0,
            rotationZ: CARD_FLIP_TILT_ANGLES[i],
            duration: 1,
            ease: "elastic.out(1,0.5)",
          });
        });
      };

      const concealBackCards = () => {
        gsap.to(frontCard, {
          rotationY: 0,
          duration: 1,
          ease: "elastic.out(1,0.5)",
        });
        backCards.forEach((card) => {
          gsap.to(card, {
            rotationY: -180,
            rotationZ: 0,
            duration: 1,
            ease: "elastic.out(1,0.5)",
          });
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScroll}px`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const enterProgress = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(
              0,
              svhToProgress(CARDS_ENTER_END),
              0,
              1,
              progress,
            ),
          );

          gsap.set(stickyCards, {
            y: `${gsap.utils.mapRange(0, 1, 50, -50, enterProgress)}%`,
          });
          gsap.set(headline, {
            y: `${gsap.utils.mapRange(0, 1, 0, -100, enterProgress)}%`,
          });

          if (progress > svhToProgress(CARD_FLIP_TRIGGER) && !isFlippedRef.current) {
            revealBackCards();
            isFlippedRef.current = true;
          } else if (
            progress <= svhToProgress(CARD_FLIP_TRIGGER) &&
            isFlippedRef.current
          ) {
            concealBackCards();
            isFlippedRef.current = false;
          }

          backCards.forEach((card, i) => {
            const [dismissStart, dismissEnd] = cardDismissRanges[i];
            const dismissProgress = gsap.utils.clamp(
              0,
              1,
              gsap.utils.mapRange(dismissStart, dismissEnd, 0, 1, progress),
            );
            gsap.set(card, {
              y: `${gsap.utils.mapRange(0, 1, -50, -250, dismissProgress)}%`,
              rotation: gsap.utils.mapRange(
                0,
                1,
                CARD_FLIP_TILT_ANGLES[i],
                CARD_DISMISS_TILT_ANGLES[i],
                dismissProgress,
              ),
            });
          });
        },
      });

      return () => {
        isFlippedRef.current = false;
        trigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="sticky-cards-section"
      aria-label="What Algovia AI can help you do"
    >
      <div ref={headlineRef} className="sticky-cards-section__headline">
        <h2>What Algovia AI Can Help You Do</h2>
      </div>

      <div className="sticky-cards-section__deck">
        <div
          ref={frontCardRef}
          className="sticky-cards-section__card sticky-cards-section__card--front"
        >
          <h3>Lorem Ipsum</h3>
          <span className="sticky-cards-section__badge">Start here</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A single
            moment, held in place before everything begins to move.
          </p>
          <div className="sticky-cards-section__icon">
            <ChevronDown className="h-6 w-6" strokeWidth={2} />
          </div>
        </div>

        {BACK_CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={card.id}
              ref={(element) => {
                backCardRefs.current[index] = element;
              }}
              className={`sticky-cards-section__card sticky-cards-section__card--back sticky-cards-section__card--${card.id}`}
            >
              <h3>{card.title}</h3>
              <div className="sticky-cards-section__icon">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <p>{card.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
