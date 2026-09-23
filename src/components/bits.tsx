import { useLayoutEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "../lib/gsap";

/* ────────────────────────────────────────────────────────────
   Small caps chapter tag with hairlines
   ──────────────────────────────────────────────────────────── */
export function SectionTag({
  children,
  tone = "gold",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "gold" | "brown";
  className?: string;
}) {
  const line = tone === "gold" ? "bg-gold/50" : "bg-brown/40";
  const text = tone === "gold" ? "text-gold" : "text-brown";
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className={`h-px w-8 md:w-14 ${line}`} />
      <span
        className={`font-tamil text-[10px] font-medium tracking-[0.45em] uppercase md:text-[11px] ${text}`}
      >
        {children}
      </span>
      <span className={`h-px w-8 md:w-14 ${line}`} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Gold ornament divider
   ──────────────────────────────────────────────────────────── */
export function Ornament({ tone = "gold" }: { tone?: "gold" | "brown" }) {
  const line = tone === "gold" ? "from-transparent via-gold/60 to-transparent" : "from-transparent via-brown/50 to-transparent";
  const icon = tone === "gold" ? "text-gold" : "text-brown";
  return (
    <div className="flex items-center justify-center gap-3">
      <span className={`h-px w-16 bg-gradient-to-r md:w-28 ${line}`} />
      <Sparkles className={`h-3.5 w-3.5 ${icon}`} strokeWidth={1.5} />
      <span className={`h-px w-16 bg-gradient-to-r md:w-28 ${line}`} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   useReveal — fade/rise any [data-reveal] children on scroll
   ──────────────────────────────────────────────────────────── */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/* ────────────────────────────────────────────────────────────
   Letterbox bars for cinematic chapters
   ──────────────────────────────────────────────────────────── */
export function Letterbox() {
  return (
    <>
      <div aria-hidden className="absolute inset-x-0 top-0 z-20 h-[6.5vh] bg-coal" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-[6.5vh] bg-coal" />
    </>
  );
}
