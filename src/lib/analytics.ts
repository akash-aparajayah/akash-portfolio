import { track } from "@vercel/analytics";

// Custom events (resume downloads, email clicks) are recorded only on Vercel plans
// that include custom events. Page views and visitors work on the free plan.
export function trackEvent(
  name: string,
  data?: Record<string, string | number | boolean>,
) {
  try {
    track(name, data);
  } catch {
    // Never let analytics break the page.
  }
}
