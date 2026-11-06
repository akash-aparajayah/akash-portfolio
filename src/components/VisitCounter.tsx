"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useVisitStats from "@/hooks/useVisitStats";

function Count({ value }: { value: number }) {
  const reduce = usePrefersReducedMotion();
  const [text, setText] = useState(reduce ? value.toLocaleString() : "0");

  useEffect(() => {
    if (reduce) {
      setText(value.toLocaleString());
      return;
    }

    const start = performance.now();
    const duration = 1100;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setText(Math.round(value * eased).toLocaleString());
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce, value]);

  return <>{text}</>;
}

export default function VisitCounter({
  variant = "hero",
}: {
  variant?: "hero" | "footer";
}) {
  const stats = useVisitStats();

  if (variant === "footer") {
    return (
      <p className="text-sm text-muted" aria-live="polite">
        {stats ? (
          <>
            <span className="text-fg">
              <Count value={stats.views} />
            </span>{" "}
            visits ·{" "}
            <span className="text-fg">
              <Count value={stats.visitors} />
            </span>{" "}
            people
          </>
        ) : (
          "Counting visits…"
        )}
      </p>
    );
  }

  return (
    <dl className="mt-3 grid max-w-lg grid-cols-2 gap-3">
      <div className="glass-soft rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1">
        <dd className="font-display text-3xl font-bold tracking-tight">
          {stats ? <Count value={stats.views} /> : "—"}
        </dd>
        <dt className="mt-1 text-xs leading-snug text-muted">Portfolio visits</dt>
      </div>
      <div className="glass-soft rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1">
        <dd className="font-display text-3xl font-bold tracking-tight">
          {stats ? <Count value={stats.visitors} /> : "—"}
        </dd>
        <dt className="mt-1 text-xs leading-snug text-muted">Unique people</dt>
      </div>
    </dl>
  );
}
