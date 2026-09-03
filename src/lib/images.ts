/**
 * Static image imports. Importing (rather than referencing a string path) lets
 * Next.js infer intrinsic dimensions and generate a blur-up placeholder for
 * every photograph, which removes layout shift on slow connections.
 *
 * ── Replacing the photography ───────────────────────────────────────────────
 * `storefront` and `founder` are PLACEHOLDERS awaiting the real photographs.
 * Everything else is temporary, openly-licensed stock imagery — swap it for
 * photographs of the store's own stock whenever they are available.
 * See README.md → "Replacing the images".
 */

// Supplied by the store — currently placeholder art.
import storefront from "../../public/images/storefront.jpg";
import founder from "../../public/images/founder.png";

// Cut-out product shots (transparent background, so they float in cards).
import shoeHero from "../../public/images/shoe-hero.webp";
import shoeWhite from "../../public/images/shoe-white.webp";
import shoeSkate from "../../public/images/shoe-skate.webp";
import shoePink from "../../public/images/shoe-pink.webp";
import shoeBoot from "../../public/images/shoe-boot.webp";

import revealRun from "../../public/images/reveal-run.webp";
import revealTrain from "../../public/images/reveal-train.webp";
import revealEveryday from "../../public/images/reveal-everyday.webp";
import revealRelax from "../../public/images/reveal-relax.webp";
import revealPlay from "../../public/images/reveal-play.webp";

// Photographic scenes.
import sceneTrack from "../../public/images/scene-track.webp";
import sceneRunners from "../../public/images/scene-runners.webp";
import sceneActive from "../../public/images/scene-active.webp";
import catMen from "../../public/images/cat-men.webp";
import catWomen from "../../public/images/cat-women.webp";
import catKids from "../../public/images/cat-kids.webp";
import catActive from "../../public/images/cat-active.webp";
import sportClass from "../../public/images/sport-class.webp";
import sportLift from "../../public/images/sport-lift.webp";
import sportTee from "../../public/images/sport-tee.webp";

export const img = {
  storefront,
  founder,
  shoeHero,
  shoeWhite,
  shoeSkate,
  shoePink,
  shoeBoot,
  revealRun,
  revealTrain,
  revealEveryday,
  revealRelax,
  revealPlay,
  sceneTrack,
  sceneRunners,
  sceneActive,
  catMen,
  catWomen,
  catKids,
  catActive,
  sportClass,
  sportLift,
  sportTee,
};
