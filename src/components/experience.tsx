"use client";

import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { Redacted } from "@/components/cards";
import { TechBadge } from "@/components/icons";
import type { Experience } from "@/config/content";
import { cn } from "@/lib/utils";

function Header({
  alwaysOpen,
  open,
  onToggle,
  children,
}: {
  alwaysOpen?: boolean;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const className =
    "flex w-full flex-col gap-2 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4";

  if (alwaysOpen) {
    return <div className={className}>{children}</div>;
  }

  return (
    <button type="button" className={className} onClick={onToggle} aria-expanded={open}>
      {children}
    </button>
  );
}

export function ExperienceList({
  items,
  defaultOpenId,
  alwaysOpen,
}: {
  items: Experience[];
  defaultOpenId?: string;
  alwaysOpen?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="divide-y divide-transparent">
      {items.map((job) => {
        const open = alwaysOpen || openId === job.id;
        return (
          <article key={job.id} className="py-4 first:pt-0">
            <Header
              alwaysOpen={alwaysOpen}
              open={open}
              onToggle={() => setOpenId(open ? null : job.id)}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-semibold">
                    {job.company ?? <Redacted />}
                  </h3>
                  {job.working ? (
                    <span className="inline-flex items-center gap-1 bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-sky-700 dark:text-sky-200">
                      <span className="h-1.5 w-1.5 bg-accent" />
                      Working
                    </span>
                  ) : null}
                  {alwaysOpen ? null : (
                    <CaretDownIcon
                      className={cn(
                        "h-4 w-4 text-subtle transition",
                        open && "rotate-180",
                      )}
                    />
                  )}
                </div>
                <p className="mt-0.5 text-[13px] text-muted">{job.role}</p>
              </div>
              <div className="shrink-0 text-[13px] text-muted sm:text-right">
                <p>
                  {job.start} – {job.end}
                </p>
                <p className="text-subtle">{job.location}</p>
              </div>
            </Header>

            <div className="expand mt-3" data-open={open}>
              <div>
                <div className="border-t border-border pt-4">
                  <p className="text-[13px] font-medium">Technologies & Tools</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                  <p className="mt-4 text-[13px] font-medium">What I&apos;ve done</p>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-muted">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="shrink-0 text-subtle">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
