import { skills } from "@/data/skills";

const items = Array.from(new Set(skills.flatMap((group) => group.items)));
const loop = [...items, ...items];

export default function TechMarquee() {
  return (
    <section aria-label="Tools I work with" className="relative py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-28" />
      <div className="marquee-mask overflow-hidden">
        <ul className="marquee-track flex w-max items-center gap-3 pr-3">
          {loop.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="glass-soft shrink-0 rounded-full px-4 py-2 text-sm text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
