import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { GrainOverlay, Preloader, ProgressBar } from "./components/chrome";
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

  /* butter-smooth scroll, wired into GSAP */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.095, wheelMultiplier: 1 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-coal">
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <GrainOverlay />
      <ProgressBar />
      <MusicToggle />

      {/* the film */}
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
