class MusicEngine {
  private audio: HTMLAudioElement | null = null;

  private subscribers: ((playing: boolean) => void)[] = [];

  private initialized = false;
  private unlocked = false;
  private unlocking = false;
  private listenersAttached = false;

  playing = false;

  /**
   * Subscribe to music state changes
   */
  onChange(callback: (playing: boolean) => void) {
    this.subscribers.push(callback);

    // Immediately provide current state
    callback(this.playing);

    return () => {
      this.subscribers = this.subscribers.filter(
        (item) => item !== callback
      );
    };
  }

  /**
   * Notify subscribers
   */
  private emit() {
    this.subscribers.forEach((callback) => {
      callback(this.playing);
    });
  }

  /**
   * Initialize audio
   */
  private init() {
    if (this.initialized && this.audio) {
      return;
    }

    this.audio = new Audio();

    this.audio.src = "/music/music.mp3";

    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = 0.65;

    /*
     * Mobile browser support
     */
    this.audio.setAttribute("playsinline", "");
    this.audio.setAttribute("webkit-playsinline", "");

    /*
     * Audio started
     */
    this.audio.addEventListener("play", () => {
      this.playing = true;
      this.unlocked = true;

      this.removeUnlockListeners();

      this.emit();
    });

    /*
     * Audio actually playing
     */
    this.audio.addEventListener("playing", () => {
      this.playing = true;
      this.unlocked = true;

      this.removeUnlockListeners();

      this.emit();
    });

    /*
     * Audio paused
     */
    this.audio.addEventListener("pause", () => {
      this.playing = false;
      this.emit();
    });

    /*
     * Audio ended
     */
    this.audio.addEventListener("ended", () => {
      this.playing = false;
      this.emit();
    });

    /*
     * Audio error
     */
    this.audio.addEventListener("error", () => {
      console.error(
        "Music could not be loaded.",
        this.audio?.error
      );

      this.playing = false;

      this.emit();
    });

    this.initialized = true;
  }

  /**
   * Start music
   */
  async start(): Promise<boolean> {
    this.init();

    if (!this.audio) {
      return false;
    }

    /*
     * Prevent multiple play() calls at the same time
     */
    if (this.unlocking) {
      return false;
    }

    /*
     * Already playing
     */
    if (!this.audio.paused) {
      this.playing = true;
      this.unlocked = true;

      this.emit();

      return true;
    }

    this.unlocking = true;

    try {
      /*
       * Make sure the audio element is loaded
       */
      if (this.audio.readyState === 0) {
        this.audio.load();
      }

      await this.audio.play();

      this.playing = true;
      this.unlocked = true;

      this.removeUnlockListeners();

      this.emit();

      return true;
    } catch (error) {
      /*
       * Browser blocked autoplay.
       */
      console.warn(
        "Music autoplay was blocked. Waiting for user interaction."
      );

      this.playing = false;

      this.emit();

      this.attachUnlockListeners();

      return false;
    } finally {
      this.unlocking = false;
    }
  }

  /**
   * Pause music
   */
  pause() {
    if (!this.audio) {
      return;
    }

    this.audio.pause();

    this.playing = false;

    this.emit();
  }

  /**
   * Toggle music
   */
  async toggle() {
    if (this.playing) {
      this.pause();
    } else {
      await this.start();
    }
  }

  /**
   * Change volume
   */
  setVolume(volume: number) {
    this.init();

    if (!this.audio) {
      return;
    }

    const safeVolume = Math.max(
      0,
      Math.min(1, volume)
    );

    this.audio.volume = safeVolume;
  }

  /**
   * Try autoplay when website loads
   */
  async autoStart() {
    this.init();

    if (this.unlocked) {
      return;
    }

    await this.start();
  }

  /**
   * Attach listeners for the first user interaction
   */
  private attachUnlockListeners() {
    if (this.listenersAttached || this.unlocked) {
      return;
    }

    this.listenersAttached = true;

    const unlock = () => {
      if (this.unlocked) {
        return;
      }

      void this.start();
    };

    /*
     * Touch / pointer
     */
    window.addEventListener(
      "pointerdown",
      unlock,
      {
        once: true,
        passive: true,
      }
    );

    /*
     * Mobile fallback
     */
    window.addEventListener(
      "touchstart",
      unlock,
      {
        once: true,
        passive: true,
      }
    );

    /*
     * Normal mouse click
     */
    window.addEventListener(
      "click",
      unlock,
      {
        once: true,
      }
    );

    /*
     * Scrolling
     */
    window.addEventListener(
      "scroll",
      unlock,
      {
        once: true,
        passive: true,
      }
    );

    /*
     * Mouse wheel
     */
    window.addEventListener(
      "wheel",
      unlock,
      {
        once: true,
        passive: true,
      }
    );

    /*
     * Keyboard
     */
    window.addEventListener(
      "keydown",
      unlock,
      {
        once: true,
      }
    );
  }

  /**
   * Remove unlock listeners
   *
   * The listeners use once:true, so the browser removes
   * them after the first event. This only resets our flag.
   */
  private removeUnlockListeners() {
    this.listenersAttached = false;
  }
}

export const music = new MusicEngine();