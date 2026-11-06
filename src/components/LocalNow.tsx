"use client";

import { useEffect, useState } from "react";

const zone = "Asia/Kolkata";

function parts(date: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: zone,
    }).format(date),
  );
  const time = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
    timeZone: zone,
  }).format(date);

  const greeting =
    hour < 5
      ? "Late night"
      : hour < 12
        ? "Good morning"
        : hour < 17
          ? "Good afternoon"
          : "Good evening";

  return { greeting, time };
}

export default function LocalNow() {
  const [now, setNow] = useState<{ greeting: string; time: string } | null>(null);

  useEffect(() => {
    const tick = () => setNow(parts(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="text-xs text-muted">Madurai, IST</span>
    );
  }

  return (
    <span className="text-xs text-muted">
      {now.greeting} · {now.time} IST
    </span>
  );
}
