import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { IMG } from "../data/story";
import { SectionTag } from "./bits";

const YEARS = [2010, 2012, 2014, 2016, 2018, 2020, 2023, 2026];

/* ═══════════════════════════════════════════════════════════
   TIME — school gate → college → present (continuous morph)
   ═══════════════════════════════════════════════════════════ */
export default function ChapterTransformation() {
  const root = useRef<HTMLElement>(null);
  const [year, setYear] = useState(YEARS[0]);
  const [showYear, setShowYear] = useState(true);

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
              const i = Math.min(
                YEARS.length - 1,
                Math.floor(self.progress * YEARS.length)
              );
              setYear(YEARS[i]);
              setShowYear(self.progress < 0.86);
            },
          },
        })
        /* film memory dissolves into present colour */
        .to(".tf-sepia", { opacity: 0, duration: 0.75 }, 0.05)

        .fromTo(
          ".tf-line1",
          { autoAlpha: 0, y: 36, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.09 },
          0.05
        )
        .to(".tf-line1", { autoAlpha: 0, y: -32, filter: "blur(6px)", duration: 0.07 }, 0.2)

        /* teenage → college */
        .to(".tf-l1", { autoAlpha: 0, scale: 1.1, filter: "blur(9px) brightness(0.8)", duration: 0.18 }, 0.26)
        .fromTo(
          ".tf-l2",
          { autoAlpha: 0, scale: 1.12, filter: "blur(11px) brightness(0.85)" },
          { autoAlpha: 1, scale: 1.02, filter: "blur(0px) brightness(1)", duration: 0.18 },
          0.3
        )

        .fromTo(
          ".tf-line2",
          { autoAlpha: 0, y: 36, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.09 },
          0.36
        )
        .to(".tf-line2", { autoAlpha: 0, y: -32, filter: "blur(6px)", duration: 0.07 }, 0.5)

        /* college → present day */
        .to(".tf-l2", { autoAlpha: 0, scale: 1.08, filter: "blur(9px) brightness(0.85)", duration: 0.16 }, 0.56)
        .fromTo(
          ".tf-l3",
          { autoAlpha: 0, scale: 1.13, filter: "blur(12px) brightness(0.8) saturate(0.8)" },
          { autoAlpha: 1, scale: 1.01, filter: "blur(0px) brightness(1) saturate(1.08)", duration: 0.2 },
          0.6
        )

        .fromTo(
          ".tf-line3",
          { autoAlpha: 0, y: 36, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.09 },
          0.66
        )
        .to(".tf-line3", { autoAlpha: 0, y: -32, filter: "blur(6px)", duration: 0.07 }, 0.8)

        .fromTo(
          ".tf-line4",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.09 },
          0.86
        )
        .fromTo(
          ".tf-glow",
          { opacity: 0 },
          { opacity: 0.55, duration: 0.14 },
          0.82
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[400vh] bg-coal">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* layer 1 · teenage */}
        <div className="tf-l1 absolute inset-0 will-change-transform">
          <img
            src={IMG.teen}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            style={{ filter: "sepia(0.24) saturate(0.9) brightness(0.92)" }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* layer 2 · college */}
        <div className="tf-l2 absolute inset-0 opacity-0 will-change-transform">
          <img
            src={IMG.college}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-coal/45" />
        </div>

        {/* layer 3 · the present */}
        <div className="tf-l3 absolute inset-0 opacity-0 will-change-transform">
          <img
            src={IMG.couple}
            alt="The couple now, as bride and groom, before a marigold-decked wedding mandapam"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/75 via-transparent to-coal/45" />
        </div>

        {/* the film-of-memory overlay that fades out */}
        <div className="tf-sepia pointer-events-none absolute inset-0 z-10 opacity-85">
          <div className="absolute inset-0 bg-[#6b4a32]/30 mix-blend-multiply" />
          <div className="grain-layer" />
        </div>

        {/* present-day glow */}
        <div className="tf-glow pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(80%_60%_at_50%_70%,rgba(226,198,142,0.22),transparent_70%)] opacity-0" />

        <div className="absolute inset-x-0 top-[9vh] z-20">
          <SectionTag>The Years Kept Moving</SectionTag>
        </div>

        {/* captions */}
        <p className="tf-line1 absolute inset-0 z-20 flex items-center justify-center px-6 text-center opacity-0">
          <span className="max-w-3xl font-serif text-[clamp(1.7rem,4vw,3.5rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_22px_rgba(13,8,5,0.8)]">
            “Time kept moving…”
          </span>
        </p>
        <p className="tf-line2 absolute inset-0 z-20 flex items-center justify-center px-6 text-center opacity-0">
          <span className="max-w-3xl font-serif text-[clamp(1.7rem,4vw,3.5rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_22px_rgba(13,8,5,0.8)]">
            “…out of the school gate, into the wide world.”
          </span>
        </p>
        <p className="tf-line3 absolute inset-0 z-20 flex items-center justify-center px-6 text-center opacity-0">
          <span className="max-w-3xl font-serif text-[clamp(1.7rem,4vw,3.5rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_22px_rgba(13,8,5,0.8)]">
            “But some things — never changed.”
          </span>
        </p>

        <div className="tf-line4 absolute inset-x-0 bottom-[13vh] z-20 flex flex-col items-center gap-4 px-6 text-center opacity-0">
          <p className="max-w-2xl font-serif text-[clamp(1.5rem,3.4vw,2.7rem)] leading-snug font-light italic text-cream">
            “The boy at the gate. The girl by the window.”
          </p>
          <span className="font-tamil text-[10px] tracking-[0.5em] text-gold-soft/80 uppercase">
            and now — chapter vii
          </span>
        </div>

        {/* year readout */}
        <div
          className={`absolute bottom-[9vh] left-[6vw] z-20 transition-opacity duration-500 ${
            showYear ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-tamil text-[10px] tracking-[0.5em] text-gold/70 uppercase">
            The years passed
          </p>
          <p className="gold-sheen font-display text-[clamp(3rem,9vw,6.5rem)] leading-none tabular-nums">
            {year}
          </p>
        </div>
      </div>
    </section>
  );
}
