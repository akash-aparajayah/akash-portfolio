import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <div className="glass rounded-[2rem] p-10 md:p-16">
        <p className="text-sm text-accent">404</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 max-w-md text-muted">That route is not part of this portfolio.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
