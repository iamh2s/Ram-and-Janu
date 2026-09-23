import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { IMG, STORY } from "../data/story";
import { SectionTag } from "./bits";

/* ═══════════════════════════════════════════════════════════
   CHAPTER V — two roads, two lives (split screen, converging)
   ═══════════════════════════════════════════════════════════ */
export default function ChapterJourneys() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (mctx) => {
        const { isDesktop } = mctx.conditions as { isDesktop: boolean };
        const axis = isDesktop ? "x" : "y";

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });

        tl.fromTo(".jr-head", { autoAlpha: 0, y: -24 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.02)
          .fromTo(
            ".jl-step, .jg-step",
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.1 },
            0.12
          )
          /* the two paths drift toward each other */
          .to(".jr-left", { [axis]: isDesktop ? "7.5vw" : "2.5vh", duration: 0.4 }, 0.52)
          .to(".jr-right", { [axis]: isDesktop ? "-7.5vw" : "-2.5vh", duration: 0.4 }, 0.52)
          .to(".jr-divider", { opacity: 0.9, filter: "drop-shadow(0 0 14px rgba(198,161,91,0.8))", duration: 0.3 }, 0.6)
          .to(".jr-media", { filter: "brightness(0.45) saturate(0.8)", duration: 0.3 }, 0.62)
          .fromTo(
            ".jr-meet",
            { autoAlpha: 0, scale: 0.96 },
            { autoAlpha: 1, scale: 1, duration: 0.14 },
            0.84
          );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[330vh] bg-coal">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="flex h-full flex-col md:flex-row">
          <RoadPanel
            side="left"
            img={IMG.brideRoad}
            alt="A young woman standing with a suitcase at a misty railway platform at dawn"
            label={STORY.bride.roadLabel}
            name={STORY.bride.short}
            meta={`b. ${STORY.bride.dob}`}
            steps={STORY.bride.road}
            stepClass="jl-step"
          />
          <RoadPanel
            side="right"
            img={IMG.groomRoad}
            alt="A young man on a rooftop terrace at dusk looking over city lights"
            label={STORY.groom.roadLabel}
            name={STORY.groom.short}
            meta={`b. ${STORY.groom.dob}`}
            steps={STORY.groom.road}
            stepClass="jg-step"
          />
        </div>

        {/* divider */}
        <div className="jr-divider absolute inset-x-[8vw] top-1/2 z-20 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-50 md:inset-x-auto md:inset-y-[10vh] md:left-1/2 md:h-auto md:w-px md:bg-gradient-to-b" />

        {/* heading */}
        <div className="jr-head pointer-events-none absolute inset-x-0 top-[8vh] z-20 flex flex-col items-center gap-3 px-6 text-center opacity-0">
          <SectionTag>Chapter V · 2019 — 2023</SectionTag>
          <h2 className="max-w-3xl font-serif text-[clamp(1.5rem,3.4vw,2.6rem)] leading-snug font-light italic text-cream drop-shadow-[0_2px_16px_rgba(13,8,5,0.8)]">
            “Life, for a while, took them two different ways.”
          </h2>
        </div>

        {/* convergence */}
        <div className="jr-meet pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 opacity-0">
          <p className="max-w-2xl text-center font-serif text-[clamp(1.7rem,4vw,3.4rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_24px_rgba(13,8,5,0.9)]">
            “But some roads were always
            <br />
            <span className="gold-sheen font-normal not-italic">meant to meet.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── One life, one panel ─────────────────────────────────── */
function RoadPanel({
  side,
  img,
  alt,
  label,
  name,
  meta,
  steps,
  stepClass,
}: {
  side: "left" | "right";
  img: string;
  alt: string;
  label: string;
  name: string;
  meta: string;
  steps: string[];
  stepClass: string;
}) {
  return (
    <div
      className={`jr-${side} relative min-h-0 flex-1 overflow-hidden will-change-transform`}
    >
      <div className="jr-media absolute inset-0 will-change-[filter]">
        <img
          src={img}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          className={`absolute inset-0 ${
            side === "left"
              ? "bg-gradient-to-t from-coal/85 via-coal/25 to-coal/40 md:bg-gradient-to-r md:from-coal/70 md:via-coal/20 md:to-coal/45"
              : "bg-gradient-to-t from-coal/85 via-coal/25 to-coal/40 md:bg-gradient-to-l md:from-coal/70 md:via-coal/20 md:to-coal/45"
          }`}
        />
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 p-7 md:p-12 ${
          side === "right" ? "md:text-right" : ""
        }`}
      >
        <p className="font-tamil text-[10px] tracking-[0.45em] text-gold-soft/90 uppercase">
          {label}
        </p>
        <p className="mt-2 font-display text-[clamp(1.9rem,4vw,3.4rem)] leading-none text-cream">
          {name}
        </p>
        <p className="mt-1 font-serif text-sm font-light text-cream/55 italic">{meta}</p>

        <ul
          className={`jr-steps mt-5 space-y-2.5 ${side === "right" ? "md:ml-auto md:w-fit md:text-left" : "w-fit"}`}
        >
          {steps.map((s, i) => (
            <li key={s} className={`${stepClass} flex items-baseline gap-3 opacity-0`}>
              <span className="font-tamil text-[9px] tracking-[0.3em] text-gold/70">
                0{i + 1}
              </span>
              <span className="font-serif text-[15px] font-light text-cream/85 md:text-base">
                {s}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
