"use client";

import { motion, useScroll, useSpring } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function ScrollProgress() {
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="scroll-progress"
      style={{ scaleX, transformOrigin: "0% 50%" }}
    />
  );
}
