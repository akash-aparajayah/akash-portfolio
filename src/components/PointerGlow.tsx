"use client";

import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function PointerGlow() {
  const reduce = usePrefersReducedMotion();
  const [fine, setFine] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 20 });
  const current = useRef({ x: 50, y: 20 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFine(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce || !fine) return;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (node.current) {
        node.current.style.background = `radial-gradient(30rem 30rem at ${current.current.x}px ${current.current.y}px, color-mix(in oklab, var(--accent) 24%, transparent), transparent 70%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduce, fine]);

  if (reduce || !fine) return null;

  return <div ref={node} aria-hidden className="pointer-glow" />;
}
