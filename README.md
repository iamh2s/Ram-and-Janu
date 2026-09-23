# Ram And Janu — A Love Story in Eight Chapters

A premium, cinematic, scroll-driven South Indian wedding invitation website.
The visitor doesn't just read an invitation — they scroll through the couple's
entire life: two children at a school gate, childhood, teenage years, college,
separate journeys, a reunion, and finally the wedding day itself.

> **An original work.** This experience is inspired only by universal themes —
> nostalgia, school memories, growing up, distance, and reunion. It contains no
> copyrighted scenes, characters, posters, logos, dialogue, music, or visual
> compositions from any film. The score is procedurally generated in the browser
> and is entirely original.

---

## Tech Stack

| Layer        | Technology                                        |
| ------------ | ------------------------------------------------- |
| Framework    | React 19 + Vite 7 + TypeScript                    |
| Styling      | Tailwind CSS v4 (theme tokens in `src/index.css`) |
| Animation    | GSAP 3 + ScrollTrigger (scrubbed, pinned scenes)  |
| Smooth scroll| Lenis (wired into GSAP's ticker)                  |
| Music        | Original generative Web Audio score (no samples)  |
| Icons        | Lucide React                                      |
| Output       | Single-file build via `vite-plugin-singlefile`    |

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # production build → dist/index.html (single file)
npm run preview  # preview the production build
```

---

## Make It Yours (Customization)

**Everything personal lives in one file: `src/data/story.ts`.**
Names, parents, hometowns, dates of birth, professions, school, college, the
wedding date/time/muhurtham/venue, every location stop, event, caption, and
scrapbook year are defined there with `[PLACEHOLDERS]` noted in comments.
Edit that file and the entire film rewrites itself.

Key entries:

- `bride` / `groom` — names, parents, hometown, DOB, profession, quote, journey steps
- `wedding` — date, `iso` (drives the live countdown), calDates, muhurtham, venue, address, Maps link
- `events` — Mehendi, Reception, Muhurtham, Lunch timeline
- `stops` — the cinematic map chapters (hometown → school → college → city → venue)
- `frames` — the film-strip gallery (photo, year, caption, place, focal point)
- `memoryYears` — the scrapbook year tags

## Replacing the Photographs

The images in `public/images/` are cinematic placeholders. To use the real
couple's photographs, drop files into `public/images/` **using these exact
filenames** — every chapter, morph, polaroid, and gallery frame updates
automatically:

| File                     | Story moment                                   |
| ------------------------ | ---------------------------------------------- |
| `opening-school.jpg`     | Prologue establishing shot (show only once)    |
| `childhood-gate.jpg`     | Chapter I reveal + scrapbook polaroid          |
| `childhood-window.jpg`   | Window-seat polaroid + morph base layer        |
| `teen-cycles.jpg`        | Chapter II morph + time transformation + strip |
| `college-campus.jpg`     | Chapter III campus + time transformation       |
| `bride-journey.jpg`      | Bride's road panel + intro card + strip        |
| `groom-journey.jpg`      | Groom's road panel + intro card + strip        |
| `reunion.jpg`            | Chapter VI reunion chapter                     |
| `wedding-couple.jpg`     | Present-day reveal, finale, transformation     |
| `venue-mandapam.jpg`     | Wedding venue reveal                           |

Tips: use landscape-oriented photos; for narrowly cropped scenes (film strip,
arch portraits) you can fine-tune the focal point via the optional `pos` field
in `frames` (`"58% 46%"` style values).

---

## The Score

No audio files. `src/lib/music.ts` composes an endless original ambience at
runtime with the Web Audio API: a breathing tanpura-like drone under slow
plucked strings in Raga Mohanam (C–D–E–G–A), physically modelled with
Karplus-Strong synthesis and a generated hall reverb.

- Browsers require one gesture for sound: playback starts on the first tap,
  click, or key press (a "touch for music" hint shows until then).
- A floating toggle (bottom-right) mutes/resumes; the engine auto-pauses when
  the tab is hidden.

## The Chapters (scroll map)

1. **Prologue** — old school campus, morning light, dust, film grain
2. **Chapter I** — through the gate's shadow into the first memory + scrapbook
3. **Chapter II** — the years turn: childhood → teenage continuous morph
4. **Chapter III** — college days / new dreams / different paths
5. **Chapter IV** — the roads they walked (animated cinematic route map)
6. **Chapter V** — two roads, two lives (converging split screen)
7. **Chapter VI** — the reunion at the old gate
8. **Time** — teenage → college → present-day dissolving transformation
9. **Now** — the couple, the invitation, muhurtham, countdown, venue, events
10. **Gallery** — a horizontally scrolling film strip of frames
11. **Finale** — save the date + developer credit footer

## Design System

Palette tokens (Tailwind `@theme` in `src/index.css`):
deep maroon · warm beige · antique gold · cream · muted brown · soft black.
Type: Italiana (display), Cormorant Garamond (serif), Caveat (handwriting),
Anek Tamil (labels). Fixed film grain + cinematic vignette + floating dust
motes overlay the entire experience; `prefers-reduced-motion` is respected.

## Performance & Responsiveness

- Lenis smooth scroll + GSAP scrub (no layout shift; pinned 100svh scenes)
- Lazy-loaded, `decoding="async"` imagery; focal-point `object-position` per
  breakpoint so subjects stay framed from 320px phones to ultrawide monitors
- Landscape-height safeguards hide secondary text on short viewports
- Safe-area-aware fixed controls; touch-friendly hit targets

## Deployment

`npm run build` emits a self-contained `dist/index.html` (JS/CSS inlined,
images referenced from `/images`). Serve the `dist` folder from any static
host (Vercel, Netlify, GitHub Pages) along with the image assets.

---

```
Website Crafted & Developed By
HARIHARASUDHAN
Designed with creativity, elegance, and love to celebrate this beautiful beginning.
Portfolio — https://hariharasudhan-portfolio-iota.vercel.app/
```
