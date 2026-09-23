import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { IMG } from "../data/story";
import { Letterbox, SectionTag } from "./bits";

/* ═══════════════════════════════════════════════════════════
   CHAPTER II — the years turn; the children grow (morph)
   ═══════════════════════════════════════════════════════════ */
export default function ChapterTeenage() {
  const root = useRef<HTMLElement>(null);
  const [year, setYear] = useState(2004);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            onUpdate: (self) => {
              const p = Math.min(Math.max((self.progress - 0.3) / 0.3, 0), 1);
              setYear(2004 + Math.round(p * 6));
            },
          },
        })
        .fromTo(
          ".tg-tag",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.08 },
          0.03
        )
        .fromTo(
          ".tg-line1",
          { autoAlpha: 0, y: 40, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.1 },
          0.08
        )
        .to(".tg-line1", { autoAlpha: 0, y: -40, filter: "blur(6px)", duration: 0.09 }, 0.26)

        /* the morph — childhood dissolves into the teenage years */
        .to(
          ".tg-child",
          {
            autoAlpha: 0,
            scale: 1.14,
            filter: "blur(10px) sepia(0.45) brightness(0.72)",
            duration: 0.26,
          },
          0.3
        )
        .fromTo(
          ".tg-teen",
          { autoAlpha: 0, scale: 1.13, filter: "blur(12px) brightness(0.85)" },
          { autoAlpha: 1, scale: 1.01, filter: "blur(0px) brightness(1)", duration: 0.3 },
          0.34
        )

        .fromTo(
          ".tg-line2",
          { autoAlpha: 0, y: 40, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.1 },
          0.68
        )
        .to(".tg-line2", { autoAlpha: 0, y: -30, filter: "blur(6px)", duration: 0.08 }, 0.92)
        .to(".tg-tag", { autoAlpha: 0, duration: 0.06 }, 0.9);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[300vh] bg-coal">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* childhood, remembered */}
        <div className="tg-child absolute inset-0 will-change-transform">
          <img
            src={IMG.window}
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[50%_42%]"
            style={{ filter: "sepia(0.28) saturate(0.88) brightness(0.92)" }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* teenage, arriving — both figures framed on every screen size */}
        <div className="tg-teen absolute inset-0 opacity-0 will-change-transform">
          <img
            src={IMG.teen}
            alt="The same two as teenagers with bicycles at their old school at dusk"
            className="h-full w-full object-cover object-[64%_50%] md:object-[60%_50%] min-[1200px]:object-[50%_46%]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-coal/50" />
        </div>

        <Letterbox />

        <div className="tg-tag absolute inset-x-0 top-[11vh] z-10 opacity-0">
          <SectionTag>Chapter II · Growing Up</SectionTag>
        </div>

        <p className="tg-line1 absolute inset-0 z-10 flex items-center justify-center px-6 text-center opacity-0">
          <span className="max-w-3xl font-serif text-[clamp(1.7rem,4vw,3.6rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_20px_rgba(13,8,5,0.7)]">
            “The seasons turned quietly over Kumbakonam…”
          </span>
        </p>

        <p className="tg-line2 absolute inset-0 z-10 flex items-center justify-center px-6 text-center opacity-0">
          <span className="max-w-3xl font-serif text-[clamp(1.7rem,4vw,3.6rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_20px_rgba(13,8,5,0.7)]">
            “…and the children grew — almost without anyone noticing.”
          </span>
        </p>

        {/* the years in between */}
        <div className="absolute right-[6vw] bottom-[11vh] z-10 text-right">
          <p className="font-tamil text-[10px] tracking-[0.5em] text-gold/70 uppercase">
            The years in between
          </p>
          <p className="gold-sheen font-display text-[clamp(3.4rem,9vw,7.5rem)] leading-none tabular-nums">
            {year}
          </p>
        </div>
      </div>
    </section>
  );
}
