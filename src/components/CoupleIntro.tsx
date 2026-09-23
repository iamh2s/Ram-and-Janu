import { Briefcase, MapPin } from "lucide-react";
import { IMG, STORY } from "../data/story";
import { Ornament, SectionTag, useReveal } from "./bits";

/* ═══════════════════════════════════════════════════════════
   THE TWO OF THEM — daughter of, son of, quotes
   ═══════════════════════════════════════════════════════════ */
export default function CoupleIntro() {
  const root = useReveal<HTMLElement>();

  return (
    <section ref={root} className="paper-night relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="text-center">
          <SectionTag>Before Forever · The Two of Them</SectionTag>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] leading-tight text-cream">
            Two people, one long story
          </h2>
          <div className="mt-8">
            <Ornament />
          </div>
        </div>

        <div className="mt-20 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-10 lg:gap-16">
          <PersonCard
            img={IMG.brideRoad}
            alt="Meera in an elegant saree at a misty railway platform"
            name={STORY.bride.name}
            relation={`Daughter of ${STORY.bride.parents}`}
            hometown={STORY.bride.hometown}
            profession={STORY.bride.profession}
            quote={STORY.bride.quote}
            drift="md:-translate-y-6"
          />
          <PersonCard
            img={IMG.groomRoad}
            alt="Karthik on a rooftop terrace at dusk above the city"
            name={STORY.groom.name}
            relation={`Son of ${STORY.groom.parents}`}
            hometown={STORY.groom.hometown}
            profession={STORY.groom.profession}
            quote={STORY.groom.quote}
            drift="md:translate-y-10"
          />
        </div>
      </div>
    </section>
  );
}

function PersonCard({
  img,
  alt,
  name,
  relation,
  hometown,
  profession,
  quote,
  drift,
}: {
  img: string;
  alt: string;
  name: string;
  relation: string;
  hometown: string;
  profession: string;
  quote: string;
  drift: string;
}) {
  return (
    <article
      data-reveal
      className={`group relative mx-auto w-full max-w-md ${drift}`}
    >
      <div className="relative border border-gold/25 bg-[#211710]/85 p-4 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.8)] md:p-5">
        <div className="arch overflow-hidden">
          <img
            src={img}
            alt={alt}
            className="aspect-[3/3.6] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="px-2 pt-8 pb-4 text-center md:px-4">
          <h3 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight text-cream">
            {name}
          </h3>
          <p className="mt-2 font-serif text-base font-light text-gold-soft/90 italic">
            {relation}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-tamil text-[10px] tracking-[0.25em] text-cream/60 uppercase">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold/70" strokeWidth={1.6} />
              {hometown}
            </span>
            <span className="hidden h-3 w-px bg-gold/25 sm:block" />
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-gold/70" strokeWidth={1.6} />
              {profession}
            </span>
          </div>

          <p className="mx-auto mt-6 max-w-xs border-t border-gold/20 pt-6 font-serif text-lg leading-relaxed font-light text-cream/80 italic">
            “{quote}”
          </p>
        </div>
      </div>
    </article>
  );
}
