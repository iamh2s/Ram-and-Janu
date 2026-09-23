import { useLayoutEffect, useRef, useState } from "react";
import { Heart, MoveRight } from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { STORY, type FrameItem } from "../data/story";

/* ═══════════════════════════════════════════════════════════
   FRAMES FROM THE STORY — a film strip you scroll through
   ═══════════════════════════════════════════════════════════ */
export default function GalleryStrip() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [extra, setExtra] = useState(0);

  /* measure how far the strip must travel */
  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setExtra(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const t1 = setTimeout(measure, 500);
    const t2 = setTimeout(() => {
      measure();
      ScrollTrigger.refresh();
    }, 1500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useLayoutEffect(() => {
    if (extra <= 0) return;
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        x: -extra,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [extra]);

  return (
    <section
      ref={root}
      className="relative bg-coal"
      style={{ height: `calc(100svh + ${extra + 200}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* film band edges */}
        <div aria-hidden className="absolute inset-x-0 top-0 z-20 h-9 border-b border-cream/5 bg-[#080503]">
          <div className="film-holes mx-auto mt-3 w-[96%] opacity-70" />
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-9 border-t border-cream/5 bg-[#080503]">
          <div className="film-holes mx-auto mt-3 w-[96%] opacity-70" />
        </div>

        <div
          ref={track}
          className="flex w-max items-center gap-7 pr-[16vw] pl-[7vw] will-change-transform md:gap-12"
        >
          {/* intro cell */}
          <div className="w-[82vw] shrink-0 md:w-[40vw] lg:w-[34vw]">
            <p className="font-tamil text-[10px] tracking-[0.5em] text-gold/80 uppercase">
              The Gallery · 2004 — 2027
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] text-cream">
              Frames
              <br />
              from the
              <br />
              <span className="text-outline-gold uppercase">story</span>
            </h2>
            <p className="mt-6 max-w-sm font-serif text-lg leading-relaxed font-light text-cream/60 italic">
              Every photograph is a doorway. Step through slowly — some of these
              waited twenty years to be seen.
            </p>
            <p className="mt-8 flex items-center gap-3 font-tamil text-[10px] tracking-[0.4em] text-gold-soft/80 uppercase">
              Keep scrolling <MoveRight className="h-4 w-4" strokeWidth={1.5} />
            </p>
          </div>

          {STORY.frames.map((f, i) => (
            <Frame key={f.caption} frame={f} index={i} />
          ))}

          {/* end cell */}
          <div className="flex w-[70vw] shrink-0 items-center justify-center md:w-[34vw]">
            <p className="max-w-xs text-center font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-snug font-light italic text-cream/75">
              “…and the best frames are still
              <Heart className="mx-2 inline h-5 w-5 text-gold" strokeWidth={1.5} />
              being made.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Frame({ frame, index }: { frame: FrameItem; index: number }) {
  return (
    <figure className="relative w-[78vw] max-w-[540px] shrink-0 md:w-[46vw] md:max-w-[620px]">
      <div className="relative border border-cream/12 bg-[#16100a] p-2.5 pb-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        <img
          src={frame.src}
          alt={`${frame.caption} — ${frame.year}`}
          className="h-[40svh] w-full object-cover md:h-[54svh]"
          style={frame.pos ? { objectPosition: frame.pos } : undefined}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="absolute top-4 right-4 bg-coal/70 px-2 py-0.5 font-tamil text-[9px] tracking-[0.3em] text-gold-soft uppercase backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")} / {String(STORY.frames.length).padStart(2, "0")}
        </span>
        <figcaption className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-4">
          <span className="font-hand text-xl leading-none text-cream/90">{frame.caption}</span>
          <span className="text-right font-tamil text-[9px] leading-relaxed tracking-[0.3em] text-gold/75 uppercase">
            {frame.year} · {frame.place}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
