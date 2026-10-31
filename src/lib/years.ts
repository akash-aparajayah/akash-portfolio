import { cacheLife } from "next/cache";
import { site } from "@/data/site";

// Next.js (Cache Components) does not allow new Date() while prerendering.
// "use cache" lets us compute it once and refresh it about once a day.
export async function getYearsOfExperience() {
  "use cache";
  cacheLife("days");
  return Math.max(1, new Date().getFullYear() - site.careerStartYear);
}

export async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
