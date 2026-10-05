export const site = {
  name: "Sanket Pawar",
  title: "Developer · Designer",
  email: "sanketpawarsp7781@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  headline: "Developer · Designer",
  bio: "Learning by building and iterating on backend systems. Love to build cool stuff, create content & explore new tech.",
  location: "Pune, India",
  avatar: "/profile.jpg",
  github: "sanketttt26",
  medium: "gxjo",
  ogDescription:
    "Personal site of Sanket Pawar — developer and designer building backend systems and exploring new tech.",
  quote: {
    text: "Never bend your head, always hold it high.",
    author: "Chh. Shivaji Maharaj",
  },
} as const;

export const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sanketpawarsp7781",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    href: `https://github.com/${site.github}`,
    icon: "github",
  },
  {
    name: "Medium",
    href: `https://medium.com/@${site.medium}`,
    icon: "medium",
  },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
] as const;

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Gears", href: "/gears" },
  { label: "Setup", href: "/setup" },
  { label: "Books", href: "/books" },
  { label: "Movies", href: "/movies" },
] as const;
