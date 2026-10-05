import type { Metadata } from "next";
import { Cover, PageHeader } from "@/components/cards";
import { movies } from "@/config/content";

export const metadata: Metadata = {
  title: "Movies",
  description: "Films and shows that have inspired and entertained me.",
};

export default function MoviesPage() {
  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Movies"
        description="A few films and shows I return to when I need to remember how pacing works."
      />
      <div className="space-y-10">
        {movies.map((group) => (
          <section key={group.category}>
            <h2 className="mb-4 flex items-baseline gap-2 text-lg font-semibold tracking-tight">
              <span className="text-subtle">##</span>
              {group.category}
              <span className="text-[13px] font-normal text-subtle">{group.items.length}</span>
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
              {group.items.map((item, index) => (
                <li key={item.title}>
                  <Cover
                    title={item.title}
                    label={item.meta}
                    index={index}
                    src={item.tmdb && `https://image.tmdb.org/t/p/w342/${item.tmdb}.jpg`}
                  />
                  <p className="mt-3 text-[14px] font-medium leading-snug">{item.title}</p>
                  <p className="mt-0.5 text-[13px] text-muted">{item.meta}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-10 text-[12px] text-subtle">
        Posters from{" "}
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4">
          TMDB
        </a>
        .
      </p>
    </div>
  );
}
