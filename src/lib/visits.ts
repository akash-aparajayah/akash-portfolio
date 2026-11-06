import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

export type VisitStats = {
  views: number;
  visitors: number;
};

const KEY = "akash-portfolio:visits";
const empty: VisitStats = { views: 0, visitors: 0 };

const kvUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const kvToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

function filePath() {
  if (process.env.VERCEL) return join(tmpdir(), "akash-portfolio-visits.json");
  return join(process.cwd(), "data", "visits.json");
}

let writeLock = Promise.resolve();

function enqueue<T>(job: () => Promise<T>) {
  const run = writeLock.then(job, job);
  writeLock = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readFileStats(): Promise<VisitStats> {
  try {
    const raw = await readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<VisitStats>;
    return {
      views: Number(parsed.views) || 0,
      visitors: Number(parsed.visitors) || 0,
    };
  } catch {
    return { ...empty };
  }
}

async function writeFileStats(stats: VisitStats) {
  const path = filePath();
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(stats)}\n`, "utf8");
}

async function kvFetch(command: string[]) {
  if (!kvUrl || !kvToken) return null;
  const response = await fetch(`${kvUrl.replace(/\/$/, "")}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command]),
    cache: "no-store",
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as { result?: unknown }[];
  return payload[0]?.result ?? null;
}

export async function getVisitStats(): Promise<VisitStats> {
  if (kvUrl && kvToken) {
    const result = await kvFetch(["GET", KEY]);
    if (typeof result === "string") {
      try {
        const parsed = JSON.parse(result) as Partial<VisitStats>;
        return {
          views: Number(parsed.views) || 0,
          visitors: Number(parsed.visitors) || 0,
        };
      } catch {
        return { ...empty };
      }
    }
    return { ...empty };
  }
  return readFileStats();
}

export async function recordVisit(isNewVisitor: boolean): Promise<VisitStats> {
  return enqueue(async () => {
    const current = await getVisitStats();
    const next: VisitStats = {
      views: current.views + 1,
      visitors: current.visitors + (isNewVisitor ? 1 : 0),
    };

    if (kvUrl && kvToken) {
      await kvFetch(["SET", KEY, JSON.stringify(next)]);
      return next;
    }

    await writeFileStats(next);
    return next;
  });
}

const botPattern =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview|lighthouse|headless/i;

export function isBot(userAgent: string) {
  return botPattern.test(userAgent);
}
