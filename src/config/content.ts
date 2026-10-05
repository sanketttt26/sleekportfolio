export type Tech =
  | "dotnet"
  | "node"
  | "typescript"
  | "playwright"
  | "aspnet"
  | "javascript"
  | "mysql";

export type Experience = {
  id: string;
  // Leave out to keep the employer private: the UI shows a blurred placeholder
  // and the real name is never in the source, HTML, or client payload.
  company?: string;
  role: string;
  working?: boolean;
  start: string;
  end: string;
  startShort: string;
  endShort: string;
  location: string;
  locationShort: string;
  tech: Tech[];
  highlights: string[];
};

export const experience: Experience[] = [
  {
    id: "trainee",
    role: "Trainee",
    working: true,
    start: "Aug 2025",
    end: "Present",
    startShort: "Aug 2025",
    endShort: "Present",
    location: "Pune, India (On-Site)",
    locationShort: "Pune, India",
    tech: ["dotnet", "node", "typescript", "playwright"],
    highlights: [
      "Optimized website and application performance, resulting in improved user experience and system efficiency.",
      "Developed and maintained internal tools and infrastructure to support business operations and team productivity.",
      "Collaborated cross-functionally with development teams to design, implement, and deploy scalable internal solutions.",
    ],
  },
  {
    id: "intern",
    role: "Intern",
    start: "Jan 2025",
    end: "July 2025",
    startShort: "Jan 2025",
    endShort: "July 2025",
    location: "Pune, India (On-Site)",
    locationShort: "Pune, India",
    tech: ["aspnet", "javascript", "mysql"],
    highlights: [
      "Collaborated with cross-functional teams to gain hands-on experience in technologies such as .NET, Springboot, C#, Angular.",
    ],
  },
];

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  body: PostBlock[];
};

export const posts: Post[] = [];

export const postTags = [
  "All",
  ...Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;
  href?: string;
  repo?: string;
  tags: string[];
  highlights: string[];
};

export const projects: Project[] = [];

export const gears = {
  devices: [
    { name: "Lenovo IdeaPad Gaming 3" },
    { name: "Redragon K617" },
  ],
  software: [
    { name: "VS Code", href: "https://code.visualstudio.com" },
    { name: "Cursor", href: "https://cursor.com" },
    { name: "Antigravity" },
  ],
  extensions: [
    { name: "Prettier" },
    { name: "ESLint" },
    { name: "CodeLLDB" },
    { name: "Codex" },
    { name: "Figma" },
    { name: "Git Graph" },
    { name: "vscode-pets" },
  ],
};

// isbn -> cover from Open Library; leave it out for a typographic cover
export const books: {
  category: string;
  items: { title: string; author: string; isbn?: string }[];
}[] = [
  {
    category: "Reading",
    items: [
      { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", isbn: "9781544514215" },
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", isbn: "9781449373320" },
    ],
  },
];

// tmdb -> poster path on The Movie Database (image.tmdb.org); leave it out for a typographic poster
export const movies: {
  category: string;
  items: { title: string; meta: string; tmdb?: string }[];
}[] = [
  {
    category: "Films & shows",
    items: [
      { title: "Interstellar", meta: "Film", tmdb: "yQvGrMoipbRoddT0ZR8tPoR7NfX" },
      { title: "The Billion Dollar Code", meta: "TV Series", tmdb: "uWIqi6oer1eBX8C6DP6vIiVhs95" },
      { title: "The Playlist", meta: "TV Series", tmdb: "yc1JCG56UHsbRDhEzX9VlTEToyk" },
      { title: "Silicon Valley", meta: "TV Series", tmdb: "4ptpmWBVD9HY9hMh8Cbs6SMiy7p" },
    ],
  },
];

export const editorSettings = `{
  "editor.fontFamily": "Geist Mono, JetBrains Mono, Menlo, monospace",
  "editor.fontSize": 14,
  "editor.lineHeight": 1.7,
  "editor.minimap.enabled": false,
  "editor.stickyScroll.enabled": true,
  "editor.tabSize": 2,
  "editor.renderWhitespace": "selection",
  "workbench.colorTheme": "Vim",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`;

export const extensionsList = `esbenp.prettier-vscode
dbaeumer.vscode-eslint
vadimcn.vscode-lldb
openai.chatgpt
figma.figma-vscode-extension
mhutchie.git-graph
tonybaloney.vscode-pets
`;

export const zshrc = `# ~/.zshrc
export EDITOR="cursor"
export PATH="$HOME/.local/bin:$PATH"

eval "$(starship init zsh)"

alias g="git"
alias gs="git status -sb"
`;

export const starship = `# ~/.config/starship.toml
format = "$directory$git_branch$git_status$character"

[directory]
style = "bold"
truncation_length = 3

[character]
success_symbol = "[→](bold)"
error_symbol = "[→](bold red)"
`;

export const fastfetch = `{
  "logo": { "type": "small" },
  "display": { "separator": "  " },
  "modules": ["os", "host", "kernel", "uptime", "packages", "memory", "shell"]
}
`;

export const education: {
  school: string;
  degree: string;
  years: string;
  location: string;
}[] = [];

export const skills = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "C#", "SQL"],
  },
  {
    label: "Stack",
    items: [".NET", "ASP.NET", "Node.js", "MySQL", "Playwright"],
  },
  {
    label: "Also",
    items: ["Spring Boot", "Angular", "VS Code", "Cursor"],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function relatedPosts(slug: string, count = 3) {
  const current = getPost(slug);
  if (!current) return posts.slice(0, count);
  const scored = posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date));
  return scored.slice(0, count).map((entry) => entry.post);
}
