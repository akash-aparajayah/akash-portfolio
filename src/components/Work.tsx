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
      title="Work"
      intro="What each project needed, what I built, and the decisions behind it."
    >
      <div className="space-y-6">
        <Reveal>
          <article className="group glass-soft card-lift overflow-hidden rounded-2xl">
            <Link href={`/work/${featured.slug}`} className="block">
              <ProjectImage
                src={featured.image}
                alt={`${featured.title} product frame`}
                className="aspect-[16/9]"
              />
              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
                <header>
                  <p className="text-sm text-accent">
                    {featured.status} · {featured.year}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-semibold">{featured.title}</h3>
                  <p className="mt-2 text-muted">{featured.tagline}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm">
                    Read case study <ArrowUpRight size={14} aria-hidden />
                  </p>
                </header>
                <dl className="space-y-4 text-[15px] leading-relaxed">
                  <div>
                    <dt className="font-medium">Problem</dt>
                    <dd className="mt-1 text-muted">{featured.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Outcome</dt>
                    <dd className="mt-1 text-muted">{featured.outcome}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </article>
        </Reveal>

        {rest.map((project, index) => (
          <Reveal key={project.slug} delay={0.08 * (index + 1)}>
            <article className="group glass-soft card-lift overflow-hidden rounded-2xl">
              <Link href={`/work/${project.slug}`} className="grid gap-0 lg:grid-cols-[1fr_1.4fr]">
                <ProjectImage
                  src={project.image}
                  alt={`${project.title} product frame`}
                  className="aspect-[16/10] lg:min-h-full"
                />
                <div className="p-6">
                  <p className="text-sm text-accent">
                    {project.status} · {project.year}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-muted">{project.tagline}</p>
                  <p className="mt-4 text-sm text-muted">{project.stack.join(" · ")}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm">
                    Read case study <ArrowUpRight size={14} aria-hidden />
                  </p>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
