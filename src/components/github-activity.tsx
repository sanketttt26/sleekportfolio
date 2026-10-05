import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { SectionTitle } from "@/components/cards";
import { site } from "@/config/site";
import { formatDate } from "@/lib/utils";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const levels = [
  "bg-border",
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
];

async function getContributions() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${site.github}?y=last`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data: { total: { lastYear: number }; contributions: Day[] } =
      await res.json();
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

export async function GithubActivity() {
  const data = await getContributions();
  // ponytail: API down at build/revalidate -> hide the section rather than show a broken card
  if (!data) return null;

  // Pad so the first column starts on Sunday, like GitHub.
  const pad = new Date(data.days[0].date).getUTCDay();
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...data.days];
  const weeks = Math.ceil(cells.length / 7);
  const columns = { gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` };

  const months = Array.from({ length: weeks }, (_, w) => {
    const first = cells
      .slice(w * 7, w * 7 + 7)
      .find((d) => d && new Date(d.date).getUTCDate() === 1);
    return first
      ? new Date(first.date).toLocaleString("en-US", { month: "short", timeZone: "UTC" })
      : null;
  });

  return (
    <section className="mt-16">
      <SectionTitle>
        <span className="inline-flex items-center gap-2">
          <GithubLogoIcon className="h-5 w-5" />
          GitHub Activity
        </span>
      </SectionTitle>
      <div className="rounded-xl border border-border bg-card p-4">
        {/* rtl so narrow screens start scrolled to the latest weeks */}
        <div className="overflow-x-auto [direction:rtl]">
          <div className="min-w-[560px] [direction:ltr]">
            <div className="mb-1.5 grid gap-[3px] text-[10px] text-subtle" style={columns}>
              {months.map(
                (m, w) =>
                  m && (
                    <span key={w} className="whitespace-nowrap" style={{ gridColumnStart: w + 1 }}>
                      {m}
                    </span>
                  ),
              )}
            </div>
            <div
              role="img"
              aria-label={`${data.total} contributions in the last year`}
              className="grid grid-flow-col grid-rows-7 gap-[3px]"
              style={columns}
            >
              {cells.map((d, i) =>
                d ? (
                  <span
                    key={d.date}
                    title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${formatDate(d.date)}`}
                    className={`aspect-square ${levels[d.level]}`}
                  />
                ) : (
                  <span key={i} />
                ),
              )}
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-subtle">
          <span>
            <a
              href={`https://github.com/${site.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted"
            >
              @{site.github}
            </a>{" "}
            · {data.total} contributions in the last year
          </span>
          <span className="inline-flex items-center gap-1">
            Less
            {levels.map((l) => (
              <span key={l} className={`h-2.5 w-2.5 ${l}`} />
            ))}
            More
          </span>
        </div>
      </div>
    </section>
  );
}
