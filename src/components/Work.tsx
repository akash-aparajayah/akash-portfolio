import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectImage from "./ProjectImage";
import { projects } from "@/data/projects";

export default function Work() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project.slug !== featured.slug);

  return (
    <Section
      id="work"
      index="01"
      title="Work"
      intro="What each project needed, what I built, and the decisions behind it."
    >
      <div className="space-y-5">
        <Reveal>
          <article className="group glass-soft card-lift overflow-hidden rounded-[1.6rem]">
            <Link href={`/work/${featured.slug}`} className="block">
              <div className="relative">
                <ProjectImage
                  src={featured.image}
                  alt={`${featured.title} product frame`}
                  className="aspect-[16/9]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink">
                  Featured
                </span>
              </div>
              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:p-8">
                <header>
                  <p className="text-sm text-accent">
                    {featured.status} · {featured.year}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                    {featured.title}
                  </h3>
                  <p className="mt-2 text-muted">{featured.tagline}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                    Read case study
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </p>
                </header>
                <dl className="space-y-5 text-[15px] leading-relaxed">
                  <div>
                    <dt className="kicker">Problem</dt>
                    <dd className="mt-2 text-muted">{featured.problem}</dd>
                  </div>
                  <div>
                    <dt className="kicker">Outcome</dt>
                    <dd className="mt-2 text-muted">{featured.outcome}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </article>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={0.08 * (index + 1)}>
              <article className="group glass-soft card-lift flex h-full flex-col overflow-hidden rounded-[1.6rem]">
                <Link href={`/work/${project.slug}`} className="flex h-full flex-col">
                  <ProjectImage
                    src={project.image}
                    alt={`${project.title} product frame`}
                    className="aspect-[16/10]"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm text-accent">
                      {project.status} · {project.year}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-muted">{project.tagline}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <li key={item} className="chip rounded-full px-2.5 py-1 text-xs">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-medium">
                      Read case study
                      <ArrowUpRight
                        size={14}
                        aria-hidden
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
