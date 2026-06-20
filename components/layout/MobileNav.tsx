"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  variant?: "hero" | "dark" | "light";
  showDesktopMenu?: boolean;
  alwaysVisible?: boolean;
}

type MobileNavLink = {
  key: string;
  href?: string;
  children?: { key: string; href: string }[];
};

const navItems: MobileNavLink[] = [
  {
    key: "home",
    children: [
      { key: "homeMarine", href: "/" },
      { key: "homeYacht", href: "/home-2" },
    ],
  },
  { key: "about", href: "/about" },
  { key: "map", href: "/map" },
  { key: "boats", href: "/boats" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

function TwoLineMenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
      <path d="M0 1H22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 11H22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MobileNav({ variant = "dark", showDesktopMenu = false, alwaysVisible = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ home: true });
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHero = variant === "hero";

  const switcherVariant = isHero ? "hero" : variant === "light" ? "light" : "dark";

  const linkColor = (href: string) =>
    isHero
      ? cn("hover:bg-black/5 hover:text-gold", pathname === href ? "text-gold" : "text-[#1a1a1a]")
      : cn("hover:bg-luxury-charcoal hover:text-gold", pathname === href && "text-gold");

  const sectionIsActive = (item: MobileNavLink) =>
    item.children?.some((child) => pathname === child.href) ?? false;

  function toggleSection(key: string) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const iconColor = isHero
    ? "text-[#1a1a1a] hover:text-gold"
    : variant === "light"
      ? "text-white hover:text-gold"
      : "text-foreground hover:text-gold";

  return (
    <div className={cn("relative", alwaysVisible || showDesktopMenu ? "" : "lg:hidden")}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn("p-2 transition-colors", iconColor)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <TwoLineMenuIcon />
        )}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="mobile-nav-backdrop fixed inset-0 top-[72px] z-[110] bg-black/40 sm:top-20 lg:hidden"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "mobile-nav-panel fixed inset-x-0 top-[72px] z-[120] min-h-[calc(100dvh-72px)] max-h-[calc(100dvh-72px)] overflow-y-auto border-b sm:top-20 sm:min-h-[calc(100dvh-5rem)] sm:max-h-[calc(100dvh-5rem)]",
              "lg:absolute lg:inset-x-0 lg:top-full lg:z-50 lg:min-h-0 lg:max-h-none lg:overflow-visible",
              isHero
                ? "border-black/10 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] lg:bg-white/95 lg:backdrop-blur-md"
                : "border-luxury-slate bg-luxury-black shadow-[0_12px_40px_rgba(0,0,0,0.35)] lg:bg-luxury-black/95 lg:backdrop-blur-md"
            )}
          >
            <nav className="container-luxury flex flex-col gap-1 py-4 pb-8">
              {navItems.map((item) => {
                if (item.children?.length) {
                  const expanded = openSections[item.key] ?? false;
                  const active = sectionIsActive(item);

                  return (
                    <div key={item.key}>
                      <button
                        type="button"
                        onClick={() => toggleSection(item.key)}
                        className={cn(
                          "flex w-full items-center justify-between rounded px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors",
                          isHero
                            ? cn("hover:bg-black/5 hover:text-gold", active ? "text-gold" : "text-[#1a1a1a]")
                            : cn("hover:bg-luxury-charcoal hover:text-gold", active && "text-gold")
                        )}
                        aria-expanded={expanded}
                      >
                        {t(item.key)}
                        <svg
                          className={cn("h-3.5 w-3.5 shrink-0 transition-transform", expanded && "rotate-180")}
                          viewBox="0 0 8 5"
                          fill="none"
                          aria-hidden
                        >
                          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </button>

                      {expanded ? (
                        <div className="flex flex-col gap-0.5 pb-1 ps-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "rounded px-4 py-2.5 text-sm font-medium transition-colors",
                                linkColor(child.href)
                              )}
                            >
                              {t(child.key)}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href!}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors",
                      linkColor(item.href!)
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}

              <div
                className={cn(
                  "mobile-nav-lang mx-4 mt-3 flex items-center justify-between rounded-sm border px-4 py-3",
                  isHero ? "border-black/10 bg-[#f4efe8]" : "border-white/15 bg-luxury-charcoal"
                )}
              >
                <span
                  className={cn(
                    "text-[11px] font-medium uppercase tracking-[0.14em]",
                    isHero ? "text-[#1a1a1a]/65" : "text-white/70"
                  )}
                >
                  {t("language")}
                </span>
                <LanguageSwitcher variant={switcherVariant} />
              </div>

              <Link
                href="/boats"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "mx-4 mt-4 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider",
                  isHero ? "bg-neera-gold text-white" : "btn-primary"
                )}
              >
                {t("rentNow")}
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
