import type { Metadata } from "next";
import { ArrowUpRightIcon, NotePencilIcon } from "@phosphor-icons/react/ssr";
import { BlogItem, EmptyState, PageHeader } from "@/components/cards";
import { site } from "@/config/site";
import { getMediumPosts } from "@/lib/medium";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on engineering, craft, and the quieter parts of building.",
};

const medium = `https://medium.com/@${site.medium}`;

export default async function BlogPage() {
  const posts = await getMediumPosts(site.medium);

  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Blog"
        description="Thoughts, notes, and the occasional rant about making software."
      />
      {posts.length === 0 ? (
        <EmptyState icon={NotePencilIcon} title="Posts live on Medium">
          They couldn&apos;t be loaded right now. Read them on{" "}
          <a href={medium} target="_blank" rel="noreferrer" className="text-foreground underline decoration-border underline-offset-4">
            Medium
          </a>
          .
        </EmptyState>
      ) : (
        <>
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <BlogItem key={post.href} post={post} />
            ))}
          </div>
          <a
            href={medium}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-[13px] text-muted"
          >
            more on medium
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </>
      )}
    </div>
  );
}
