import type { Metadata } from "next";
import { PageHeader } from "@/components/cards";
import { CodeBlock } from "@/components/code-block";
import { editorSettings, extensionsList } from "@/config/content";

export const metadata: Metadata = {
  title: "Setup",
  description: "VSCode / Cursor configuration and extensions guide.",
};

const steps = [
  {
    title: "Install the font",
    body: "Geist Mono or JetBrains Mono. One monospace is enough.",
  },
  {
    title: "Import extensions",
    body: "Paste the list below into the Extensions view search, or install them one by one.",
  },
  {
    title: "Replace settings.json",
    body: "Command Palette → Preferences: Open User Settings (JSON), then paste.",
  },
];

export default function SetupPage() {
  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Setup"
        description="VSCode / Cursor configuration and extensions guide."
      />
      <ol className="mb-10 space-y-5">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-border bg-card text-xs">
              {index + 1}
            </span>
            <div>
              <p className="text-[15px] font-medium">{step.title}</p>
              <p className="text-[13px] text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="space-y-6">
        <CodeBlock filename="extensions.txt" code={extensionsList} />
        <CodeBlock filename="settings.json" code={editorSettings} />
      </div>
    </div>
  );
}
