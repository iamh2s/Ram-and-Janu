import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { IMG } from "../data/story";
import { DustParticles } from "./chrome";
import { Letterbox, SectionTag } from "./bits";

/* ═══════════════════════════════════════════════════════════
   CHAPTER VI — after all the roads (the reunion)
   ═══════════════════════════════════════════════════════════ */
export default function ChapterReunion() {
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
            scrub: 0.8,
          },
        })
        /* the camera gently steps back, giving the moment air */
        .fromTo(".ru-media", { scale: 1.24 }, { scale: 1.04, duration: 1 }, 0)
        .fromTo(".ru-tag", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 0.05)
        .fromTo(
          ".ru-line1",
          { autoAlpha: 0, y: 36, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.12 },
          0.16
        )
        .fromTo(
          ".ru-line2",
          { autoAlpha: 0, y: 36, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.12 },
          0.42
        )
        .fromTo(
          ".ru-sub",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.1 },
          0.62
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[280vh] bg-coal">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="ru-media absolute inset-0 will-change-transform">
          <img
            src={IMG.reunion}
            alt="The two, now adults, meeting again at golden dusk outside their old school gate"
            className="h-full w-full object-cover object-[47%_50%]"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/10 to-coal/50" />
        <DustParticles count={16} />
        <Letterbox />

        <div className="ru-tag absolute inset-x-0 top-[11vh] opacity-0">
          <SectionTag>Chapter VI · The Reunion · 2023</SectionTag>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="ru-line1 max-w-3xl font-serif text-[clamp(1.8rem,4.4vw,3.8rem)] leading-tight font-light italic text-cream opacity-0 drop-shadow-[0_2px_24px_rgba(13,8,5,0.75)]">
            “After all the roads…”
          </p>
          <p className="ru-line2 max-w-3xl font-serif text-[clamp(1.8rem,4.4vw,3.8rem)] leading-tight font-normal italic opacity-0 drop-shadow-[0_2px_24px_rgba(13,8,5,0.75)]">
            <span className="gold-sheen">somehow, they led back to each other.</span>
          </p>
          <p className="ru-sub mt-5 font-tamil text-[10px] tracking-[0.5em] text-cream/60 uppercase opacity-0 md:text-xs">
            The old gate · one ordinary evening · twenty years later
          </p>
        </div>
      </div>
    </section>
  );
}
