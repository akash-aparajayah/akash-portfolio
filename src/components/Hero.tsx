"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import Avatar from "./Avatar";
import TrackedLink from "./TrackedLink";

export default function Hero({ years }: { years: number }) {
  const reduce = useReducedMotion();

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
            duration: 0.8,
            delay: 0.1 + i * 0.12,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  const settle = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay },
        };

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-8 pt-12 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div>
          <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-bold leading-[1.02] tracking-tight">
            {site.headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span className="block" {...rise(i)}>
                  {line === site.headlineAccent ? (
                    <span className="text-gradient">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div {...settle(0.7)}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              {site.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <TrackedLink
                href={`mailto:${site.email}`}
                event="email_click"
                detail={{ from: "hero" }}
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
              >
                Email me
              </TrackedLink>
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

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-soft rounded-2xl p-4">
                  <dd className="font-display text-3xl font-bold">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-xs leading-snug text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <aside className="mx-auto w-full max-w-sm lg:max-w-none">
          <Avatar />

          <motion.div className="glass mt-8 rounded-3xl p-6" {...settle(0.8)}>
            <p className="flex items-start gap-2 text-sm">
              <span
                aria-hidden
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500"
              />
              {site.availability}
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
