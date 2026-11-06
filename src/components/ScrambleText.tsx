"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }

    let frame = 0;
    const length = text.length;
    const id = window.setInterval(() => {
      frame += 1;
      const done = Math.floor((frame / 18) * length);
      setOut(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "." || char === ",") return char;
            if (i < done) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)] ?? char;
          })
          .join(""),
      );
      if (done >= length) window.clearInterval(id);
    }, 28);

    return () => window.clearInterval(id);
  }, [reduce, text]);

  return (
    <span className={className} suppressHydrationWarning>
      {out}
    </span>
  );
}
