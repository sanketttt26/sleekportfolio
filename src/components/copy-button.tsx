"use client";

import { useState } from "react";
import { CheckIcon, CopySimpleIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label = "Copy",
  className,
  iconOnly,
}: {
  value: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "inline-flex items-center gap-1 rounded-md text-muted",
        className,
      )}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopySimpleIcon className="h-3.5 w-3.5" />}
      {iconOnly ? null : (
        <span className="text-xs">{copied ? "Copied" : label}</span>
      )}
    </button>
  );
}
