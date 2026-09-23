import { IMG, STORY } from "../data/story";
import { Ornament, SectionTag, useReveal } from "./bits";

/* ═══════════════════════════════════════════════════════════
   CHAPTER VII · NOW — the couple, present day
   ═══════════════════════════════════════════════════════════ */
export default function PresentReveal() {
  const root = useReveal<HTMLElement>();

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-coal py-28 md:py-40"
    >
      {/* ambience */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.14),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(226,198,142,0.13) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(70% 60% at 50% 45%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 45%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <div data-reveal>
          <SectionTag>Chapter VII · Now · 2027</SectionTag>
        </div>

        <p data-reveal className="mt-8 font-serif text-lg font-light text-cream/55 italic md:text-xl">
          And here they are — all grown up.
        </p>

        {/* arch portrait */}
        <div data-reveal className="relative mt-12">
          <div className="arch overflow-hidden border border-gold/45 p-2 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8),0_0_60px_-10px_rgba(198,161,91,0.35)]">
            <div className="arch overflow-hidden">
              <img
                src={IMG.couple}
                alt="The bride and groom in traditional South Indian wedding attire before the decorated mandapam"
                className="h-[46svh] w-[74vw] max-w-sm object-cover md:h-[58svh] md:max-w-md"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 border border-gold/50 bg-coal px-4 py-1.5 font-tamil text-[9px] tracking-[0.4em] text-gold-soft uppercase">
            The Present
          </span>
        </div>

        {/* names */}
        <h2 data-reveal className="mt-16 font-display leading-[0.95]">
          <span className="block text-[clamp(2.8rem,8vw,6.5rem)] text-cream">
            {STORY.bride.short}
          </span>
          <span className="gold-sheen my-1 block font-serif text-[clamp(1.6rem,4vw,3rem)] italic">
            &amp;
          </span>
          <span className="block text-[clamp(2.8rem,8vw,6.5rem)] text-cream">
            {STORY.groom.short}
          </span>
        </h2>

        <p data-reveal className="mt-4 font-tamil text-sm text-gold-soft/70">
          {STORY.bride.tamil} · {STORY.groom.tamil}
        </p>

        <div data-reveal className="mt-10">
          <Ornament />
        </div>

        <p data-reveal className="mt-10 font-serif text-[clamp(1.4rem,3vw,2.2rem)] font-light italic text-cream/90">
          are getting married.
        </p>

        <p data-reveal className="mt-4 border border-gold/35 px-6 py-2.5 font-tamil text-[10px] tracking-[0.45em] text-gold-soft uppercase md:text-xs">
          {STORY.wedding.date}
        </p>

        <p data-reveal className="mt-10 max-w-lg font-serif text-base leading-relaxed font-light text-cream/55 italic md:text-lg">
          {STORY.loveLine}
        </p>
      </div>
    </section>
  );
}
