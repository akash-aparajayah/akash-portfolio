import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/data/skills";

export default function Skills() {
  const [daily, ...rest] = skills;

  return (
    <Section
      id="skills"
      index="03"
      title="Skills"
      intro="Grouped by how much I use them, so you can judge depth."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <div className="relative h-full overflow-hidden rounded-[1.6rem] p-6 md:p-8 glass-soft">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-10 font-display text-[8rem] font-bold leading-none text-accent/10"
            >
              01
            </span>
            <h3 className="relative font-display text-2xl font-semibold">{daily.level}</h3>
            <p className="relative mt-1 text-sm text-muted">{daily.note}</p>
            <ul className="relative mt-6 flex flex-wrap gap-2">
              {daily.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {rest.map((skill, index) => (
          <Reveal key={skill.level} delay={0.08 * (index + 1)}>
            <div className="glass-soft relative h-full overflow-hidden rounded-[1.6rem] p-6">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-4 font-display text-6xl font-bold text-accent/10"
              >
                0{index + 2}
              </span>
              <h3 className="relative font-display text-lg font-semibold">{skill.level}</h3>
              <p className="relative mt-1 text-sm text-muted">{skill.note}</p>
              <ul className="relative mt-4 space-y-2 text-sm">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
