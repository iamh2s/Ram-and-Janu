import { useEffect, useState } from "react";
import { Calendar, Clock, Heart, MapPin, Sparkles } from "lucide-react";
import { STORY } from "../data/story";
import { Ornament, SectionTag, useReveal } from "./bits";

/* ═══════════════════════════════════════════════════════════
   THE INVITATION — details, muhurtham, live countdown
   ═══════════════════════════════════════════════════════════ */
export default function WeddingInvite() {
  const root = useReveal<HTMLElement>();
  const t = useCountdown(STORY.wedding.iso);

  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${STORY.bride.short} & ${STORY.groom.short} — Wedding`
  )}&dates=${STORY.wedding.calDates}&details=${encodeURIComponent(
    STORY.loveLine
  )}&location=${encodeURIComponent(
    `${STORY.wedding.venue}, ${STORY.wedding.address}`
  )}`;

  return (
    <section
      ref={root}
      id="invitation"
      className="relative overflow-hidden bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep py-24 md:py-36"
    >
      {/* faint kolam dots */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(226,198,142,0.1) 1px, transparent 1.5px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.16),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <div data-reveal>
          <SectionTag>Chapter VIII · The Invitation</SectionTag>
        </div>

        <p data-reveal className="mt-10 font-serif text-xl font-light text-cream/70 italic md:text-2xl">
          Together with their families,
        </p>

        <h2 data-reveal className="mt-6 font-display leading-[1.05]">
          <span className="gold-sheen block text-[clamp(1.9rem,5vw,3.6rem)]">
            {STORY.bride.name}
          </span>
          <span className="my-2 block font-serif text-2xl font-light text-cream/60 italic md:text-3xl">
            weds
          </span>
          <span className="gold-sheen block text-[clamp(1.9rem,5vw,3.6rem)]">
            {STORY.groom.name}
          </span>
        </h2>

        <p data-reveal className="mx-auto mt-6 max-w-lg font-serif text-lg font-light text-cream/70 italic md:text-xl">
          request the pleasure of your presence as they begin forever.
        </p>

        <div data-reveal className="mt-10">
          <Ornament />
        </div>

        {/* details card */}
        <div data-reveal className="double-frame mt-12 bg-coal/35 px-6 py-10 backdrop-blur-[2px] md:px-12 md:py-14">
          <p className="font-tamil text-[10px] tracking-[0.5em] text-gold-soft/80 uppercase">
            The Wedding
          </p>
          <p className="mt-4 font-display text-[clamp(2rem,5.4vw,3.8rem)] leading-tight text-cream">
            {STORY.wedding.date}
          </p>

          <div className="mt-10 grid gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
            <Detail
              icon={<Calendar className="h-4 w-4" strokeWidth={1.5} />}
              label="Day"
              value="Sunday"
              sub="An auspicious morning"
            />
            <Detail
              icon={<Clock className="h-4 w-4" strokeWidth={1.5} />}
              label="Ceremony"
              value={STORY.wedding.time}
              sub="Blessings begin"
            />
            <Detail
              icon={<Sparkles className="h-4 w-4" strokeWidth={1.5} />}
              label="Muhurtham"
              value={STORY.wedding.muhurtham}
              sub="The sacred hour"
            />
            <Detail
              icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />}
              label="Venue"
              value={STORY.wedding.venue}
              sub={STORY.wedding.city}
            />
          </div>

          {/* countdown */}
          <div className="mx-auto mt-12 grid max-w-xl grid-cols-4 gap-2 md:gap-4">
            {[
              { v: t.d, l: "Days" },
              { v: t.h, l: "Hours" },
              { v: t.m, l: "Minutes" },
              { v: t.s, l: "Seconds" },
            ].map((x) => (
              <div key={x.l} className="border border-gold/25 bg-maroon-deep/60 px-2 py-4">
                <p className="gold-sheen font-display text-[clamp(1.6rem,4.6vw,2.8rem)] leading-none tabular-nums">
                  {String(x.v).padStart(2, "0")}
                </p>
                <p className="mt-1.5 font-tamil text-[9px] tracking-[0.35em] text-cream/55 uppercase">
                  {x.l}
                </p>
              </div>
            ))}
          </div>

          {/* actions */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={STORY.wedding.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-gold bg-gold px-8 py-3.5 font-tamil text-[11px] tracking-[0.35em] text-maroon-deep uppercase transition-colors duration-500 hover:bg-transparent hover:text-gold"
            >
              <MapPin className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.6} />
              Get Directions
            </a>
            <a
              href={calUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border border-gold/60 px-8 py-3.5 font-tamil text-[11px] tracking-[0.35em] text-gold-soft uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <Heart className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} />
              Save the Date
            </a>
          </div>
        </div>

        <p data-reveal className="mt-10 font-serif text-base font-light text-cream/50 italic">
          Your presence is the greatest gift of all.
        </p>
      </div>
    </section>
  );
}

function Detail({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 text-gold-soft">
        {icon}
      </span>
      <p className="mt-1 font-tamil text-[9px] tracking-[0.4em] text-gold/80 uppercase">{label}</p>
      <p className="font-serif text-lg leading-tight font-medium text-cream">{value}</p>
      <p className="font-serif text-sm font-light text-cream/50 italic">{sub}</p>
    </div>
  );
}

/* live tick */
function useCountdown(targetIso: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return t;
}
