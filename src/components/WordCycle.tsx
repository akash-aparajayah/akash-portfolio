"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function WordCycle({ words }: { words: string[] }) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
  }, []);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % words.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  const word = words[index] ?? words[0];

  return (
    <span className="relative inline-grid align-bottom">
      {words.map((item) => (
        <span key={item} className="invisible col-start-1 row-start-1" aria-hidden>
          {item}
        </span>
      ))}
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="col-start-1 row-start-1 overflow-hidden text-gradient"
          initial={live && !reduce ? { y: "110%", opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
