"use client";

import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

type ViewTransitionDoc = {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = usePrefersReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  // false on the server, true in the browser: avoids a hydration mismatch.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted)
    return <span className="inline-block h-7 w-[52px]" aria-hidden />;

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  async function toggle() {
    const doc = document as unknown as ViewTransitionDoc;
    const button = buttonRef.current;

    // No support or reduced motion: switch instantly.
    if (reduce || !doc.startViewTransition || !button) {
      setTheme(next);
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    try {
      await transition.ready;
    } catch {
      return;
    }

    // The new theme grows out of the button like a ripple.
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 800,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative h-7 w-[52px] shrink-0 rounded-full border border-line bg-fg/5 p-[3px] transition-colors hover:border-accent"
    >
      <motion.span
        initial={false}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-ink shadow-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {isDark ? (
              <Moon size={12} aria-hidden />
            ) : (
              <Sun size={12} aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
