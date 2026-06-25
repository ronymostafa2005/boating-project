"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Home2MenuToggle } from "./Home2MenuToggle";
import { NavDropdown } from "./NavDropdown";
import { NavbarLogo } from "./NavbarLogo";
import { buildNavItems } from "@/lib/buildNavItems";
import { cn, bodyFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 16.5V13.5C6 8.80558 9.80558 5 14.5 5C19.1944 5 23 8.80558 23 13.5V16.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect x="4" y="15" width="4.5" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="19.5" y="15" width="4.5" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function TopBarSeparator() {
  return <span className="text-white/35" aria-hidden>|</span>;
}

export function Home2Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = !scrolled;

  const navItems = buildNavItems();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const topLinkClass = "text-white/75 transition-colors hover:text-white";

  return (
    <header
      className={cn(
        "home2-header fixed inset-x-0 top-0 z-[100] w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "border-b border-white/10 bg-deep-sea/95 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-md"
      )}
    >
      <div className={cn("home2-top-bar hidden border-b lg:block", isTransparent ? "border-white/10" : "border-white/10")}>
        <div dir="ltr" className="container-luxury flex items-center justify-between gap-4 py-2.5">
          <div
            className={cn(
              bodyFontClass(locale),
              "flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-white/75 sm:text-[11px]"
            )}
          >
            <a href={`tel:${t("topBarPhone").replace(/\s/g, "")}`} className={topLinkClass}>
              {t("topBarPhone")}
            </a>
            <TopBarSeparator />
            <span>{t("topBarAddress")}</span>
            <TopBarSeparator />
            <a href={`mailto:${t("topBarEmail")}`} className={topLinkClass}>
              {t("topBarEmail")}
            </a>
          </div>

          <div
            className={cn(
              bodyFontClass(locale),
              "flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-white/75 sm:text-[11px]"
            )}
          >
            <Link href="/faq" className={topLinkClass}>
              {t("faq")}
            </Link>
            <TopBarSeparator />
            <Link href="/terms" className={topLinkClass}>
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>

      <div
        dir="ltr"
        className="container-luxury grid min-h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-3 py-3 sm:min-h-[76px] sm:gap-4 sm:py-4 lg:min-h-[84px]"
      >
        <nav className="col-start-1 row-start-1 hidden items-center gap-5 justify-self-start xl:gap-7 lg:flex">
          {navItems.map((item) => (
            <NavDropdown key={item.key} item={item} isActive={isActive} variant="light" />
          ))}
        </nav>

        <Link href="/" className="col-start-2 row-start-1 justify-self-center" aria-label="Boating.sa">
          <NavbarLogo
            locale={locale}
            textClassName="text-white"
            descriptorClassName="text-champagne"
          />
        </Link>

        <div className="col-start-3 row-start-1 flex items-center justify-self-end gap-3 sm:gap-4 lg:gap-5">
          <div className="hidden items-center gap-2.5 xl:flex">
            <HeadsetIcon className="text-white/85" />
            <div className="leading-tight">
              <span
                className={cn(
                  bodyFontClass(locale),
                  "block text-[9px] font-medium uppercase tracking-[0.18em] text-white/65"
                )}
              >
                {t("callUs")}
              </span>
              <a
                href={`tel:${t("callPhone").replace(/\s/g, "")}`}
                className={cn(
                  bodyFontClass(locale),
                  "text-[12px] font-medium tracking-wide text-white transition-colors hover:text-neera-gold"
                )}
              >
                {t("callPhone")}
              </a>
            </div>
          </div>

          <LanguageSwitcher variant="light" className="inline-flex shrink-0 max-lg:hidden" />

          <Link href="/contact" className={cn("home2-quote-btn hidden sm:inline-flex", bodyFontClass(locale))}>
            {t("requestQuote")}
          </Link>

          <Home2MenuToggle navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
