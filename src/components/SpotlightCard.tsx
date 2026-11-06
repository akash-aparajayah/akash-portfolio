"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 18,
  });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    node.style.setProperty("--mx", `${mx}px`);
    node.style.setProperty("--my", `${my}px`);
    if (reduce) return;
    px.set(mx / r.width - 0.5);
    py.set(my / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        className={`spotlight h-full ${className}`}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
