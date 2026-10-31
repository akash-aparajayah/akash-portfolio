import Section from "./Section";
import { experience } from "@/data/experience";

export default function Experience({ years }: { years: number }) {
  return (
    <Section id="experience" title="Experience" intro={`${years}+ years building software.`}>
      <ol className="space-y-10 border-l border-line pl-8">
        {experience.map((item) => (
          <li key={`${item.org}-${item.period}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[39px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-ink"
            >
              {item.year.slice(2)}
            </span>
            <p className="text-sm text-muted">{item.period}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{item.role}</h3>
            <p className="text-muted">{item.org}</p>
            <ul className="mt-4 max-w-lg list-disc space-y-2 pl-5 leading-relaxed marker:text-accent">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
