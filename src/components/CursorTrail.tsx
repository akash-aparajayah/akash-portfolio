"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function CursorTrail() {
  const reduce = usePrefersReducedMotion();
  const [on, setOn] = useState(false);
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setOn(media.matches && !reduce);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!on) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [on, x, y]);

  if (!on) return null;

  return (
    <motion.div
      aria-hidden
      className="cursor-trail"
      style={{ x: sx, y: sy }}
    />
  );
}
