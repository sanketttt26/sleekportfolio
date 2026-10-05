import Link from "next/link";
import { footerNav, site, socials } from "@/config/site";
import { socialIcons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-4 text-[12px] text-subtle">
            {"// navigate"}
          </p>
          <div className="grid max-w-xs grid-cols-2 gap-x-10 gap-y-2 text-[13px]">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted lowercase"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-[12px] text-subtle">
            {"// connect"}
          </p>
          <div className="flex gap-3">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.name}
                  className="text-muted grayscale"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site py-6 text-xs text-subtle">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
