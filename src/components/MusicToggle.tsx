import { useEffect, useState } from "react";
import { VolumeX } from "lucide-react";
import { music } from "../lib/music";

/* ═══════════════════════════════════════════════════════════
   Floating score control.
   Browsers require a first touch for sound — so the music
   quietly listens: the moment the visitor taps, clicks or
   presses a key anywhere, the score fades in. The visitor
   can always silence it here.
   ═══════════════════════════════════════════════════════════ */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    music.onChange(setPlaying);

    /* attempt immediately — succeeds where autoplay is allowed */
    music.start();

    /* otherwise begin at the very first gesture */
    const begin = () => {
      setTouched(true);
      music.start();
    };
    window.addEventListener("pointerdown", begin, { once: true, passive: true });
    window.addEventListener("keydown", begin, { once: true });

    return () => {
      window.removeEventListener("pointerdown", begin);
      window.removeEventListener("keydown", begin);
    };
  }, []);

  return (
    <button
      onClick={() => {
        setTouched(true);
        music.toggle();
      }}
      aria-label={playing ? "Mute the music" : "Play the music"}
      aria-pressed={playing}
      className="group fixed right-5 z-[90] flex items-center gap-2.5 md:right-7"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      {!touched && !playing && (
        <span className="animate-pulse border border-gold/35 bg-coal/80 px-3 py-1.5 font-tamil text-[9px] tracking-[0.35em] text-gold-soft uppercase backdrop-blur-sm">
          Touch for music
        </span>
      )}
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
          playing
            ? "border-gold/70 bg-coal/70 shadow-[0_0_22px_rgba(198,161,91,0.35)]"
            : "border-gold/40 bg-coal/70 group-hover:border-gold/70"
        }`}
      >
        {playing ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            <span className="eq-bar w-[3px] rounded-full bg-gold-soft" style={{ animationDelay: "0s" }} />
            <span className="eq-bar w-[3px] rounded-full bg-gold-soft" style={{ animationDelay: "0.22s" }} />
            <span className="eq-bar w-[3px] rounded-full bg-gold-soft" style={{ animationDelay: "0.44s" }} />
          </span>
        ) : (
          <VolumeX className="h-4.5 w-4.5 text-gold-soft/80" strokeWidth={1.6} />
        )}
      </span>
    </button>
  );
}
