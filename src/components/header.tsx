"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon, MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { nav } from "@/config/site";
import { clsx } from "clsx";
import { useCommandPalette } from "@/components/command-palette";

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { setOpen } = useCommandPalette();
  // false during SSR and hydration, true after: avoids a theme-icon mismatch
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const dark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-xl">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <nav className="flex items-center gap-1 text-[13px] sm:gap-1.5">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-1 py-1 transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted",
                )}
              >
                <span className={active ? "text-accent" : "invisible"}>[</span>
                {item.label.toLowerCase()}
                <span className={active ? "text-accent" : "invisible"}>]</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-muted grayscale"
            aria-label="Open command palette"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="text-muted grayscale"
            aria-label="Toggle theme"
          >
            {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
