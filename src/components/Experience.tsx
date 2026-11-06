"use client";

import { motion } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { MapPin } from "lucide-react";
import Section from "./Section";
import { experience } from "@/data/experience";

const itemVariants = {
  hidden: {},
  show: {},
};

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 18 },
  },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.9, delay: 0.3, ease: "easeInOut" as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.15, ease: "easeOut" as const },
  },
};

export default function Experience({ years }: { years: number }) {
  const reduce = usePrefersReducedMotion();

  return (
    <Section
      id="experience"
      index="04"
      title="Experience"
      intro={`${years}+ years building software.`}
    >
      <ol>
        {experience.map((item, i) => {
          const isFirst = i === 0;
          const isLast = i === experience.length - 1;

          return (
            <motion.li
              key={item.company}
              className="grid grid-cols-[28px_1fr] gap-x-5"
              variants={itemVariants}
              initial={reduce ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {/* Left column: circle on top, line below it. Both share one centre. */}
              <div className="flex flex-col items-center">
                <div className="relative h-7 w-7 shrink-0">
                  {isFirst && (
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full bg-accent/40 motion-reduce:hidden"
                    />
                  )}
                  <motion.span
                    variants={circleVariants}
                    className="relative flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-ink"
                  >
                    {item.since.slice(2)}
                  </motion.span>
                </div>
                {!isLast && (
                  <motion.span
                    aria-hidden
                    variants={lineVariants}
                    className="mt-2 w-px flex-1 origin-top bg-accent/40"
                  />
                )}
              </div>

              {/* Right column: company card */}
              <motion.div
                variants={contentVariants}
                className={isLast ? "" : "pb-10"}
              >
                <article className="glass-soft card-lift rounded-2xl p-5 sm:p-6">
                  <header className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold">
                        {item.company}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {item.type} · {item.mode}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                        <MapPin size={14} aria-hidden />
                        {item.location}
                      </p>
                    </div>

                    {item.current ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium">
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full bg-emerald-500"
                        />
                        Current
                      </span>
                    ) : (
                      item.duration && (
                        <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                          {item.duration}
                        </span>
                      )
                    )}
                  </header>

                  <div className="mt-5">
                    {item.roles.map((role, r) => (
                      <div
                        key={`${role.title}-${role.start}`}
                        className={
                          r === 0 ? "" : "mt-6 border-t border-line pt-6"
                        }
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h4 className="font-display text-lg font-semibold">
                            {role.title}
                          </h4>
                          <p className="text-sm text-accent">
                            {role.start} – {role.end}
                            {role.duration ? ` · ${role.duration}` : ""}
                          </p>
                        </div>

                        <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted marker:text-accent">
                          {role.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>

                        <ul className="mt-4 flex flex-wrap gap-2">
                          {role.skills.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              </motion.div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
