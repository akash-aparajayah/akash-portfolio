"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function Magnetic({
  children,
  className,
  strength = 12,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set((dx / r.width) * strength);
    y.set((dy / r.height) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
