// Blog posts come from the author's Medium RSS feed.
// No "@/" imports here so `node --test` can load this file directly.

export type MediumPost = {
  title: string;
  href: string;
  date: string;
  tags: string[];
  excerpt: string;
  minutes: number;
  image?: string;
};

const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (match, code: string) => {
    if (code[0] !== "#") return entities[code.toLowerCase()] ?? match;
    return String.fromCodePoint(code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10));
  });
}

function unwrap(value: string) {
  return value.replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "").trim();
}

function field(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? unwrap(match[1]) : "";
}

// ponytail: regex over Medium's fixed RSS shape; swap in an XML parser if the feed format ever changes
export function parseFeed(xml: string): MediumPost[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const html = field(item, "content:encoded");
    const text = decode(
      html
        .replace(/<figure[\s\S]*?<\/figure>/g, "")
        .replace(/<\/(p|h\d|li|blockquote|pre)>|<br\s*\/?>/g, " ")
        .replace(/<[^>]+>/g, ""),
    )
      .replace(/\s+/g, " ")
      .trim();
    return {
      title: decode(field(item, "title")),
      href: field(item, "link").split("?")[0],
      date: new Date(field(item, "pubDate")).toISOString(),
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(([, tag]) => unwrap(tag)),
      excerpt: text.length > 180 ? `${text.slice(0, 180).replace(/\s+\S*$/, "")}…` : text,
      minutes: Math.max(1, Math.round(text.split(" ").length / 200)),
      image: html.match(/<img[^>]+src="(https:\/\/(?:cdn-images-1|miro)\.medium\.com\/[^"]+)"/)?.[1],
    };
  });
}

export async function getMediumPosts(user: string): Promise<MediumPost[]> {
  try {
    const res = await fetch(`https://medium.com/feed/@${user}`, { next: { revalidate: 3600 } });
    return res.ok ? parseFeed(await res.text()) : [];
  } catch {
    return []; // feed down: pages fall back to a link to Medium
  }
}
