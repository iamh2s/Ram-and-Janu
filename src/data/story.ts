/* ═══════════════════════════════════════════════════════════════
   THE STORY — every word on the site lives here.
   Replace the sample values with the real couple's details.
   ═══════════════════════════════════════════════════════════════ */

export const STORY = {
  /* ── The two of them ─────────────────────────────────────── */
  bride: {
    name: "S.Janaki Devi ", // ← [BRIDE NAME]
    short: "Janu",
    tamil: "ஜானகி",
    parents: "Kamala & Krishnan", // ← [BRIDE PARENTS' NAMES]
    hometown: "Thanjavur", // ← [BRIDE HOMETOWN]
    dob: "14 February 1998", // ← [BRIDE DOB]
    profession: "Architect", // ← [BRIDE PROFESSION]
    quote: "Some people are worth waiting twenty years for.",
    roadLabel: "HER ROAD · 2015 — 2023",
    road: [
      "Thanjavur — where it all began",
      "B.Arch · Tiruchirappalli",
      "Junior Architect · Bengaluru",
      "Design Studio · Chennai",
    ],
  },
  groom: {
    name: "K.Ramachandran", // ← [GROOM NAME]
    short: "Ram",
    tamil: "ராமச்சந்திரன்",
    parents: "Lakshmi & Subramaniam", // ← [GROOM PARENTS' NAMES]
    hometown: "Kumbakonam", // ← [GROOM HOMETOWN]
    dob: "02 August 1997", // ← [GROOM DOB]
    profession: "Software Engineer", // ← [GROOM PROFESSION]
    quote: "She was always there — quietly, in every good memory I have.",
    roadLabel: "HIS ROAD · 2015 — 2023",
    road: [
      "Kumbakonam — where it all began",
      "B.E. · Tiruchirappalli",
      "Software Engineer · Bengaluru",
      "Product Team · Chennai",
    ],
  },

  /* ── A short line about them (optional) ──────────────────── */
  loveLine: "Some stories take twenty years to say “I do.”", // ← [SHORT LOVE STORY]

  /* ── Where the story began ───────────────────────────────── */
  school: {
    name: "St. Joseph's Higher Secondary School", // ← [SCHOOL NAME]
    place: "Kumbakonam", // ← [SCHOOL LOCATION]
  },
  college: {
    name: "Cauvery College of Arts & Science", // ← [COLLEGE NAME]
    place: "Tiruchirappalli", // ← [COLLEGE LOCATION]
  },

  /* ── The wedding ─────────────────────────────────────────── */
  wedding: {
    date: "Sunday, 21 February 2027", // ← [DATE]
    iso: "2027-02-21T09:30:00+05:30", // ← used for the live countdown
    calDates: "20270221T093000/20270221T130000",
    time: "9:30 AM Onwards", // ← [TIME]
    muhurtham: "10:35 AM — 12:05 PM", // ← [MUHURTHAM]
    venue: "Sri Mangalam Kalyana Mandapam", // ← [VENUE NAME]
    city: "Kumbakonam, Tamil Nadu", // ← [LOCATION]
    address: "No. 12, Kamaraj Salai, Kumbakonam — 612 001", // ← [FULL ADDRESS]
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kalyana+Mandapam+Kumbakonam+Tamil+Nadu",
  },

  /* ── Event timeline ──────────────────────────────────────── */
  events: [
    {
      icon: "flower",
      day: "Saturday",
      date: "20 February 2027",
      title: "Mehendi & Sangeet",
      time: "4:00 PM Onwards",
      place: "[VENUE] — The Open Lawns",
    },
    {
      icon: "party",
      day: "Saturday",
      date: "20 February 2027",
      title: "Reception",
      time: "7:00 PM Onwards",
      place: "[VENUE] — Main Hall",
    },
    {
      icon: "sparkles",
      day: "Sunday",
      date: "21 February 2027",
      title: "Muhurtham",
      time: "10:35 AM — 12:05 PM",
      place: "[VENUE] — The Wedding Mandapam",
    },
    {
      icon: "food",
      day: "Sunday",
      date: "21 February 2027",
      title: "Wedding Lunch",
      time: "12:30 PM Onwards",
      place: "[VENUE] — Dining Hall",
    },
  ] as EventItem[],

  /* ── The cinematic map of their lives ────────────────────── */
  stops: [
    {
      icon: "home",
      year: "1998",
      place: "[BRIDE HOMETOWN] · Thanjavur",
      note: "Where Meera's story quietly began.",
    },
    {
      icon: "school",
      year: "2004",
      place: "[SCHOOL] · Kumbakonam",
      note: "One classroom. Two children. Nobody noticed anything yet.",
    },
    {
      icon: "college",
      year: "2015",
      place: "[COLLEGE] · Tiruchirappalli",
      note: "New dreams on an old campus — together, still.",
    },
    {
      icon: "briefcase",
      year: "2019",
      place: "[FIRST CITY] · Bengaluru",
      note: "First jobs, new skylines, and phones that stayed a little too silent.",
    },
    {
      icon: "train",
      year: "2023",
      place: "[CURRENT CITY] · Chennai",
      note: "The city that folded the two roads into one.",
    },
    {
      icon: "heart",
      year: "2027",
      place: "[WEDDING VENUE] · Kumbakonam",
      note: "Where every road finally arrives, forever.",
    },
  ] as StopItem[],

  /* ── Gallery frames (film strip) ─────────────────────────── */
  frames: [
    { src: "/images/childhood-gate.jpg", year: "2004", caption: "the first walk through the gate", place: "Kumbakonam" },
    { src: "/images/childhood-window.jpg", year: "2006", caption: "one textbook, two silences", place: "Class III · 'A'" },
    { src: "/images/teen-cycles.jpg", year: "2010", caption: "the cycle-stand years", place: "School Quadrangle", pos: "58% 46%" },
    { src: "/images/college-campus.jpg", year: "2016", caption: "new dreams, same story", place: "Tiruchirappalli" },
    { src: "/images/bride-journey.jpg", year: "2019", caption: "her road", place: "Thanjavur Junction" },
    { src: "/images/groom-journey.jpg", year: "2019", caption: "his road", place: "Bengaluru" },
    { src: "/images/reunion.jpg", year: "2023", caption: "after all the roads", place: "The Old Gate" },
    { src: "/images/wedding-couple.jpg", year: "2027", caption: "forever, finally", place: "Kumbakonam" },
  ] as FrameItem[],

  /* ── Scrapbook years (customizable) ──────────────────────── */
  memoryYears: ["2004", "2006", "2008"],
};

export type EventItem = {
  icon: string;
  day: string;
  date: string;
  title: string;
  time: string;
  place: string;
};

export type StopItem = {
  icon: string;
  year: string;
  place: string;
  note: string;
};

export type FrameItem = {
  src: string;
  year: string;
  caption: string;
  place: string;
  pos?: string; // object-position focus point for tight crops
};

/* ── Photographs ───────────────────────────────────────────
   Cinematic renders act as placeholders. For the real couple,
   simply drop their real photographs into /public/images using
   these exact filenames — every chapter will update itself.   */
export const IMG = {
  opening: "/images/opening-school.jpg",
  gate: "/images/childhood-gate.jpg",
  window: "/images/childhood-window.jpg",
  teen: "/images/teen-cycles.jpg",
  college: "/images/college-campus.jpg",
  brideRoad: "/images/bride-journey.jpg",
  groomRoad: "/images/groom-journey.jpg",
  reunion: "/images/reunion.jpg",
  couple: "/images/wedding-couple.jpg",
  venue: "/images/venue-mandapam.jpg",
};
