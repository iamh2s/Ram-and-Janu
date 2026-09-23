import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { music } from "./lib/music";

import {
  GrainOverlay,
  Preloader,
  ProgressBar,
} from "./components/chrome";

import MusicToggle from "./components/MusicToggle";

import ChapterOpening from "./components/ChapterOpening";
import ChapterChildhood from "./components/ChapterChildhood";
import ChapterTeenage from "./components/ChapterTeenage";
import ChapterCollege from "./components/ChapterCollege";
import JourneyMap from "./components/JourneyMap";
import ChapterJourneys from "./components/ChapterJourneys";
import ChapterReunion from "./components/ChapterReunion";
import ChapterTransformation from "./components/ChapterTransformation";
import PresentReveal from "./components/PresentReveal";
import CoupleIntro from "./components/CoupleIntro";
import WeddingInvite from "./components/WeddingInvite";
import VenueReveal from "./components/VenueReveal";
import EventTimeline from "./components/EventTimeline";
import GalleryStrip from "./components/GalleryStrip";
import Finale from "./components/Finale";

export default function App() {
  const [ready, setReady] = useState(false);

  /* =========================================================
     MUSIC AUTO START
  ========================================================= */

  useEffect(() => {
    /*
     * Try to start music immediately when the website loads.
     *
     * Desktop browsers that allow autoplay:
     *     → Music starts immediately.
     *
     * Mobile browsers that block autoplay:
     *     → music.ts automatically waits for the first
     *       touch / click / scroll / interaction.
     */
    void music.autoStart();
  }, []);

  /* =========================================================
     LENIS + GSAP SMOOTH SCROLL
  ========================================================= */

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.095,
      wheelMultiplier: 1,
    });

    /*
     * Make Lenis accessible globally if other
     * components need it.
     */
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    /*
     * Connect Lenis with GSAP ScrollTrigger.
     */
    lenis.on("scroll", ScrollTrigger.update);

    /*
     * GSAP ticker
     */
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);

    /*
     * Disable GSAP lag smoothing so Lenis
     * remains perfectly synchronized.
     */
    gsap.ticker.lagSmoothing(0);

    /*
     * Refresh ScrollTrigger after all assets
     * have loaded.
     */
    const onLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", onLoad);

    /*
     * Also refresh once after initial render.
     * This helps mobile browsers where layout
     * dimensions can change after loading.
     */
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    /*
     * Cleanup
     */
    return () => {
      window.removeEventListener("load", onLoad);

      window.clearTimeout(refreshTimer);

      gsap.ticker.remove(raf);

      lenis.destroy();

      /*
       * Remove global Lenis reference
       */
      const win = window as unknown as {
        __lenis?: Lenis;
      };

      delete win.__lenis;
    };
  }, []);

  return (
    <main className="relative bg-coal">
      {/* =====================================================
          PRELOADER
      ===================================================== */}

      {!ready && (
        <Preloader
          onDone={() => {
            setReady(true);
          }}
        />
      )}

      {/* =====================================================
          GLOBAL EFFECTS
      ===================================================== */}

      <GrainOverlay />

      <ProgressBar />

      {/* =====================================================
          MUSIC
      ===================================================== */}

      <MusicToggle />

      {/* =====================================================
          WEDDING STORY
      ===================================================== */}

      <ChapterOpening ready={ready} />

      <ChapterChildhood />

      <ChapterTeenage />

      <ChapterCollege />

      <JourneyMap />

      <ChapterJourneys />

      <ChapterReunion />

      <ChapterTransformation />

      <PresentReveal />

      <CoupleIntro />

      <WeddingInvite />

      <VenueReveal />

      <EventTimeline />

      <GalleryStrip />

      <Finale />
    </main>
  );
}