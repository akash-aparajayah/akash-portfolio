"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import Avatar from "./Avatar";
import LocalNow from "./LocalNow";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";
import TrackedLink from "./TrackedLink";
import VisitCounter from "./VisitCounter";
import WordCycle from "./WordCycle";

const building = [
  "HRMS products",
  "B2B backends",
  "accounting software",
  "admin consoles",
];

export default function Hero({ years }: { years: number }) {
  const reduce = usePrefersReducedMotion();

  const stats = [
    { value: `${years}+`, label: "Years building" },
    { value: String(projects.length), label: "Products in motion" },
    { value: "Remote", label: "India, worldwide" },
  ];

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: 0 },
          transition: {
            duration: 0.9,
            delay: 0.08 + i * 0.14,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  const settle = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pb-6 pt-10 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:items-start">
        <div>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            {...settle(0.04)}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3 py-1.5 text-xs font-medium">
              <span aria-hidden className="pulse-dot" />
              {site.availability}
            </p>
            <LocalNow />
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5.4rem)] font-bold leading-[0.98] tracking-tight">
            {site.headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span className="block" {...rise(i)}>
                  {line === site.headlineAccent ? (
                    <ScrambleText text={line} className="text-gradient" />
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div {...settle(0.7)}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
              {site.intro}
            </p>
            <p className="mt-3 text-lg">
              Right now I am building{" "}
              <WordCycle words={building} />.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <TrackedLink
                  href={`mailto:${site.email}`}
                  event="email_click"
                  detail={{ from: "hero" }}
                  className="btn-primary inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink shadow-lg shadow-accent/25"
                >
                  Email me
                  <ArrowUpRight size={16} aria-hidden />
                </TrackedLink>
              </Magnetic>
              {site.resume ? (
                <TrackedLink
                  href={site.resume}
                  event="resume_download"
                  detail={{ from: "hero" }}
                  className="glass-soft rounded-full px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
                >
                  Download resume
                </TrackedLink>
              ) : (
                <a
                  href="#work"
                  className="glass-soft rounded-full px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
                >
                  See selected work
                </a>
              )}
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-soft rounded-2xl p-4"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.08, duration: 0.5 }}
                >
                  <dd className="font-display text-3xl font-bold tracking-tight">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs leading-snug text-muted">
                    {stat.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
            <VisitCounter />
          </motion.div>
        </div>

        <aside className="mx-auto w-full max-w-sm lg:max-w-none">
          <Avatar />

          <motion.div className="glass mt-8 rounded-3xl p-6" {...settle(0.85)}>
            <p className="kicker">Now</p>
            <p className="mt-2 text-sm leading-relaxed">
              {site.role} · {site.location}
            </p>

            <ul className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-muted" aria-hidden />
                <TrackedLink
                  href={`mailto:${site.email}`}
                  event="email_click"
                  detail={{ from: "profile_card" }}
                  className="break-all hover:text-accent"
                >
                  {site.email}
                </TrackedLink>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-muted" aria-hidden />
                <TrackedLink
                  href={site.phoneHref}
                  event="phone_click"
                  detail={{ from: "profile_card" }}
                  className="hover:text-accent"
                >
                  {site.phone}
                </TrackedLink>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="shrink-0 text-muted" aria-hidden />
                <span>{site.location}</span>
              </li>
            </ul>

            <p className="mt-5 flex gap-5 border-t border-line pt-5 text-sm text-muted">
              {site.github && (
                <TrackedLink
                  href={site.github}
                  external
                  event="github_click"
                  className="hover:text-fg"
                >
                  GitHub
                </TrackedLink>
              )}
              <TrackedLink
                href={site.linkedin}
                external
                event="linkedin_click"
                className="hover:text-fg"
              >
                LinkedIn
              </TrackedLink>
            </p>
          </motion.div>
        </aside>
      </div>
    </section>
  );
}
