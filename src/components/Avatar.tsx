"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/data/site";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const initials = site.name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .toUpperCase();

// Poster crop. FOCUS = "x% y%" (0% left/top, 100% right/bottom). RATIO = width / height.
const FOCUS = "50% 15%";
const RATIO = "4 / 5";

export default function Avatar() {
  const reduce = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 150,
    damping: 18,
  });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      className="[perspective:1100px]"
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <motion.div
          className="group relative"
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Poster */}
          <div
            className="relative w-full overflow-hidden rounded-[2rem] ring-1 ring-white/20"
            style={{
              aspectRatio: RATIO,
              boxShadow:
                "0 30px 80px -30px color-mix(in oklab, var(--accent) 55%, transparent)",
            }}
          >
            {failed ? (
              <span className="flex h-full w-full items-center justify-center bg-surface font-display text-7xl font-bold text-accent">
                {initials}
              </span>
            ) : (
              <Image
                src={site.profileImage}
                alt={`Photo of ${site.name}`}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: FOCUS }}
                onError={() => setFailed(true)}
              />
            )}

            {/* Bottom fade so the name is readable */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
            />

            {/* Light sheen on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />

            {/* Name and role */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span aria-hidden className="mb-3 block h-1 w-10 rounded-full bg-accent" />
              <p className="font-display text-3xl font-bold leading-tight text-white">
                {site.name}
              </p>
              <p className="mt-1 text-sm text-white/80">{site.role}</p>
            </div>
          </div>

          {/* Floating badges (outside the poster, lifted in 3D) */}
          <div className="absolute -right-3 top-8 [transform:translateZ(50px)]">
            <motion.div
              className="glass rounded-full px-4 py-2 text-xs font-medium"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }}
            >
              React + Node.js
            </motion.div>
          </div>

          <div className="absolute -left-3 bottom-28 [transform:translateZ(50px)]">
            <motion.div
              className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" as const }}
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" />
              Open to work
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}