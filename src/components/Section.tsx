"use client";

import { motion } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function Section({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string;
  index?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-8 md:py-10">
      <motion.div
        className="glass relative grid gap-8 overflow-hidden rounded-[2rem] p-6 md:grid-cols-[240px_1fr] md:gap-12 md:p-12"
        initial={reduce ? false : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span aria-hidden className="section-sheen" />
        <div className="md:sticky md:top-28 md:self-start">
          {index && (
            <p className="kicker mb-3">
              {index} <span className="mx-2 text-accent">/</span> {title}
            </p>
          )}
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-3 text-sm leading-relaxed text-muted">{intro}</p>
          )}
        </div>
        <div>{children}</div>
      </motion.div>
    </section>
  );
}
