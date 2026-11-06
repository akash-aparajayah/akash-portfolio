export default function Section({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string;
  index?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-8 md:py-10">
      <div className="glass grid gap-8 rounded-[2rem] p-6 md:grid-cols-[240px_1fr] md:gap-12 md:p-12">
        <div className="md:sticky md:top-28 md:self-start">
          {index && (
            <p className="kicker mb-3">
              {index} <span className="mx-2 text-accent">/</span> {title}
            </p>
          )}
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-3 text-sm leading-relaxed text-muted">{intro}</p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
