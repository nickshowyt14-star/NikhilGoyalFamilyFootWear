import { img } from "./images";

export const categories = [
  {
    id: "men",
    title: "Men",
    blurb: "Everyday pairs, sports shoes and something sharper for the occasion.",
    image: img.catMen,
    shoe: img.shoeWhite,
    items: [
      "Running Shoes",
      "Sports Shoes",
      "Sneakers",
      "Casual Shoes",
      "Formal Shoes",
      "Sandals & Slippers",
    ],
  },
  {
    id: "women",
    title: "Women",
    blurb: "Comfort for the whole day — from the morning walk to the evening out.",
    image: img.catWomen,
    shoe: img.shoePink,
    items: [
      "Sports Shoes",
      "Walking Shoes",
      "Casual Footwear",
      "Sandals",
      "Slippers",
      "Everyday Footwear",
    ],
  },
  {
    id: "kids",
    title: "Kids",
    blurb: "School-ready and playground-proof, in sizes that keep up with them.",
    image: img.catKids,
    shoe: img.revealPlay,
    items: [
      "School Shoes",
      "Sports Shoes",
      "Casual Shoes",
      "Sandals",
      "Everyday Footwear",
    ],
  },
  {
    id: "sports",
    title: "Active & Sports",
    blurb: "Footwear and clothing built for training, running and everything after.",
    image: img.catActive,
    shoe: img.shoeSkate,
    items: [
      "Running",
      "Walking",
      "Training",
      "Gym",
      "Outdoor",
      "Athleisure",
      "Sports Clothing",
      "Socks & Accessories",
    ],
  },
] as const;

/** Scroll-driven product reveal. Each entry owns a full viewport. */
export const revealChapters = [
  {
    id: "run",
    label: "Run",
    heading: "Built for the\nlong way round.",
    copy: "Cushioned running and walking shoes for early mornings, evening laps and everything in between.",
    image: img.revealRun,
    bg: "#0d0d0f",
    fg: "#ffffff",
    accent: "#ff2e37",
  },
  {
    id: "train",
    label: "Train",
    heading: "Grip, hold,\nrepeat.",
    copy: "Training and gym shoes with the stability to take a session seriously.",
    image: img.revealTrain,
    bg: "#f4f4f4",
    fg: "#111111",
    accent: "#d71920",
  },
  {
    id: "everyday",
    label: "Everyday",
    heading: "The pair you\nreach for first.",
    copy: "Sneakers and casual shoes that go with almost everything you already own.",
    image: img.revealEveryday,
    bg: "#111111",
    fg: "#ffffff",
    accent: "#ff2e37",
  },
  {
    id: "relax",
    label: "Relax",
    heading: "Off the clock.",
    copy: "Sandals and slippers for the walk to the shop and the rest of the evening.",
    image: img.revealRelax,
    bg: "#faf9f7",
    fg: "#111111",
    accent: "#d71920",
  },
  {
    id: "play",
    label: "Play",
    heading: "Small feet,\nbig plans.",
    copy: "School shoes and play shoes made to survive an entire term.",
    image: img.revealPlay,
    bg: "#d71920",
    fg: "#ffffff",
    accent: "#ffffff",
  },
] as const;

export const promises = [
  {
    title: "Multi-Brand Choice",
    copy: "Trusted footwear and activewear brands under one roof.",
    icon: "layers",
  },
  {
    title: "For The Whole Family",
    copy: "Men, women and children's footwear.",
    icon: "users",
  },
  {
    title: "All Sizes",
    copy: "A broad range of sizes across categories.",
    icon: "ruler",
  },
  {
    title: "Fresh Stock",
    copy: "New styles and selections arriving regularly.",
    icon: "sparkle",
  },
  {
    title: "Sports + Everyday",
    copy: "From performance footwear to daily essentials.",
    icon: "activity",
  },
] as const;

export const sportswearItems = [
  "Training",
  "Running",
  "Gym",
  "Walking",
  "Everyday activewear",
  "T-shirts",
  "Shorts",
  "Track pants",
  "Sports socks",
  "Performance essentials",
] as const;
