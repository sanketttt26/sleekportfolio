import type { Metadata } from "next";
import { NotePencilIcon } from "@phosphor-icons/react/ssr";
import { BlogItem, EmptyState, PageHeader } from "@/components/cards";
import { posts, postTags } from "@/config/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on engineering, craft, and the quieter parts of building.",
};

export default async function BlogPage({
  searchParams,
}: PageProps<"/blog">) {
  const { tag } = await searchParams;
  const active = typeof tag === "string" ? tag : "All";
  const filtered =
    active === "All"
      ? posts
      : posts.filter((post) => post.tags.includes(active));

  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Blog"
        description="Thoughts, notes, and the occasional rant about making software."
      />
      {posts.length === 0 ? (
        <EmptyState icon={NotePencilIcon} title="No posts yet">
          The first one is still in drafts. Follow the{" "}
          <a href="/rss.xml" className="text-foreground underline decoration-border underline-offset-4">
            RSS feed
          </a>{" "}
          to catch it when it lands.
        </EmptyState>
      ) : (
        <div className="mb-6 flex flex-wrap gap-2">
          {postTags.map((item) => {
            const href = item === "All" ? "/blog" : `/blog?tag=${encodeURIComponent(item)}`;
            const isActive = item === active;
            return (
              <a
                key={item}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "border px-3 py-1 text-xs transition",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted",
                )}
              >
                {item}
              </a>
            );
          })}
        </div>
      )}
      <div>
        {filtered.map((post) => (
          <BlogItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
