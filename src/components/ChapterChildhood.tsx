import { useLayoutEffect, useRef } from "react";
import { Bell, Bike, BookOpen, Check, Pencil, School } from "lucide-react";
import { gsap } from "../lib/gsap";
import { IMG, STORY } from "../data/story";
import { DustParticles } from "./chrome";
import { Letterbox, SectionTag, useReveal } from "./bits";

/* ═══════════════════════════════════════════════════════════
   CHAPTER I — through the gate, into the childhood years
   The prologue pushes the camera toward the gate; this chapter
   opens inside the gate's shadow and steps out into the first
   memory — so the establishing photograph is shown only once.
   ═══════════════════════════════════════════════════════════ */
export default function ChapterChildhood() {
  const root = useRef<HTMLDivElement>(null);
  const album = useReveal<HTMLDivElement>();

  /* Part A — passing through the arch's shadow into the memory */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".cc-stage-wrap",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        })
        .fromTo(
          ".cc-pass",
          { autoAlpha: 1 },
          { autoAlpha: 0.14, duration: 0.42 },
          0.04
        )
        .fromTo(
          ".cc-kids",
          { scale: 1.16, filter: "brightness(0.5) blur(7px)" },
          { scale: 1, filter: "brightness(1) blur(0px)", duration: 0.5 },
          0.02
        )
        .fromTo(
          ".cc-sun",
          { scale: 0.7, opacity: 0.25 },
          { scale: 1.15, opacity: 0.65, duration: 0.4 },
          0.06
        )
        .fromTo(
          ".cc-caption",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.14 },
          0.66
        )
        .fromTo(
          ".cc-schoolname",
          { autoAlpha: 0, letterSpacing: "0.6em" },
          { autoAlpha: 1, letterSpacing: "0.45em", duration: 0.16 },
          0.76
        );
    }, root);
    return () => ctx.revert();
  }, []);

  /* Part B — gentle parallax across the scrapbook */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.to(el, {
          y: -parseFloat(el.dataset.drift || "20"),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, album);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root}>
      {/* ── A · Through the gate ─────────────────────────── */}
      <div className="cc-stage-wrap relative h-[300vh] bg-coal">
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* the first memory, beneath the gate's shadow */}
          <div className="cc-kids absolute inset-0 will-change-transform">
            <img
              src={IMG.gate}
              alt="A young boy and girl in 2000s school uniforms walking side by side through their old school gate"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* the shadow of the archway we pass through */}
          <div className="cc-pass pointer-events-none absolute inset-0 z-10 will-change-[opacity]">
            <div className="absolute inset-0 bg-coal/85" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 46% at 50% 58%, rgba(226,198,142,0.4), transparent 72%)",
                maskImage:
                  "radial-gradient(58% 44% at 50% 58%, black, transparent 96%)",
                WebkitMaskImage:
                  "radial-gradient(58% 44% at 50% 58%, black, transparent 96%)",
              }}
            />
            {/* archway silhouette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(72% 88% at 50% 118%, transparent 34%, rgba(13,8,5,0.92) 62%)",
              }}
            />
          </div>

          {/* sunlight blooming through */}
          <div className="cc-sun pointer-events-none absolute inset-0 z-10 opacity-25">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(46% 34% at 56% 52%, rgba(240,220,174,0.35), transparent 70%)",
              }}
            />
          </div>

          <DustParticles count={18} className="z-20" />
          <Letterbox />

          <div className="absolute inset-0 z-[5] bg-gradient-to-t from-coal/70 via-transparent to-coal/40" />

          <div className="cc-caption absolute inset-x-0 bottom-[14vh] z-30 flex flex-col items-center gap-4 px-6 text-center opacity-0">
            <SectionTag>Chapter I · The School Gate · 2004</SectionTag>
            <p className="max-w-xl font-serif text-[clamp(1.4rem,3vw,2.4rem)] leading-snug font-light italic text-cream">
              “Some first meetings don’t feel like beginnings at all.”
            </p>
          </div>

          <p className="cc-schoolname absolute inset-x-0 top-[11vh] z-30 px-6 text-center font-tamil text-[10px] tracking-[0.45em] text-gold-soft/80 uppercase opacity-0 md:text-xs">
            {STORY.school.name} · {STORY.school.place}
          </p>
        </div>
      </div>

      {/* ── B · The scrapbook — photographs on an old desk ── */}
      <div ref={album} className="paper-night relative overflow-hidden py-24 md:py-36">
        {/* doodles */}
        <Bell aria-hidden className="absolute top-24 left-[6%] h-7 w-7 -rotate-12 text-gold/25" strokeWidth={1.4} />
        <Bike aria-hidden className="absolute right-[8%] bottom-40 h-9 w-9 rotate-6 text-gold/25" strokeWidth={1.2} />
        <BookOpen aria-hidden className="absolute top-[46%] left-[3%] hidden h-8 w-8 rotate-6 text-gold/20 md:block" strokeWidth={1.2} />

        <div className="mx-auto max-w-6xl px-6">
          <div data-reveal>
            <SectionTag>Loose pages from memory</SectionTag>
            <h2 className="mt-6 text-center font-display text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[1.05] text-cream">
              A small world of bells,
              <br />
              benches <span className="font-serif italic text-gold-soft">&amp;</span> bicycles
            </h2>
          </div>

          {/* Polaroids + keepsakes */}
          <div className="mt-20 grid items-start gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
            <figure data-reveal data-drift="26" className="tape polaroid relative -rotate-3 p-3 pb-16">
              <span className="absolute -top-3 -right-3 z-20 rotate-6 bg-maroon px-2.5 py-1 font-tamil text-[10px] tracking-[0.25em] text-cream uppercase shadow-md">
                {STORY.memoryYears[0]}
              </span>
              <img
                src={IMG.window}
                alt="The two children sharing a textbook on a bench beside their classroom window"
                className="h-60 w-full object-cover md:h-64"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-4 text-center font-hand text-xl text-[#5b4632]">
                the window seat was always hers
              </figcaption>
            </figure>

            <figure data-reveal data-drift="52" className="tape polaroid relative rotate-2 p-3 pb-16 md:mt-14">
              <span className="absolute -top-3 -right-3 z-20 -rotate-3 bg-maroon px-2.5 py-1 font-tamil text-[10px] tracking-[0.25em] text-cream uppercase shadow-md">
                {STORY.memoryYears[1]}
              </span>
              <img
                src={IMG.gate}
                alt="The two children walking through the school gate in the morning light"
                className="h-60 w-full object-cover object-[50%_35%] md:h-64"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-4 text-center font-hand text-xl text-[#5b4632]">
                he walked slower so she’d keep up
              </figcaption>
            </figure>

            {/* the attendance register — a keepsake instead of a repeat photo */}
            <figure data-reveal data-drift="34" className="tape polaroid relative -rotate-2 p-3 pb-16">
              <span className="absolute -top-3 -right-3 z-20 rotate-3 bg-maroon px-2.5 py-1 font-tamil text-[10px] tracking-[0.25em] text-cream uppercase shadow-md">
                {STORY.memoryYears[2]}
              </span>
              <div className="relative flex h-60 w-full flex-col overflow-hidden bg-[#f2e8cd] px-4 py-3 md:h-64">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(transparent 0 24px, rgba(107,74,50,0.28) 24px 25px)",
                  }}
                />
                <p className="relative text-center font-tamil text-[8px] tracking-[0.3em] text-[#6b4a32] uppercase">
                  Attendance Register · Class III
                </p>
                <p className="relative mt-0.5 text-center font-serif text-[13px] font-medium text-[#4c3a29]">
                  {STORY.school.name}
                </p>
                <div className="relative mt-4 space-y-[13px]">
                  <p className="flex items-baseline justify-between font-hand text-lg leading-[25px] text-[#4c3a29]">
                    <span>3. {STORY.groom.short} K.</span>
                    <span className="flex items-center gap-1 text-[#3f5a2e]">
                      present <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  </p>
                  <p className="flex items-baseline justify-between font-hand text-lg leading-[25px] text-[#4c3a29]">
                    <span>4. {STORY.bride.short} S.</span>
                    <span className="flex items-center gap-1 text-[#3f5a2e]">
                      present <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  </p>
                </div>
                <div className="relative mt-auto flex items-end justify-between">
                  <p className="font-hand text-base text-maroon/80">seats 3 &amp; 4 — always together</p>
                  <span className="flex h-11 w-11 rotate-12 items-center justify-center rounded-full border border-[#6b4a32]/50 text-[#6b4a32]/70">
                    <School className="h-4.5 w-4.5" strokeWidth={1.4} />
                  </span>
                </div>
              </div>
              <figcaption className="absolute inset-x-0 bottom-4 text-center font-hand text-xl text-[#5b4632]">
                register entries that never changed
              </figcaption>
            </figure>
          </div>

          {/* Notebook confession — an old page kept too long */}
          <div data-reveal data-drift="16" className="relative mx-auto mt-24 max-w-xl">
            <div className="tape relative rotate-1 border border-gold/25 bg-[#241811] p-8 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.75)] md:p-10">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent 0 30px, rgba(198,161,91,0.14) 30px 31px)",
                }}
              />
              <Pencil aria-hidden className="absolute -top-4 -right-3 h-8 w-8 rotate-[30deg] text-gold/40" strokeWidth={1.4} />
              <p className="relative font-hand text-2xl text-gold-soft">things they never admitted —</p>
              <ul className="relative mt-4 space-y-[9px] font-hand text-[1.35rem] leading-[31px] text-cream/80">
                <li>– saving the window seat before assembly</li>
                <li>– the “extra” pencil he always carried</li>
                <li>– waiting by the gate on heavy-rain days</li>
                <li>– remembering her favourite sweet, every time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
