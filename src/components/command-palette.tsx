"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { Icon } from "@phosphor-icons/react";
import {
  BookOpenIcon,
  BriefcaseIcon,
  CodeIcon,
  CopySimpleIcon,
  CubeIcon,
  DesktopIcon,
  FileTextIcon,
  FilmSlateIcon,
  HouseIcon,
  IdentificationCardIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PencilSimpleIcon,
  SunIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";
import { socialIcons } from "@/components/icons";
import { footerNav, site, socials } from "@/config/site";
import { posts, projects } from "@/config/content";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  href?: string;
  action?: () => void;
  group: string;
  Icon: Icon;
};

const pageIcons: Record<string, Icon> = {
  "/": HouseIcon,
  "/work": BriefcaseIcon,
  "/blog": PencilSimpleIcon,
  "/resume": IdentificationCardIcon,
  "/projects": CubeIcon,
  "/gears": DesktopIcon,
  "/setup": CodeIcon,
  "/terminal": TerminalWindowIcon,
  "/books": BookOpenIcon,
  "/movies": FilmSlateIcon,
};

type PaletteContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PaletteCtx = createContext<PaletteContext | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteCtx);
  if (!ctx) {
    return {
      open: false,
      setOpen: () => {},
    };
  }
  return ctx;
}

export function CommandPalette({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <PaletteCtx.Provider value={value}>
      {children}
      <PaletteDialog open={open} setOpen={setOpen} />
    </PaletteCtx.Provider>
  );
}

function PaletteDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo<Item[]>(() => {
    const pages: Item[] = footerNav
      .filter((link) => !link.href.endsWith(".xml"))
      .map((link) => ({
        id: `page-${link.href}`,
        label: link.label,
        href: link.href,
        group: "Pages",
        Icon: pageIcons[link.href] ?? HouseIcon,
      }));

    const writing: Item[] = posts.map((post) => ({
      id: `post-${post.slug}`,
      label: post.title,
      hint: post.excerpt,
      href: `/blog/${post.slug}`,
      group: "Blog",
      Icon: FileTextIcon,
    }));

    const work: Item[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      hint: project.description,
      href: `/projects/${project.slug}`,
      group: "Projects",
      Icon: CubeIcon,
    }));

    const actions: Item[] = [
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        Icon: resolvedTheme === "dark" ? SunIcon : MoonIcon,
        action: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "email",
        label: `Copy email · ${site.email}`,
        group: "Actions",
        Icon: CopySimpleIcon,
        action: () => navigator.clipboard.writeText(site.email),
      },
      ...socials.map((social) => ({
        id: `social-${social.name}`,
        label: social.name,
        href: social.href,
        group: "Connect",
        Icon: socialIcons[social.icon],
      })),
    ];

    const all = [...pages, ...writing, ...work, ...actions];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((item) =>
      `${item.label} ${item.hint ?? ""} ${item.group}`.toLowerCase().includes(q),
    );
  }, [query, resolvedTheme, setTheme]);

  const [last, setLast] = useState({ query, open });
  if (last.query !== query || last.open !== open) {
    setLast({ query, open });
    setActive(0);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const run = useCallback(
    (item: Item) => {
      if (item.action) item.action();
      if (item.href) {
        if (item.href.startsWith("http") || item.href.startsWith("mailto:")) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(item.href);
        }
      }
      setOpen(false);
      setQuery("");
    },
    [router, setOpen],
  );

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) => Math.min(value + 1, Math.max(items.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) => Math.max(value - 1, 0));
      }
      if (event.key === "Enter" && items[active]) {
        event.preventDefault();
        run(items[active]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, active, run]);

  if (!open) return null;

  const groups = items.reduce<Record<string, Item[]>>((acc, item) => {
    acc[item.group] ??= [];
    acc[item.group].push(item);
    return acc;
  }, {});

  let index = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[var(--overlay)] p-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-3 py-3">
          <MagnifyingGlassIcon className="h-4 w-4 text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${site.name}…`}
            className="w-full bg-transparent text-sm outline-none placeholder:text-subtle"
          />
        </div>
        <div className="max-h-96 overflow-y-auto overscroll-contain p-2">
          {items.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">No results.</p>
          ) : (
            Object.entries(groups).map(([group, groupItems]) => (
              <div key={group} className="mb-2">
                <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-subtle">
                  {group}
                </p>
                {groupItems.map((item) => {
                  index += 1;
                  const current = index;
                  const Icon = item.Icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActive(current)}
                      onClick={() => run(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm",
                        current === active ? "bg-background" : "",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-foreground">{item.label}</span>
                        {item.hint ? (
                          <span className="block truncate text-xs text-muted">{item.hint}</span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[11px] text-subtle">
          <span>↑↓ to move · ↵ to open</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
