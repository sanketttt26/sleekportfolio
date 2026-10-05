import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { getProject, projects } from "@/config/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="container-site pb-16">
      <Link
        href="/projects"
        className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to Projects
      </Link>
      <header className="mt-8 mb-8">
        <p className="text-xs text-subtle">{project.year}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-[15px] text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-[13px]">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-foreground"
            >
              Live / repo
              <ArrowSquareOutIcon className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </header>
      <ul className="space-y-2 text-[15px] leading-relaxed text-muted">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="shrink-0 text-subtle">-</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
