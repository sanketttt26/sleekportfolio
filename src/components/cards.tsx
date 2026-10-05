import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CalendarBlankIcon } from "@phosphor-icons/react/ssr";
import type { Post } from "@/config/content";
import { cn, formatDate } from "@/lib/utils";

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-5 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      <span className="text-subtle">## </span>
      {children}
    </h2>
  );
}

export function BlogItem({ post }: { post: Post }) {
  return (
    <article className="-mx-2 flex flex-col gap-4 rounded-xl px-2 py-5 sm:-mx-3 sm:flex-row sm:items-start sm:justify-between sm:px-3">
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold tracking-tight">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="mt-1 text-[13px] text-muted">{post.excerpt}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-subtle">
          <CalendarBlankIcon className="h-3.5 w-3.5" />
          {formatDate(post.date)}
        </p>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex shrink-0 items-center gap-1 self-start text-[13px] text-muted sm:mt-1"
      >
        Read more
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}

export function LinkCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-border bg-card px-4 py-3.5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-semibold">{title}</p>
          <p className="mt-0.5 text-[13px] text-muted">{description}</p>
        </div>
        <ArrowRightIcon className="h-4 w-4 shrink-0 text-subtle" />
      </div>
    </Link>
  );
}

export function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center border border-border bg-card px-4 py-1.5 text-[13px] text-foreground/80"
    >
      {children}
    </Link>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-8 pt-4">
      <h1 className="caret text-2xl font-semibold tracking-tight">
        <span className="text-subtle"># </span>
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}

// Blurs a fixed decoy, not the real value, so there is nothing to unblur.
export function Redacted({ label = "Private company" }: { label?: string }) {
  return (
    <span title="Kept private">
      <span aria-hidden className="select-none blur-[5px]">
        Company Name
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-14 text-center">
      <span className="flex h-10 w-10 items-center justify-center border border-border bg-card">
        <Icon className="h-5 w-5 text-muted" />
      </span>
      <p className="mt-4 text-[15px] font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-muted">{children}</p>
    </div>
  );
}

const posterTones = [
  "from-amber-900 to-stone-950",
  "from-sky-900 to-slate-950",
  "from-rose-900 to-stone-950",
  "from-cyan-900 to-slate-950",
  "from-violet-900 to-neutral-950",
];

export function Cover({
  title,
  label,
  src,
  index = 0,
  book,
}: {
  title: string;
  label?: string;
  src?: string;
  index?: number;
  book?: boolean;
}) {
  const face = (
    <div
      className={cn(
        "relative aspect-[2/3] overflow-hidden rounded-lg bg-card shadow-sm ring-1 ring-border after:absolute after:inset-y-0 after:left-0 after:w-1.5 after:bg-linear-to-r after:from-black/20 after:to-transparent",
        book &&
          "origin-left transition-[transform,box-shadow] duration-500 ease-out group-hover:shadow-xl motion-safe:group-hover:-rotate-y-35",
      )}
    >
      {src ? (
        <Image src={src} alt={title} fill sizes="(min-width: 640px) 200px, 45vw" className="object-cover" />
      ) : (
        // ponytail: typographic poster when there is no artwork
        <div
          className={cn(
            "flex h-full flex-col justify-between bg-linear-to-br p-3.5 text-stone-100",
            posterTones[index % posterTones.length],
          )}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
            {label}
          </span>
          <span className="font-serif text-xl leading-tight sm:text-2xl">{title}</span>
        </div>
      )}
    </div>
  );

  if (!book) return face;

  // Hover swings the cover open on its spine to show the pages behind it.
  return (
    <div className="group relative perspective-distant">
      <div
        aria-hidden
        className="absolute inset-y-1.5 left-0 right-0.5 rounded-r-md bg-stone-100 shadow-[inset_8px_0_12px_-6px_rgb(0_0_0/0.25),inset_-1px_0_0_#d6d3d1,inset_-3px_0_0_#fafaf9,inset_-4px_0_0_#d6d3d1,inset_-6px_0_0_#fafaf9,inset_-7px_0_0_#d6d3d1] dark:bg-stone-300"
      />
      {face}
    </div>
  );
}
