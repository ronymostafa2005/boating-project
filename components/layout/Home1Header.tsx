"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
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
  const locale = useLocale() as Locale;

  const navItems = buildNavItems();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="home1-header fixed inset-x-0 top-0 z-[100] w-full overflow-visible border-b border-black/[0.06] bg-white/95 backdrop-blur-md transition-all duration-300">
      <div
        dir="ltr"
        className="container-luxury-nav grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 sm:h-20"
      >
        <Link href="/" className="col-start-1 row-start-1 flex justify-self-start">
          <NavbarLogo
            locale={locale}
            textClassName="text-deep-sea"
            descriptorClassName="text-deep-sea/65"
          />
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
              "hidden bg-neera-gold px-10 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neera-gold-dark sm:inline-flex",
              bodyFontClass(locale)
            )}
          >
            {t("rentNow")}
          </Link>
          <MobileNav variant="hero" />
        </div>
      </div>
    </header>
  );
}
