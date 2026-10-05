import type { Metadata } from "next";
import { Cover, PageHeader } from "@/components/cards";
import { books } from "@/config/content";

export const metadata: Metadata = {
  title: "Books",
  description: "Books that have influenced my thinking and growth.",
};

export default function BooksPage() {
  return (
    <div className="container-site pb-16">
      <PageHeader
        title="Books"
        description="A shelf, not a flex. These are the ones I still quote in conversation."
      />
      <div className="space-y-10">
        {books.map((group) => (
          <section key={group.category}>
            <h2 className="mb-4 flex items-baseline gap-2 text-lg font-semibold tracking-tight">
              <span className="text-subtle">##</span>
              {group.category}
              <span className="text-[13px] font-normal text-subtle">{group.items.length}</span>
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
              {group.items.map((book, index) => (
                <li key={book.title}>
                  <Cover
                    title={book.title}
                    label={book.author}
                    index={index}
                    book
                    src={book.isbn && `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                  />
                  <p className="mt-3 text-[14px] font-medium leading-snug">{book.title}</p>
                  <p className="mt-0.5 text-[13px] text-muted">{book.author}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
