import { useEffect, useState } from "react";
import { music } from "../lib/music";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = music.onChange((isPlaying) => {
      setPlaying(isPlaying);
    });

    return unsubscribe;
  }, []);

  const handleToggle = () => {
    void music.toggle();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      aria-pressed={playing}
      className="music-toggle"
    >
      <span className={playing ? "music-icon playing" : "music-icon"}>
        {playing ? "♫" : "♪"}
      </span>

      <span className="music-label">
        {playing ? "Music On" : "Music Off"}
      </span>
    </button>
  );
}