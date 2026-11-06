"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function PointerGlow() {
  const reduce = usePrefersReducedMotion();
  const [pos, setPos] = useState({ x: 50, y: 20 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFine(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce || !fine) return;
    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, fine]);

  if (reduce || !fine) return null;

  return (
    <div
      aria-hidden
      className="pointer-glow"
      style={{
        background: `radial-gradient(28rem 28rem at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--accent) 22%, transparent), transparent 68%)`,
      }}
    />
  );
}
