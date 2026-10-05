import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Oneko } from "@/components/oneko";
import { Providers } from "@/components/providers";
import { site } from "@/config/site";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.ogDescription,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: site.name,
    description: site.ogDescription,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.ogDescription,
  },
  icons: {
    icon: "/profile.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background font-sans text-foreground">
        <Providers>
          <Header />
          <main className="relative flex-1">{children}</main>
          <Footer />
          <Oneko />
        </Providers>
      </body>
    </html>
  );
}
