export default function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-10 md:py-12">
      <div className="glass grid gap-8 rounded-3xl p-6 md:grid-cols-[220px_1fr] md:gap-12 md:p-12">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
          {intro && <p className="mt-3 text-sm leading-relaxed text-muted">{intro}</p>}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
