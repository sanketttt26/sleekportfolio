import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CalendarBlankIcon } from "@phosphor-icons/react/ssr";
import { Article } from "@/components/article";
import { BlogItem, PillLink } from "@/components/cards";
import { getPost, posts, relatedPosts } from "@/config/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(slug);

  return (
    <article className="container-site pb-16">
      <Link
        href="/blog"
        className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to Blog
      </Link>
      <header className="mt-8 mb-8">
        <p className="flex flex-wrap gap-2 text-xs text-subtle">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
              {tag}
            </Link>
          ))}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-[15px] text-muted">{post.excerpt}</p>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-subtle">
          <CalendarBlankIcon className="h-3.5 w-3.5" />
          {formatDate(post.date)}
        </p>
      </header>
      <Article body={post.body} />
      <section className="mt-16">
        <h2 className="mb-2 text-lg font-semibold">Related posts</h2>
        {related.map((item) => (
          <BlogItem key={item.slug} post={item} />
        ))}
        <div className="mt-4 flex justify-center">
          <PillLink href="/blog">View all blogs</PillLink>
        </div>
      </section>
    </article>
  );
}
