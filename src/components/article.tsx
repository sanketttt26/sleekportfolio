import type { PostBlock } from "@/config/content";

export function Article({ body }: { body: PostBlock[] }) {
  return (
    <div className="space-y-5 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
      {body.map((block, index) => {
        if (block.type === "p") {
          return <p key={index}>{block.text}</p>;
        }
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="pt-4 text-lg font-semibold tracking-tight text-foreground"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="space-y-1.5 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="shrink-0 text-subtle">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <blockquote
            key={index}
            className="border-l-2 border-border pl-4 font-serif text-[17px] italic text-foreground"
          >
            {block.text}
          </blockquote>
        );
      })}
    </div>
  );
}
