import { useLayoutEffect, useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  MoveDown,
  School,
  TrainFront,
} from "lucide-react";
import { gsap } from "../lib/gsap";
import { STORY, type StopItem } from "../data/story";
import { SectionTag, useReveal } from "./bits";

const ICONS: Record<string, React.ElementType> = {
  home: Home,
  school: School,
  college: GraduationCap,
  briefcase: Briefcase,
  train: TrainFront,
  heart: Heart,
};

/* ═══════════════════════════════════════════════════════════
   CHAPTER IV — the roads they walked (cinematic route map)
   ═══════════════════════════════════════════════════════════ */
export default function JourneyMap() {
  const root = useRef<HTMLElement>(null);
  const list = useReveal<HTMLDivElement>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* the route draws itself downward */
      gsap.fromTo(
        ".jm-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".jm-route",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 1,
          },
        }
      );

      /* a little train travels the whole route */
      gsap.fromTo(
        ".jm-travel",
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".jm-route",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 1,
          },
        }
      );

      /* drifting clouds */
      gsap.utils.toArray<HTMLElement>("[data-cloud]").forEach((el) => {
        gsap.to(el, {
          y: -parseFloat(el.dataset.cloud || "60"),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      });
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-maroon-deep py-28 md:py-40">
      {/* atmosphere */}
      <div
        data-cloud="70"
        aria-hidden
        className="absolute top-[8%] left-[-10%] h-64 w-[46rem] rounded-full bg-cream/[0.045] blur-3xl"
      />
      <div
        data-cloud="110"
        aria-hidden
        className="absolute top-[42%] right-[-14%] h-72 w-[52rem] rounded-full bg-cream/[0.04] blur-3xl"
      />
      <div
        data-cloud="50"
        aria-hidden
        className="absolute bottom-[6%] left-[-8%] h-60 w-[40rem] rounded-full bg-gold/[0.05] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div data-reveal className="text-center">
          <SectionTag>Chapter IV · The Roads They Walked</SectionTag>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[1.05] text-cream">
            Every place kept
            <br />a <span className="font-serif italic text-gold-soft">piece</span> of them.
          </h2>
          <p className="mx-auto mt-5 max-w-md font-serif text-lg font-light text-cream/60 italic">
            Hometowns, classrooms, platforms and skylines — each one a chapter.
          </p>
        </div>

        {/* the route */}
        <div ref={list} className="jm-route relative mt-24 pb-10">
          {/* base line */}
          <div className="absolute top-0 bottom-0 left-[26px] w-px -translate-x-1/2 bg-cream/10 md:left-1/2" />
          {/* drawn line */}
          <div className="jm-fill absolute top-0 bottom-0 left-[26px] w-px -translate-x-1/2 bg-gradient-to-b from-gold-soft via-gold to-gold-soft md:left-1/2" />

          {/* travelling companion */}
          <div className="jm-travel absolute left-[26px] z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/70 bg-coffee shadow-[0_0_24px_rgba(198,161,91,0.45)]">
              <TrainFront className="h-4 w-4 text-gold-soft" strokeWidth={1.5} />
            </span>
          </div>

          {STORY.stops.map((stop, i) => {
            const last = i === STORY.stops.length - 1;
            return (
              <MapStop
                key={stop.year + stop.place}
                stop={stop}
                index={i}
                special={last}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── One stop along the way ─────────────────────────────── */
function MapStop({
  stop,
  index,
  special,
}: {
  stop: StopItem | { icon: string; year: string; place: string; note: string };
  index: number;
  special: boolean;
}) {
  const Icon = ICONS[stop.icon] ?? Home;
  const even = index % 2 === 0;

  if (special) {
    return (
      <div className="relative py-14 md:py-20">
        <div className="absolute top-[4.5rem] left-[26px] z-10 -translate-x-1/2 md:top-14 md:left-1/2 md:-translate-y-1/2">
          <span className="soft-pulse flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold text-maroon-deep shadow-[0_0_40px_rgba(198,161,91,0.55)]">
            <Heart className="h-5 w-5" strokeWidth={1.8} />
          </span>
        </div>
        <div data-reveal className="mx-auto max-w-xl pl-16 md:pl-0 md:text-center">
          <div className="double-frame relative bg-gradient-to-b from-maroon to-coffee px-8 py-10 md:px-14">
            <p className="font-tamil text-[10px] tracking-[0.5em] text-gold/80 uppercase">
              Final stop · {stop.year}
            </p>
            <p className="gold-sheen mt-3 font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-tight">
              {stop.place}
            </p>
            <p className="mt-3 font-serif text-lg font-light text-cream/70 italic">{stop.note}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-10 md:grid md:grid-cols-2 md:gap-28 md:py-14">
      {/* node */}
      <div className="absolute top-12 left-[26px] z-10 -translate-x-1/2 md:left-1/2">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-maroon-deep shadow-[0_0_18px_rgba(198,161,91,0.25)]">
          <Icon className="h-4.5 w-4.5 text-gold-soft" strokeWidth={1.5} />
        </span>
      </div>

      <div
        data-reveal
        className={`pl-16 md:pl-0 ${
          even
            ? "md:col-start-1 md:pr-10 md:text-right"
            : "md:col-start-2 md:pl-10 md:text-left"
        }`}
      >
        <p className="text-outline-faint font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-none">
          {stop.year}
        </p>
        <p className="mt-2 font-serif text-[clamp(1.2rem,2.4vw,1.8rem)] font-medium text-cream">
          {stop.place}
        </p>
        <p className={`mt-2 font-serif text-base font-light text-cream/55 italic ${even ? "md:ml-auto" : ""} max-w-md`}>
          {stop.note}
        </p>
        <MoveDown
          aria-hidden
          className={`mt-4 h-4 w-4 text-gold/40 ${even ? "md:ml-auto" : ""}`}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
