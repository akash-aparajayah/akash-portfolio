import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/data/skills";

export default function Skills() {
  const [daily, ...rest] = skills;

  return (
    <Section
      id="skills"
      title="Skills"
      intro="Grouped by how much I use them, so you can judge depth."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <div className="glass-soft h-full rounded-2xl p-6">
            <h3 className="font-display text-2xl font-semibold">{daily.level}</h3>
            <p className="mt-1 text-sm text-muted">{daily.note}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {daily.items.map((item) => (
                <li key={item} className="rounded-full bg-accent/12 px-3 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {rest.map((skill, index) => (
          <Reveal key={skill.level} delay={0.08 * (index + 1)}>
            <div className="glass-soft h-full rounded-2xl p-5">
              <h3 className="font-display text-lg font-semibold">{skill.level}</h3>
              <p className="mt-1 text-sm text-muted">{skill.note}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
