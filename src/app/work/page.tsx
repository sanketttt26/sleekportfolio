import type { Metadata } from "next";
import { PageHeader } from "@/components/cards";
import { ExperienceList } from "@/components/experience";
import { experience } from "@/config/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Work experiences across companies and roles.",
};

export default function WorkPage() {
  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Work Experience"
        description="Roles, teams, and the work I actually shipped."
      />
      <ExperienceList items={experience} alwaysOpen />
    </div>
  );
}
