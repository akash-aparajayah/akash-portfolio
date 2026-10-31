import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ProjectImage from "@/components/ProjectImage";
import TrackedLink from "@/components/TrackedLink";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <article className="glass overflow-hidden rounded-3xl">
        <ProjectImage
          src={project.image}
          alt={`${project.title} product frame`}
          className="aspect-[16/8] rounded-none"
        />

        <div className="p-6 md:p-12">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <ArrowLeft size={14} aria-hidden />
            All work
          </Link>

          <p className="mt-6 text-sm text-accent">
            {project.status} · {project.year}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{project.tagline}</p>

          {project.href && (
            <TrackedLink
              href={project.href}
              external
              event="project_click"
              detail={{ project: project.slug }}
              className="mt-5 inline-flex items-center gap-2 text-sm hover:text-accent"
            >
              View project <ExternalLink size={14} aria-hidden />
            </TrackedLink>
          )}

          <dl className="mt-10 grid gap-8 text-[15px] leading-relaxed md:grid-cols-2">
            <div>
              <dt className="font-medium">Problem</dt>
              <dd className="mt-2 text-muted">{project.problem}</dd>
            </div>
            <div>
              <dt className="font-medium">What I built</dt>
              <dd className="mt-2 text-muted">{project.built}</dd>
            </div>
            <div>
              <dt className="font-medium">Key decisions</dt>
              <dd className="mt-2">
                <ul className="list-disc space-y-2 pl-5 text-muted marker:text-accent">
                  {project.decisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="font-medium">Outcome</dt>
              <dd className="mt-2 text-muted">{project.outcome}</dd>
            </div>
          </dl>

          <ul className="mt-10 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="glass-soft rounded-full px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}
