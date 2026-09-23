import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { IMG, STORY } from "../data/story";
import { SectionTag } from "./bits";

/* ═══════════════════════════════════════════════════════════
   CHAPTER III — college days, new dreams, different paths
   ═══════════════════════════════════════════════════════════ */
export default function ChapterCollege() {
  const root = useRef<HTMLElement>(null);

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
          },
        })
        /* slow parallax drift of the campus */
        .fromTo(".cl-bg", { yPercent: -7 }, { yPercent: 7, duration: 1 }, 0)

        .fromTo(".cl-w1", { autoAlpha: 0, xPercent: -8 }, { autoAlpha: 1, xPercent: 0, duration: 0.1 }, 0.06)
        .to(".cl-w1", { autoAlpha: 0, xPercent: 8, duration: 0.1 }, 0.24)

        .fromTo(".cl-w2", { autoAlpha: 0, xPercent: 8 }, { autoAlpha: 1, xPercent: 0, duration: 0.1 }, 0.34)
        .to(".cl-w2", { autoAlpha: 0, xPercent: -8, duration: 0.1 }, 0.52)

        .fromTo(".cl-w3", { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, duration: 0.1 }, 0.6)
        .to(".cl-w3", { autoAlpha: 0, yPercent: -40, duration: 0.09 }, 0.76)

        .fromTo(
          ".cl-final",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.1 },
          0.84
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[280vh] bg-coal">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute -inset-y-[10%] inset-x-0">
          <div className="cl-bg h-full w-full will-change-transform">
            <img
              src={IMG.college}
              alt="The two as college students walking and laughing together on a tree-lined campus road"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-coal/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-transparent to-coal/60" />

        <div className="absolute inset-x-0 top-[10vh]">
          <SectionTag>Chapter III · 2015 · New Dreams</SectionTag>
        </div>

        {/* the three turning words */}
        <p className="cl-w1 absolute inset-0 flex items-center px-[8vw] opacity-0">
          <span className="gold-sheen font-display text-[clamp(3rem,10vw,9rem)] leading-none tracking-[0.04em] uppercase">
            College
            <br />
            Days
          </span>
        </p>
        <p className="cl-w2 absolute inset-0 flex items-center justify-end px-[8vw] text-right opacity-0">
          <span className="text-outline-gold font-display text-[clamp(3rem,10vw,9rem)] leading-none tracking-[0.04em] uppercase">
            New
            <br />
            Dreams
          </span>
        </p>
        <p className="cl-w3 absolute inset-0 flex items-center px-[8vw] opacity-0">
          <span className="font-serif text-[clamp(2rem,6vw,5rem)] leading-none font-light italic text-cream">
            Different paths.
          </span>
        </p>

        {/* closing caption */}
        <div className="cl-final absolute inset-x-0 bottom-[12vh] z-10 flex flex-col items-center gap-5 px-6 text-center opacity-0">
          <p className="max-w-2xl font-serif text-[clamp(1.4rem,3vw,2.3rem)] leading-snug font-light italic text-cream">
            “Different classrooms. The same old story.”
          </p>
          <span className="border border-gold/40 px-5 py-2 font-tamil text-[10px] tracking-[0.4em] text-gold-soft/90 uppercase md:text-xs">
            {STORY.college.name} · {STORY.college.place}
          </span>
        </div>
      </div>
    </section>
  );
}
