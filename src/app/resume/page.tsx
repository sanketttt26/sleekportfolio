import type { Metadata } from "next";
import { PageHeader, Redacted } from "@/components/cards";
import { education, experience, skills } from "@/config/content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}.`,
};

export default function ResumePage() {
  return (
    <div className="container-site pb-16">
      <PageHeader title="Resume" description={`${site.name} · ${site.headline} · ${site.location}`} />
      <div className="mb-8 flex flex-wrap gap-3 text-[13px]">
        <a href={`mailto:${site.email}`} className="text-muted">
          {site.email}
        </a>
        <span className="text-subtle">·</span>
        <a href={site.url} className="text-muted">
          {site.url.replace(/^https?:\/\//, "")}
        </a>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-medium text-subtle">
          ## experience
        </h2>
        <div className="space-y-6">
          {experience.map((job) => (
            <div key={job.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[15px] font-semibold">
                  {job.company ?? <Redacted />}
                  <span className="font-normal text-muted"> · {job.role}</span>
                </h3>
                <p className="text-[13px] text-subtle">
                  {job.start} – {job.end}
                </p>
              </div>
              <p className="text-[13px] text-subtle">{job.location}</p>
              <ul className="mt-2 space-y-1 text-[13px] leading-relaxed text-muted">
                {job.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="shrink-0 text-subtle">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {education.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-medium text-subtle">
            ## education
          </h2>
          {education.map((item) => (
            <div key={item.school} className="flex flex-wrap justify-between gap-2">
              <div>
                <h3 className="text-[15px] font-semibold">{item.school}</h3>
                <p className="text-[13px] text-muted">{item.degree}</p>
              </div>
              <p className="text-[13px] text-subtle">
                {item.years}
                <br />
                {item.location}
              </p>
            </div>
          ))}
        </section>
      ) : null}

      <section>
        <h2 className="mb-4 text-sm font-medium text-subtle">
          ## skills
        </h2>
        <div className="space-y-3">
          {skills.map((group) => (
            <div key={group.label} className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
              <p className="w-24 shrink-0 text-[13px] font-medium">{group.label}</p>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-border bg-card px-2.5 py-0.5 text-[12px] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
