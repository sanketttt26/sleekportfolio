import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpenIcon } from "@phosphor-icons/react/ssr";
import { EmptyState, PageHeader } from "@/components/cards";
import { projects } from "@/config/content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work — products, tools, and experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Projects"
        description="A short list. If it is not here, it was a sketch."
      />
      {projects.length === 0 ? (
        <EmptyState icon={FolderOpenIcon} title="Nothing to show yet">
          Projects are being written up. Meanwhile, the code lives on{" "}
          <a
            href={`https://github.com/${site.github}`}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-border underline-offset-4"
          >
            GitHub
          </a>
          .
        </EmptyState>
      ) : null}
      <div className="space-y-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block rounded-xl border border-border bg-card px-4 py-4"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[15px] font-semibold">{project.title}</h2>
              <span className="text-xs text-subtle">{project.year}</span>
            </div>
            <p className="mt-1 text-[13px] text-muted">{project.description}</p>
            <p className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-subtle">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border bg-background px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
