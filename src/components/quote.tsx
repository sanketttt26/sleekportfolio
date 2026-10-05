import { site } from "@/config/site";

export function Quote() {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-8">
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-3 select-none font-serif text-7xl leading-none text-orange-600/25 dark:text-orange-400/25"
      >
        “
      </span>
      <blockquote className="relative text-center font-serif text-[17px] italic leading-relaxed tracking-wide text-foreground/90">
        {site.quote.text}
      </blockquote>
      <figcaption className="relative mt-4 text-center text-sm text-orange-600 dark:text-orange-400">
        — {site.quote.author}
      </figcaption>
    </figure>
  );
}
