"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Always false during SSR and the first client paint so markup matches. */
export default function usePrefersReducedMotion() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready && Boolean(reduce);
}
