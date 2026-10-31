"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";
import TrackedLink from "./TrackedLink";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;

    const ids = ["top", ...navLinks.map((link) => link.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onHome]);

  const current = pathname.startsWith("/work") ? "work" : active;

  function hrefFor(hash: string) {
    return onHome ? hash : `/${hash}`;
  }

  return (
    <header className="sticky top-3 z-50 px-4 pt-3">
      <div
        className={`glass mx-auto max-w-5xl rounded-2xl transition-shadow ${
          scrolled ? "shadow-[0_12px_40px_rgba(8,12,32,0.28)]" : ""
        }`}
      >
        <nav aria-label="Main" className="flex h-14 items-center justify-between gap-4 px-5">
          <a href={hrefFor("#top")} className="font-display text-lg font-semibold">
            {site.name}
          </a>

          <ul className="hidden gap-7 text-sm text-muted md:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = current === id;
              return (
                <li key={link.href}>
                  <a
                    href={hrefFor(link.href)}
                    className={`transition-colors hover:text-fg ${isActive ? "text-fg" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {site.resume && (
              <TrackedLink
                href={site.resume}
                event="resume_download"
                detail={{ from: "navbar" }}
                className="hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 sm:inline-block"
              >
                Resume
              </TrackedLink>
            )}
            <ThemeToggle />
            <button
              type="button"
              className="md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <ul className="border-t border-line px-5 py-3 md:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={hrefFor(link.href)}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-muted hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {site.resume && (
              <li>
                <TrackedLink
                  href={site.resume}
                  event="resume_download"
                  detail={{ from: "mobile_menu" }}
                  className="block py-3 text-muted hover:text-fg"
                >
                  Resume
                </TrackedLink>
              </li>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}
