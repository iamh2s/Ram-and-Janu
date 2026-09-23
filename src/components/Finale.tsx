import { ArrowUp, Globe, Heart, Mail } from "lucide-react";
import { IMG, STORY } from "../data/story";
import { Ornament, SectionTag, useReveal } from "./bits";

const DEV = {
  name: "Hariharasudhan",
  line: "Designed with creativity, elegance, and love to celebrate this beautiful beginning.",
  url: "https://hariharasudhan-portfolio-iota.vercel.app/",
};

/* ═══════════════════════════════════════════════════════════
   FINALE — from little memories to a lifetime together
   ═══════════════════════════════════════════════════════════ */
export default function Finale() {
  const root = useReveal<HTMLElement>();

  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (v: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 2.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-coffee via-coal to-coal text-cream"
    >
      {/* ghost type */}
      <p
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 font-display text-[22vw] whitespace-nowrap uppercase"
        style={{ color: "transparent", WebkitTextStroke: "1px rgba(198,161,91,0.1)" }}
      >
        Forever
      </p>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 pb-20 text-center md:pt-32 md:pb-24">
        <p data-reveal className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] font-light text-gold-soft italic">
          “From little memories…”
        </p>
        <h2 data-reveal className="mt-2 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] text-cream">
          to a lifetime together.
        </h2>

        {/* portrait */}
        <div data-reveal className="mt-12">
          <div className="arch overflow-hidden border border-gold/35 bg-[#1a120a] p-2 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9),0_0_50px_-12px_rgba(198,161,91,0.3)]">
            <div className="arch overflow-hidden">
              <img
                src={IMG.couple}
                alt="The bride and groom together at the mandapam"
                className="h-[34svh] w-52 object-cover md:h-[38svh] md:w-64"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* names */}
        <div data-reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span className="gold-sheen font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-none">
            {STORY.bride.short}
          </span>
          <Heart className="h-6 w-6 fill-gold/15 text-gold md:h-8 md:w-8" strokeWidth={1.3} />
          <span className="gold-sheen font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-none">
            {STORY.groom.short}
          </span>
        </div>

        <p data-reveal className="mt-3 font-tamil text-sm text-cream/50">
          {STORY.bride.tamil} · {STORY.groom.tamil}
        </p>

        <p data-reveal className="mt-10 font-display text-[clamp(1.5rem,3.6vw,2.6rem)] tracking-[0.08em] text-cream uppercase">
          Save the Date
        </p>
        <p data-reveal className="mt-4 border-y border-gold/30 px-6 py-3 font-tamil text-[10px] tracking-[0.45em] text-gold-soft uppercase md:px-8 md:text-xs">
          {STORY.wedding.date} · {STORY.wedding.city}
        </p>

        <div data-reveal className="mt-10">
          <Ornament />
        </div>

        <p data-reveal className="mt-10 max-w-md font-serif text-xl leading-relaxed font-light text-cream/85 italic">
          “We can’t wait to celebrate with you.”
        </p>

        <p data-reveal className="mt-8 font-tamil text-[10px] leading-relaxed tracking-[0.35em] text-cream/50 uppercase">
          With the blessings of
          <br />
          {STORY.bride.parents} · {STORY.groom.parents}
        </p>

        <button
          data-reveal
          onClick={toTop}
          className="group mt-14 mb-20 inline-flex items-center gap-3 border border-gold/40 px-7 py-3 font-tamil text-[10px] tracking-[0.35em] text-gold-soft uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
        >
          <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.6} />
          Relive the story
        </button>
      </div>

      {/* ── Developer credit ─────────────────────────────── */}
      <div className="relative border-t border-gold/15 bg-[#0a0603]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 py-14 text-center">
          <SectionTag>Website Crafted &amp; Developed By</SectionTag>
          <p className="gold-sheen mt-1 font-display text-[clamp(1.9rem,5.5vw,3.2rem)] leading-none tracking-[0.1em] uppercase">
            {DEV.name}
          </p>
          <p className="max-w-md font-serif text-base leading-relaxed font-light text-cream/60 italic md:text-lg">
            {DEV.line}
          </p>
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={DEV.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 border border-gold bg-gold px-7 py-3 font-tamil text-[10px] tracking-[0.3em] text-maroon-deep uppercase transition-colors duration-500 hover:bg-transparent hover:text-gold"
            >
              <Globe className="h-3.5 w-3.5 transition-transform duration-700 group-hover:rotate-[20deg]" strokeWidth={1.6} />
              View Portfolio
            </a>
            <a
              href={DEV.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 border border-gold/50 px-7 py-3 font-tamil text-[10px] tracking-[0.3em] text-gold-soft uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <Mail className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.6} />
              Contact Developer
            </a>
          </div>

          <div className="mt-8 flex w-full flex-col items-center gap-2 border-t border-gold/10 pt-6 text-[9px] tracking-[0.3em] text-cream/35 uppercase md:flex-row md:justify-between">
            <span className="font-tamil">A love story in eight chapters</span>
            <span className="flex items-center gap-2 font-tamil">
              fin
              <Heart className="h-3 w-3 text-gold/60" strokeWidth={1.5} />
              2004 — 2027
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
