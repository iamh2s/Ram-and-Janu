class MusicEngine {
  private audio: HTMLAudioElement | null = null;

  private subs: ((playing: boolean) => void)[] = [];

  private unlockListenersAttached = false;
  private unlocked = false;

  playing = false;

  onChange(cb: (playing: boolean) => void) {
    this.subs.push(cb);

    // Immediately give the subscriber the current state
    cb(this.playing);

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

    this.audio.addEventListener("error", (event) => {
      console.error("Music loading error:", event);
      this.playing = false;
      this.emit();
    });
  }

  async start() {
    this.init();

    if (!this.audio) return false;

    try {
      await this.audio.play();

      this.unlocked = true;
      this.removeUnlockListeners();

      this.playing = true;
      this.emit();

      return true;
    } catch (error) {
      console.warn(
        "Music autoplay was blocked. Waiting for user interaction.",
        error
      );

      this.playing = false;
      this.emit();

      this.attachUnlockListeners();

      return false;
    }
  }

  pause() {
    if (!this.audio) return;

    this.audio.pause();

    this.playing = false;
    this.emit();
  }

  async toggle() {
    if (this.playing) {
      this.pause();
    } else {
      await this.start();
    }
  }

  setVolume(volume: number) {
    this.init();

    if (!this.audio) return;

    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Try to start music immediately.
   * If browser blocks autoplay, automatically wait
   * for the first user interaction anywhere on the page.
   */
  async autoStart() {
    this.init();

    if (!this.audio || this.unlocked) return;

    const started = await this.start();

    if (!started) {
      this.attachUnlockListeners();
    }
  }

  /**
   * Listen for the first interaction that can unlock audio.
   */
  private attachUnlockListeners() {
    if (this.unlockListenersAttached || this.unlocked) return;

    this.unlockListenersAttached = true;

    const unlock = () => {
      void this.start();
    };

    window.addEventListener("pointerdown", unlock, {
      once: true,
      passive: true,
    });

    window.addEventListener("touchstart", unlock, {
      once: true,
      passive: true,
    });

    window.addEventListener("keydown", unlock, {
      once: true,
    });
  }

  private removeUnlockListeners() {
    this.unlockListenersAttached = false;
  }
}

export const music = new MusicEngine();