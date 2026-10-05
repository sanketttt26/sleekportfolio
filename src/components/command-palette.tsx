"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

// The dialog and its icons download on first open, not with every page.
const PaletteDialog = dynamic(() =>
  import("@/components/palette-dialog").then((m) => m.PaletteDialog),
);

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

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PaletteCtx.Provider value={value}>
      {children}
      {open ? <PaletteDialog setOpen={setOpen} /> : null}
    </PaletteCtx.Provider>
  );
}
