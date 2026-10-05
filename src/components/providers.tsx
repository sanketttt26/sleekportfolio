"use client";

import { ThemeProvider } from "next-themes";
import { CommandPalette } from "@/components/command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <CommandPalette>{children}</CommandPalette>
    </ThemeProvider>
  );
}
