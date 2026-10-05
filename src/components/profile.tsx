"use client";

import Image from "next/image";
import { site, socials } from "@/config/site";
import { socialIcons } from "@/components/icons";
import { CopyButton } from "@/components/copy-button";

export function Profile() {
  return (
    <section className="pt-6 sm:pt-10">
      <div className="flex items-start gap-4">
        <div className="relative h-[72px] w-[72px] shrink-0">
<div className="relative h-full w-full overflow-hidden border border-border bg-card">
            <Image
              src={site.avatar}
              alt={site.name}
              fill
              sizes="72px"
              className="object-cover object-[center_20%] scale-[1.2]"
              priority
            />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[12px] text-subtle">
            <span className="text-accent">$</span> whoami
          </p>
          <h1 className="caret mt-0.5 text-[22px] font-semibold tracking-tight sm:text-2xl">
            {site.name}
          </h1>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[13px] text-muted">
            <span>{site.headline}</span>
            <span className="text-subtle">·</span>
            <a href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <CopyButton value={site.email} iconOnly label="Copy email" />
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {site.bio}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-1.5 text-muted">
        {socials.map((social) => {
          const Icon = socialIcons[social.icon];
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted grayscale"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
