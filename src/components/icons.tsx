import { GithubLogoIcon, LinkedinLogoIcon, MediumLogoIcon } from "@phosphor-icons/react/ssr";
import Image, { type StaticImageData } from "next/image";
import type { Tech } from "@/config/content";
import dotnet from "./tech/dotnet.svg";
import javascript from "./tech/javascript.svg";
import mysql from "./tech/mysql.svg";
import nodejs from "./tech/nodejs.svg";
import playwright from "./tech/playwright.svg";
import typescript from "./tech/typescript.svg";

export const socialIcons = {
  linkedin: LinkedinLogoIcon,
  github: GithubLogoIcon,
  medium: MediumLogoIcon,
} as const;

const tech: Record<Tech, { label: string; logo: StaticImageData }> = {
  dotnet: { label: ".NET", logo: dotnet },
  node: { label: "NodeJS", logo: nodejs },
  typescript: { label: "TypeScript", logo: typescript },
  playwright: { label: "Playwright", logo: playwright },
  aspnet: { label: "ASP.NET", logo: dotnet }, // ponytail: no ASP.NET mark in Devicon, it shares .NET's
  javascript: { label: "JavaScript", logo: javascript },
  mysql: { label: "MySQL", logo: mysql },
};

export function TechBadge({ name }: { name: Tech }) {
  const { label, logo } = tech[name];
  return (
    <span className="inline-flex items-center gap-1.5 border border-border bg-card px-2.5 py-1 text-[12px] text-muted">
      <Image src={logo} alt="" width={14} height={14} unoptimized className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
