"use client";

import { useEffect, useState } from "react";

type VisitStats = {
  views: number;
  visitors: number;
};

let pending: Promise<VisitStats> | null = null;

function loadStats() {
  if (!pending) {
    pending = fetch("/api/visits", {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("visit count failed");
        return (await response.json()) as VisitStats;
      })
      .catch(() => {
        pending = null;
        return { views: 0, visitors: 0 };
      });
  }
  return pending;
}

export default function useVisitStats() {
  const [stats, setStats] = useState<VisitStats | null>(null);

  useEffect(() => {
    let active = true;
    loadStats().then((value) => {
      if (active) setStats(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return stats;
}
