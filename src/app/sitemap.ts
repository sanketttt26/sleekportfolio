import type { MetadataRoute } from "next";
import { posts, projects } from "@/config/content";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/blog",
    "/resume",
    "/projects",
    "/gears",
    "/setup",
    "/terminal",
    "/books",
    "/movies",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
