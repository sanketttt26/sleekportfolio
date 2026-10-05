import type { Metadata } from "next";
import {
  AppWindowIcon,
  ArrowUpRightIcon,
  LaptopIcon,
  PuzzlePieceIcon,
} from "@phosphor-icons/react/ssr";
import { PageHeader } from "@/components/cards";
import { gears } from "@/config/content";

export const metadata: Metadata = {
  title: "Gears",
  description: "Devices, software, and extensions I actually use.",
};

function List({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { name: string; note?: string; href?: string }[];
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <span className="text-subtle">##</span>
        <Icon className="h-5 w-5 text-muted" />
        {title}
        <span className="text-[13px] font-normal text-subtle">{items.length}</span>
      </h2>
      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {items.map((item) => {
          const body = (
            <>
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-medium">{item.name}</span>
                {item.note ? (
                  <span className="block text-[13px] text-muted">{item.note}</span>
                ) : null}
              </span>
              {item.href ? (
                <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-subtle" />
              ) : null}
            </>
          );
          const row = "flex items-center justify-between gap-3 px-4 py-3";
          return (
            <li key={item.name}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer" className={row}>
                  {body}
                </a>
              ) : (
                <div className={row}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function GearsPage() {
  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Gears"
        description="The kit that stays on the desk. Everything else was a phase."
      />
      <List title="Devices & Accessories" icon={LaptopIcon} items={gears.devices} />
      <List title="Software" icon={AppWindowIcon} items={gears.software} />
      <List title="Editor Extensions" icon={PuzzlePieceIcon} items={gears.extensions} />
    </div>
  );
}
