"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";
import TrackedLink from "./TrackedLink";

export default function Navbar() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  // Hide the bar while scrolling down, bring it back while scrolling up.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (open) return;
    setHidden(latest > previous && latest > 240);
  });

  // Highlight the link of the section that is in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const cta = site.resume
    ? { href: site.resume, label: "Resume", event: "resume_download" }
    : { href: `mailto:${site.email}`, label: "Hire me", event: "email_click" };

  return (
    <motion.header
      className="pointer-events-none sticky top-0 z-50 px-4 pt-4"
      initial={reduce ? false : { y: -30, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="pointer-events-auto relative mx-auto w-full max-w-md md:w-fit md:max-w-none">
        <nav
          aria-label="Main"
          className="nav-pill flex h-14 items-center justify-between gap-2 rounded-full pl-5 pr-2.5"
        >
          {/* Name only */}
          <a
            href="#top"
            className="rounded-full py-1 pr-2 text-sm font-semibold tracking-tight"
            aria-label={`${site.name}, back to top`}
          >
            {site.name}
          </a>

          <span aria-hidden className="mx-1 hidden h-5 w-px bg-line md:block" />

          {/* Links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative block rounded-full px-3.5 py-2 text-[13px] transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="nav-active absolute inset-0 rounded-full"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <span aria-hidden className="mx-1 hidden h-5 w-px bg-line md:block" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <TrackedLink
              href={cta.href}
              event={cta.event}
              detail={{ from: "navbar" }}
              className="group hidden items-center gap-1 rounded-full bg-accent py-2 pl-4 pr-3 text-[13px] font-medium text-accent-ink shadow-lg shadow-accent/25 transition-opacity hover:opacity-90 md:inline-flex"
            >
              {cta.label}
              <ArrowUpRight
                size={14}
                aria-hidden
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </TrackedLink>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-fg/10 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              className="nav-pill absolute inset-x-0 top-full mt-2 rounded-3xl p-2 md:hidden"
              initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }
              }
              transition={{ duration: 0.22 }}
            >
              <ul>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-sm ${
                        active === l.href
                          ? "bg-fg/10 text-fg"
                          : "text-muted hover:text-fg"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <TrackedLink
                href={cta.href}
                event={cta.event}
                detail={{ from: "mobile_menu" }}
                className="mt-1 block rounded-2xl bg-accent px-4 py-3 text-center text-sm font-medium text-accent-ink"
              >
                {cta.label}
              </TrackedLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
