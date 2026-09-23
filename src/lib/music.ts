class MusicEngine {
  private audio: HTMLAudioElement | null = null;
  private subs: ((playing: boolean) => void)[] = [];

  playing = false;

  onChange(cb: (playing: boolean) => void) {
    this.subs.push(cb);

    return () => {
      this.subs = this.subs.filter((item) => item !== cb);
    };
  }

  private emit() {
    this.subs.forEach((cb) => cb(this.playing));
  }

  private init() {
    if (this.audio) return;

    this.audio = new Audio("/music/music.mp3");

    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = 0.65;

    this.audio.addEventListener("play", () => {
      this.playing = true;
      this.emit();
    });

    this.audio.addEventListener("pause", () => {
      this.playing = false;
      this.emit();
    });

    this.audio.addEventListener("ended", () => {
      this.playing = false;
      this.emit();
    });
  }

  async start() {
    this.init();

    if (!this.audio) return;

    try {
      await this.audio.play();

      this.playing = true;
      this.emit();
    } catch (error) {
      console.warn(
        "Music autoplay was blocked. User interaction is required.",
        error
      );

      this.playing = false;
      this.emit();
    }
  }

  pause() {
    if (!this.audio) return;

    this.audio.pause();

    this.playing = false;
    this.emit();
  }

  toggle() {
    if (this.playing) {
      this.pause();
    } else {
      void this.start();
    }
  }

  setVolume(volume: number) {
    if (!this.audio) return;

    this.audio.volume = Math.max(0, Math.min(1, volume));
  }
}

export const music = new MusicEngine();