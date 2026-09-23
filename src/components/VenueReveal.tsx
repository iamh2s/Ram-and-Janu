import { useLayoutEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { gsap } from "../lib/gsap";
import { IMG, STORY } from "../data/story";
import { SectionTag } from "./bits";

/* ═══════════════════════════════════════════════════════════
   THE VENUE — memory, road, city… home (cinematic reveal)
   ═══════════════════════════════════════════════════════════ */
export default function VenueReveal() {
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
        .fromTo(
          ".vn-clip",
          { clipPath: "inset(16% 22% 16% 22% round 220px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.5 },
          0.05
        )
        .fromTo(".vn-img", { scale: 1.28 }, { scale: 1.02, duration: 0.8 }, 0.05)
        .fromTo(
          ".vn-intro",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.08 },
          0.1
        )
        .to(".vn-intro", { autoAlpha: 0, y: -26, duration: 0.07 }, 0.34)
        .fromTo(
          ".vn-title",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.1 },
          0.55
        )
        .fromTo(
          ".vn-card",
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 0.12 },
          0.72
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[280vh] bg-coal">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="vn-clip absolute inset-0 overflow-hidden will-change-[clip-path]">
          <div className="vn-img h-full w-full will-change-transform">
            <img
              src={IMG.venue}
              alt="The wedding mandapam at golden hour, decorated with marigold garlands and glowing oil lamps"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-coal/85 via-transparent to-coal/55" />
        </div>

        <div className="absolute inset-x-0 top-[9vh] z-10">
          <SectionTag>Chapter VIII · Where Forever Begins</SectionTag>
        </div>

        <p className="vn-intro absolute inset-0 z-10 flex items-center justify-center px-6 text-center opacity-0">
          <span className="max-w-2xl font-serif text-[clamp(1.6rem,3.6vw,3rem)] leading-tight font-light italic text-cream drop-shadow-[0_2px_22px_rgba(13,8,5,0.8)]">
            “Through memory, road and city — the story comes home.”
          </span>
        </p>

        <div className="vn-title absolute inset-x-0 top-[16vh] z-10 flex flex-col items-center gap-3 px-6 text-center opacity-0">
          <p className="font-tamil text-[10px] tracking-[0.5em] text-gold-soft/90 uppercase">
            The Venue
          </p>
          <p className="gold-sheen max-w-4xl font-display text-[clamp(1.9rem,5.6vw,4.4rem)] leading-[1.05]">
            {STORY.wedding.venue}
          </p>
        </div>

        <div className="vn-card absolute inset-x-0 bottom-[8vh] z-10 flex justify-center px-5 opacity-0">
          <div className="double-frame flex w-full max-w-2xl flex-col items-center gap-3 bg-coal/70 px-6 py-7 text-center backdrop-blur-md md:px-10">
            <p className="font-serif text-lg font-light text-cream/85 md:text-xl">
              {STORY.wedding.address}
            </p>
            <p className="font-serif text-base font-light text-gold-soft italic">
              “Join us as their next chapter begins.”
            </p>
            <a
              href={STORY.wedding.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2.5 border border-gold/50 px-6 py-2.5 font-tamil text-[10px] tracking-[0.35em] text-gold-soft uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
