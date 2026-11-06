import Section from "./Section";
import Reveal from "./Reveal";

const principles = [
  {
    title: "Model the data first",
    text: "Most product bugs start as unclear data. I settle the schema and the types before I build screens.",
  },
  {
    title: "Keep boundaries clean",
    text: "UI, business rules and storage each live in their own place, so a change in one does not leak into the others.",
  },
  {
    title: "Ship small, change safely",
    text: "Small releases with typed code and tests on the risky parts make changes cheap instead of scary.",
  },
  {
    title: "Write decisions down",
    text: "A short note on why something was built a certain way saves the next developer, and future me, hours.",
  },
];

export default function HowIWork() {
  return (
    <Section id="how" index="05" title="How I work" intro="What a team can expect from me.">
      <ul className="grid gap-4 sm:grid-cols-2">
        {principles.map((principle, index) => (
          <li key={principle.title}>
            <Reveal delay={0.06 * index} className="h-full">
              <div className="glass-soft relative h-full overflow-hidden rounded-[1.6rem] p-6">
                <span
                  aria-hidden
                  className="font-display text-4xl font-bold text-accent/20"
                >
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{principle.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{principle.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
