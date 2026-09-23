import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";



export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80]"
    >
      {/* Film grain */}
      <div className="grain-layer opacity-[0.045]" />

      {/* Cinematic vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_center,
            transparent_25%,
            rgba(12,8,18,0.28)_55%,
            rgba(8,5,12,0.82)_100%
          )]
          opacity-80
        "
      />

      {/* Warm cinematic glow */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_50%_35%,
            rgba(222,91,48,0.08),
            transparent_55%
          )]
        "
      />
    </div>
  );
}


/* ────────────────────────────────────────────────────────────
   Floating dust particles
   ──────────────────────────────────────────────────────────── */

export function DustParticles({
  count = 22,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const motes = Array.from({ length: count });

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {motes.map((_, i) => {
        const left = (i * 37.5 + 9) % 100;
        const top = 15 + ((i * 53.7) % 75);
        const size = 2.5 + ((i * 7.3) % 5);

        return (
          <span
            key={i}
            className="dust-mote"
            style={
              {
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                "--dur": `${9 + ((i * 3.1) % 9)}s`,
                "--del": `${-((i * 1.7) % 12)}s`,
                "--op": 0.25 + ((i * 13.7) % 35) / 100,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}


/* ────────────────────────────────────────────────────────────
   Scroll progress hairline
   ──────────────────────────────────────────────────────────── */

export function ProgressBar() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",

      onUpdate: (self) => {
        if (bar.current) {
          bar.current.style.transform =
            `scaleX(${self.progress})`;
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      className="
        fixed
        inset-x-0
        top-0
        z-[70]
        h-[3px]
        bg-transparent
      "
    >
      <div
        ref={bar}
        className="
          h-full
          w-full
          origin-left
          scale-x-0
          bg-gradient-to-r
          from-[#8E2630]
          via-[#F1C96A]
          to-[#D85A38]
        "
      />
    </div>
  );
}


/* ════════════════════════════════════════════════════════════
   PRELOADER

   Touch / Click to Open
   ════════════════════════════════════════════════════════════ */

export function Preloader({
  onDone,
}: {
  onDone: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  const [leaving, setLeaving] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  /* ────────────────────────────────────────────────────────────
     INTRO ANIMATION
  ──────────────────────────────────────────────────────────── */

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /* Horizontal cinematic line */
      tl.fromTo(
        ".pl-line",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.15
      )

        /* Small heading */
        .fromTo(
          ".pl-word",
          {
            autoAlpha: 0,
            y: 16,
            filter: "blur(8px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.18,
            duration: 0.9,
            ease: "power2.out",
          },
          0.25
        )

        /* Poster glow */
        .fromTo(
          ".pl-glow",
          {
            opacity: 0,
            scale: 0.7,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
          },
          0.2
        )

        /* Decorative ornament */
        .fromTo(
          ".pl-ornament",
          {
            autoAlpha: 0,
            scale: 0.65,
            rotate: -15,
          },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          0.5
        );

      /*
       * IMPORTANT:
       * No automatic exit here.
       *
       * Previously the preloader automatically called:
       * setLeaving(true)
       *
       * Now it waits for user interaction.
       */
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, []);


  /* ────────────────────────────────────────────────────────────
     OPEN ON TOUCH / CLICK
  ──────────────────────────────────────────────────────────── */

  const handleOpen = () => {
    if (leaving) return;

    setIsPressed(true);
    setLeaving(true);
  };


  /* ────────────────────────────────────────────────────────────
     KEYBOARD SUPPORT
  ──────────────────────────────────────────────────────────── */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" ||
        event.key === " " ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        handleOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [leaving]);


  /* ────────────────────────────────────────────────────────────
     EXIT ANIMATION
  ──────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!leaving) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /* Slight zoom before opening */
      tl.to(root.current, {
        scale: 1.035,
        duration: 0.65,
        ease: "power2.inOut",
      })

        /* Fade cinematic layers */
        .to(
          ".pl-content",
          {
            autoAlpha: 0,
            y: -25,
            duration: 0.45,
            ease: "power2.in",
          },
          0
        )

        /* Glow expands */
        .to(
          ".pl-glow",
          {
            scale: 1.5,
            opacity: 0,
            duration: 0.7,
            ease: "power2.in",
          },
          0
        )

        /* Final fade */
        .to(
          root.current,
          {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut",

            onComplete: () => {
              document.documentElement.style.overflow = "";
              onDone();
            },
          },
          0.2
        );
    }, root);

    return () => ctx.revert();
  }, [leaving, onDone]);


  /* ────────────────────────────────────────────────────────────
     UI
  ──────────────────────────────────────────────────────────── */

  return (
    <div
      ref={root}
      role="button"
      tabIndex={0}
      aria-label="Touch to open wedding invitation"
      onClick={handleOpen}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={handleOpen}
      className={`
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#100E1C]
        select-none
        touch-manipulation
        cursor-pointer
        transition-transform
        duration-300
        ${isPressed ? "scale-[0.995]" : ""}
      `}
    >

      {/* ═══════════════════════════════════════════════════════
          BASE GRADIENT
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_50%_38%,
            #C94B32_0%,
            #7E2530_18%,
            #421827_42%,
            #201321_68%,
            #100E1C_100%
          )]
        "
      />


      {/* ═══════════════════════════════════════════════════════
          WARM SUNSET LIGHT
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pl-glow
          pointer-events-none
          absolute
          left-1/2
          top-[36%]
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#E8783B]/20
          opacity-0
          blur-[80px]
          sm:h-[420px]
          sm:w-[420px]
        "
      />


      {/* ═══════════════════════════════════════════════════════
          RED / ORANGE LIGHT
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[30%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#C94B32]/10
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[45%]
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#E8793B]/10
          blur-[100px]
        "
      />


      {/* ═══════════════════════════════════════════════════════
          DARK VIGNETTE
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_center,
            transparent_20%,
            rgba(10,7,14,0.25)_55%,
            rgba(7,5,10,0.9)_100%
          )]
        "
      />


      {/* ═══════════════════════════════════════════════════════
          OUTER FRAME
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-4
          border
          border-[#F1C96A]/30
          sm:inset-6
          md:inset-8
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-7
          border
          border-[#FFF0C7]/10
          sm:inset-9
          md:inset-12
        "
      />


      {/* ═══════════════════════════════════════════════════════
          CORNER ORNAMENTS
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          left-7
          top-7
          h-10
          w-10
          border-l
          border-t
          border-[#F1C96A]/45
          sm:left-9
          sm:top-9
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-7
          top-7
          h-10
          w-10
          border-r
          border-t
          border-[#F1C96A]/45
          sm:right-9
          sm:top-9
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          left-7
          h-10
          w-10
          border-b
          border-l
          border-[#F1C96A]/45
          sm:bottom-9
          sm:left-9
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          right-7
          h-10
          w-10
          border-b
          border-r
          border-[#F1C96A]/45
          sm:right-9
          sm:bottom-9
        "
      />


      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pl-content
          relative
          z-10
          flex
          w-full
          max-w-[720px]
          flex-col
          items-center
          px-7
          text-center
        "
      >

        {/* ═════════════════════════════════════════════════════
            TOP ORNAMENT
        ═════════════════════════════════════════════════════ */}

        <div
          className="
            pl-ornament
            mb-8
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-[#F1C96A]/40
            opacity-0
            sm:mb-10
            sm:h-20
            sm:w-20
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#F1C96A]/25
              sm:h-14
              sm:w-14
            "
          >
            <span
              className="
                text-xl
                text-[#F1C96A]
                sm:text-2xl
              "
            >
              ✦
            </span>
          </div>
        </div>


        {/* ═════════════════════════════════════════════════════
            SMALL TITLE
        ═════════════════════════════════════════════════════ */}

        <p
          className="
            pl-word
            max-w-[330px]
            font-tamil
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.34em]
            text-[#F1C96A]
            sm:max-w-none
            sm:text-[10px]
            sm:tracking-[0.5em]
          "
        >
          An invitation · twenty years in the making
        </p>


        {/* ═════════════════════════════════════════════════════
            GOLD DIVIDER
        ═════════════════════════════════════════════════════ */}

        <div
          className="
            relative
            mt-7
            flex
            w-full
            max-w-[220px]
            items-center
            justify-center
            sm:mt-9
            sm:max-w-[280px]
          "
        >

          {/* faint line */}
          <span
            className="
              absolute
              left-0
              right-0
              h-px
              bg-[#F1C96A]/15
            "
          />

          {/* animated line */}
          <div
            className="
              pl-line
              relative
              z-10
              h-px
              w-full
              origin-center
              scale-x-0
              bg-gradient-to-r
              from-transparent
              via-[#F1C96A]
              to-transparent
            "
          />

          {/* center diamond */}
          <span
            className="
              absolute
              left-1/2
              z-20
              h-2
              w-2
              -translate-x-1/2
              rotate-45
              border
              border-[#F1C96A]
              bg-[#7E2530]
            "
          />
        </div>


        {/* ═════════════════════════════════════════════════════
            MAIN TITLE
        ═════════════════════════════════════════════════════ */}

        <p
          className="
            pl-word
            mt-8
            font-serif
            text-[clamp(2rem,8vw,3.8rem)]
            font-light
            italic
            leading-[1.1]
            tracking-[-0.02em]
            text-[#FFF0C7]
            drop-shadow-[0_4px_25px_rgba(0,0,0,0.55)]
            sm:mt-10
          "
        >
          Let us tell you a story.
        </p>


        {/* ═════════════════════════════════════════════════════
            SUBTITLE
        ═════════════════════════════════════════════════════ */}

        <p
          className="
            pl-word
            mt-5
            max-w-[310px]
            font-serif
            text-xs
            leading-relaxed
            text-[#FFF0C7]/55
            sm:text-sm
          "
        >
          A story that began long before
          <br />
          we knew where it would lead.
        </p>


        {/* ═════════════════════════════════════════════════════
            SMALL GOLD ORNAMENT
        ═════════════════════════════════════════════════════ */}

        <div
          className="
            pl-word
            mt-8
            flex
            items-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-[#F1C96A]/40" />

          <span className="text-[10px] text-[#F1C96A]">
            ✦
          </span>

          <span className="h-px w-8 bg-[#F1C96A]/40" />
        </div>


        {/* ═════════════════════════════════════════════════════
            TOUCH TO OPEN
        ═════════════════════════════════════════════════════ */}

        <div
          className="
            pl-word
            mt-12
            flex
            flex-col
            items-center
            gap-3
            sm:mt-14
          "
        >

          {/* Finger / Touch icon */}
          <div
            className="
              touch-pulse
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#F1C96A]/40
              bg-[#F1C96A]/5
            "
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#F1C96A]"
            >
              <path
                d="M12 11V5.5C12 4.67 12.67 4 13.5 4C14.33 4 15 4.67 15 5.5V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M15 10V6.5C15 5.67 15.67 5 16.5 5C17.33 5 18 5.67 18 6.5V12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M18 10V8.5C18 7.67 18.67 7 19.5 7C20.33 7 21 7.67 21 8.5V14.5C21 18.09 18.09 21 14.5 21H12.5C10.29 21 8.18 20.01 6.78 18.3L4.5 15.5C3.95 14.82 4.05 13.83 4.73 13.28C5.41 12.73 6.4 12.83 6.95 13.51L9 16V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>


          {/* Text */}
          <p
            className="
              font-tamil
              text-[9px]
              font-medium
              uppercase
              tracking-[0.42em]
              text-[#F1C96A]
              sm:text-[10px]
              sm:tracking-[0.5em]
            "
          >
            Touch to open
          </p>


          {/* Small instruction */}
          <p
            className="
              text-[8px]
              tracking-[0.18em]
              text-[#FFF0C7]/35
            "
          >
            Tap anywhere to begin
          </p>

        </div>

      </div>


      {/* ═══════════════════════════════════════════════════════
          BOTTOM REEL INFORMATION
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pl-word
          absolute
          bottom-9
          left-1/2
          z-10
          -translate-x-1/2
          whitespace-nowrap
          text-center
          sm:bottom-10
        "
      >
        <p
          className="
            font-tamil
            text-[9px]
            font-medium
            uppercase
            tracking-[0.35em]
            text-[#FFF0C7]/45
            sm:text-[10px]
            sm:tracking-[0.45em]
          "
        >
          Reel 01 · Kumbakonam · 2004
        </p>
      </div>


      {/* ═══════════════════════════════════════════════════════
          FILM STYLE SIDE MARK
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-full
          w-px
          -translate-x-1/2
          bg-gradient-to-b
          from-transparent
          via-[#F1C96A]/5
          to-transparent
        "
      />


      {/* ═══════════════════════════════════════════════════════
          SUBTLE TOP GLOW
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[20%]
          bg-gradient-to-b
          from-[#C94B32]/10
          to-transparent
        "
      />


      {/* ═══════════════════════════════════════════════════════
          SUBTLE BOTTOM GLOW
      ═══════════════════════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[25%]
          bg-gradient-to-t
          from-[#08060D]/70
          to-transparent
        "
      />


      {/* ═══════════════════════════════════════════════════════
          INLINE ANIMATION STYLES
      ═══════════════════════════════════════════════════════ */}

      <style>{`
        .touch-pulse {
          animation: touchPulse 2s ease-in-out infinite;
        }

        @keyframes touchPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow:
              0 0 0 0 rgba(241, 201, 106, 0.12);
          }

          50% {
            transform: scale(1.08);
            box-shadow:
              0 0 0 12px rgba(241, 201, 106, 0);
          }
        }
      `}</style>

    </div>
  );
}
