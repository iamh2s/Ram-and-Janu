import { useLayoutEffect, useRef } from "react";
import {
  Clock,
  Flower2,
  MapPin,
  PartyPopper,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { gsap } from "../lib/gsap";
import { STORY, type EventItem } from "../data/story";
import { SectionTag, useReveal } from "./bits";

const ICONS: Record<string, React.ElementType> = {
  flower: Flower2,
  party: PartyPopper,
  sparkles: Sparkles,
  food: UtensilsCrossed,
};

/* ═══════════════════════════════════════════════════════════
   THE CELEBRATION — two days, a thousand moments
   ═══════════════════════════════════════════════════════════ */
export default function EventTimeline() {
  const root = useRef<HTMLElement>(null);
  const list = useReveal<HTMLDivElement>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".et-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".et-route",
            start: "top 72%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="paper-night relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <div data-reveal className="text-center">
          <SectionTag>The Celebration</SectionTag>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[1.05] text-cream">
            Two days. <span className="font-serif italic text-gold-soft">A thousand</span> moments.
          </h2>
        </div>

        <div ref={list} className="et-route relative mt-20">
          <div className="absolute top-0 bottom-8 left-[26px] w-px -translate-x-1/2 bg-gold/12 md:left-1/2" />
          <div className="et-fill absolute top-0 bottom-8 left-[26px] w-px -translate-x-1/2 bg-gradient-to-b from-gold-dim via-gold to-gold-dim md:left-1/2" />

          {STORY.events.map((ev, i) => (
            <EventRow key={ev.title + ev.date} ev={ev} index={i} />
          ))}
        </div>

        <p data-reveal className="mt-16 text-center font-serif text-lg font-light text-gold-soft/80 italic">
          — and countless cups of filter coffee in between.
        </p>
      </div>
    </section>
  );
}

function EventRow({ ev, index }: { ev: EventItem; index: number }) {
  const Icon = ICONS[ev.icon] ?? Sparkles;
  const even = index % 2 === 0;

  return (
    <div className="relative py-8 md:grid md:grid-cols-2 md:gap-24 md:py-10">
      <div className="absolute top-[2.6rem] left-[26px] z-10 -translate-x-1/2 md:left-1/2">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-coffee text-gold-soft shadow-[0_10px_26px_-10px_rgba(0,0,0,0.9)]">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
        </span>
      </div>

      <div
        data-reveal
        className={`pl-16 md:pl-0 ${even ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}
      >
        <div className="inline-block w-full max-w-md border border-gold/25 bg-[#22160d] px-6 py-6 text-left shadow-[0_24px_56px_-22px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-3">
            <span className="bg-maroon px-2.5 py-1 font-tamil text-[9px] tracking-[0.3em] text-cream uppercase">
              {ev.day} · {ev.date}
            </span>
          </div>
          <h3 className="mt-4 font-display text-[clamp(1.5rem,3.4vw,2.2rem)] leading-tight text-cream">
            {ev.title}
          </h3>
          <div className="mt-3 space-y-1.5 font-serif text-base font-light text-cream/70">
            <p className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.6} />
              {ev.time}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.6} />
              {ev.place}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
