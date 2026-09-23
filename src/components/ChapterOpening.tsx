  import { useLayoutEffect, useRef } from "react";
  import { gsap } from "../lib/gsap";
  import { IMG } from "../data/story";
  import { DustParticles } from "./chrome";
  import { Letterbox } from "./bits";

  /* ═══════════════════════════════════════════════════════════
    PROLOGUE — the old school, morning light, first two lines
    ═══════════════════════════════════════════════════════════ */
  export default function ChapterOpening({ ready }: { ready: boolean }) {
    const root = useRef<HTMLElement>(null);

    /* Intro — plays once the preloader lifts */
    useLayoutEffect(() => {
      if (!ready) return;
      const ctx = gsap.context(() => {
        gsap
          .timeline()
          .fromTo(
            ".op-media",
            { scale: 1.07, filter: "brightness(0.7) blur(6px)" },
            { scale: 1, filter: "brightness(1) blur(0px)", duration: 2.4, ease: "power2.out" }
          )
          .fromTo(
            ".op-tag",
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
            0.9
          )
          .fromTo(
            ".op-line1",
            { autoAlpha: 0, y: 34, filter: "blur(10px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
            1.35
          )
          .fromTo(
            ".op-cue",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1, ease: "power1.out" },
            2.6
          );
      }, root);
      return () => ctx.revert();
    }, [ready]);

    /* Scroll — the two lines pass, the camera drifts toward the gate */
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
          .to(".op-media", { scale: 1.34, transformOrigin: "36% 40%", duration: 1 }, 0)
          .to(".op-line1", { autoAlpha: 0, y: -46, filter: "blur(8px)", duration: 0.14 }, 0.1)
          .fromTo(
            ".op-line2",
            { autoAlpha: 0, y: 42, filter: "blur(10px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.16 },
            0.3
          )
          .to(".op-line2", { autoAlpha: 0, y: -42, filter: "blur(8px)", duration: 0.12 }, 0.58)
          .to(".op-tag", { autoAlpha: 0, duration: 0.08 }, 0.1)
          .to(".op-cue", { autoAlpha: 0, duration: 0.06 }, 0.05)
          .to(".op-glow", { opacity: 0.15, duration: 0.4 }, 0.6);
      }, root);
      return () => ctx.revert();
    }, []);

    return (
      <section ref={root} id="prologue" className="relative h-[340vh] bg-coal">
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* The establishing shot */}
          <div className="op-media absolute inset-0 will-change-transform">
            <img
              src={IMG.opening}
              alt="An old South Indian school campus in warm morning light, with a weathered entrance gate, bicycles and trees"
              className="h-full w-full object-cover object-[30%_50%]"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-coal/45" />
          <div className="op-glow absolute inset-0 bg-gradient-to-b from-coal/60 via-transparent to-coal/75 opacity-0" />
          <DustParticles count={26} />
          <Letterbox />

          {/* Chapter tag */}
          <div className="op-tag absolute inset-x-0 top-[12vh] z-10 flex flex-col items-center gap-3 px-6 text-center opacity-0">
            <span className="font-tamil text-[10px] font-medium tracking-[0.55em] text-white/90 uppercase md:text-xs">
              A love story in eight chapters
            </span>
            <span className="font-tamil text-[13px] mt-2 text-gold-soft/80">ஒரு சின்ன காதல் கதை</span>
          </div>

          {/* Line one */}
          <h1 className="op-line1 absolute inset-0 z-10 flex items-center justify-center px-6 text-center opacity-0">
            <span className="font-serif text-[clamp(1.9rem,4.6vw,4.2rem)] leading-tight font-medium italic text-cream drop-shadow-[0_2px_20px_rgba(13,8,5,0.6)]">
              “Every love story
              <br className="md:hidden" /> has a beginning…”
            </span>
          </h1>

          {/* Line two */}
          <p className="op-line2 absolute inset-0 z-10 flex items-center justify-center px-6 text-center opacity-0">
            <span className="font-serif text-[clamp(1.9rem,4.6vw,4.2rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_20px_rgba(13,8,5,0.6)]">
              “Some begin long before
              <br className="md:hidden" /> we even know it.”
            </span>
          </p>

          {/* Scroll cue */}
          <div className="op-cue absolute inset-x-0 bottom-[10vh] z-10 flex flex-col items-center gap-3 opacity-0">
            <span className="font-tamil text-[10px] tracking-[0.5em] text-cream/60 uppercase">
              Scroll to begin
            </span>
            <span className="scroll-cue-line h-12 w-px bg-cream/15" />
          </div>
        </div>
      </section>
    );
  }
