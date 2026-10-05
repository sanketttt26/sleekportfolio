import type { Metadata } from "next";
import { PageHeader } from "@/components/cards";
import { CodeBlock } from "@/components/code-block";
import { fastfetch, starship, zshrc } from "@/config/content";

export const metadata: Metadata = {
  title: "Terminal",
  description: "Zsh, Starship, and Fastfetch — a quiet prompt.",
};

export default function TerminalPage() {
  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Terminal"
        description="Ghostty + zsh + Starship. Prompt on one line, no widgets shouting at me."
      />
      <div className="space-y-6">
        <CodeBlock filename="~/.zshrc" code={zshrc} />
        <CodeBlock filename="~/.config/starship.toml" code={starship} />
        <CodeBlock filename="~/.config/fastfetch/config.jsonc" code={fastfetch} />
      </div>
    </div>
  );
}
