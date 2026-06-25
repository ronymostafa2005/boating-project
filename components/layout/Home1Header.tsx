"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { NavDropdown } from "./NavDropdown";
import { NavbarLogo } from "./NavbarLogo";
import { buildNavItems } from "@/lib/buildNavItems";
import { cn, bodyFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function Home1Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const isHome = pathname === "/";

  const otherLocale = routing.locales.find((l) => l !== locale) as Locale;

  function switchLocale() {
    router.replace(pathname, { locale: otherLocale });
  }

  const navItems = buildNavItems(switchLocale, pathname);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-black/[0.06] bg-white/95 backdrop-blur-md transition-all duration-300">
      <div
        dir="ltr"
        className="container-luxury-nav grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 sm:h-20"
      >
        <Link href="/" className="col-start-1 row-start-1 flex justify-self-start">
          <NavbarLogo locale={locale} textClassName="text-[#1a1a1a]" />
        </Link>

        <nav className="col-start-2 row-start-1 hidden items-center justify-center gap-6 xl:gap-8 lg:flex">
          {navItems.map((item) => (
            <NavDropdown key={item.key} item={item} isActive={isActive} />
          ))}
        </nav>

        <div className="col-start-3 row-start-1 flex shrink-0 items-center justify-self-end gap-2 sm:gap-3">
          <LanguageSwitcher variant="hero" className="inline-flex shrink-0 max-lg:hidden" />
          <Link
            href="/boats"
            className={cn(
              "hidden bg-neera-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-neera-gold-dark sm:inline-flex",
              bodyFontClass(locale)
            )}
          >
            {t("rentNow")}
          </Link>
          <MobileNav variant="hero" showDesktopMenu={isHome} />
        </div>
      </div>
    </header>
  );
}
