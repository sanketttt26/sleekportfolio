import { LinkCard, SectionTitle } from "@/components/cards";
import { ExperienceList } from "@/components/experience";
import { GithubActivity } from "@/components/github-activity";
import { Profile } from "@/components/profile";
import { Quote } from "@/components/quote";
import { experience } from "@/config/content";

export default function HomePage() {
  return (
    <div className="container-site pb-8">
      <Profile />

      <section className="mt-14">
        <SectionTitle>Experience</SectionTitle>
        <ExperienceList items={experience} defaultOpenId={experience[0]?.id} />
      </section>

      <GithubActivity />

      <section id="development" className="mt-16 scroll-mt-24">
        <SectionTitle className="mb-4">Development</SectionTitle>
        <div className="space-y-2.5">
          <LinkCard title="Gears" description="Tools, devices, and software I use to get work done." href="/gears" />
          <LinkCard title="Setup" description="VSCode / Cursor configuration and extensions guide." href="/setup" />
        </div>
      </section>

      <section id="personal" className="mt-16 scroll-mt-24">
        <SectionTitle className="mb-4">Personal</SectionTitle>
        <div className="space-y-2.5">
          <LinkCard title="Books" description="Books that have influenced my thinking and growth." href="/books" />
          <LinkCard title="Movies" description="Films and shows that have inspired and entertained me." href="/movies" />
        </div>
      </section>

      <section className="mt-16">
        <Quote />
      </section>
    </div>
  );
}
