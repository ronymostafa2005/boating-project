"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  variant?: "hero" | "dark" | "light";
  showDesktopMenu?: boolean;
  alwaysVisible?: boolean;
}

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "map", href: "/map" },
  { key: "boats", href: "/boats" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

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
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHero = variant === "hero";

  const iconColor = isHero
    ? "text-[#1a1a1a] hover:text-gold"
    : variant === "light"
      ? "text-white hover:text-gold"
      : "text-foreground hover:text-gold";

  return (
    <div className={alwaysVisible || showDesktopMenu ? "" : "lg:hidden"}>
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

      {isOpen && (
        <div
          className={cn(
            "absolute inset-x-0 top-full z-50 border-b backdrop-blur-md",
            isHero
              ? "border-black/10 bg-white/95"
              : "border-luxury-slate bg-luxury-black/95"
          )}
        >
          <nav className="container-luxury flex flex-col gap-1 py-4">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors",
                  isHero
                    ? cn(
                        "hover:bg-black/5 hover:text-gold",
                        pathname === href ? "text-gold" : "text-[#1a1a1a]"
                      )
                    : cn(
                        "hover:bg-luxury-charcoal hover:text-gold",
                        pathname === href && "text-gold"
                      )
                )}
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href="/boats"
              onClick={() => setIsOpen(false)}
              className={cn(
                "mt-2 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider",
                isHero ? "bg-neera-gold text-white" : "btn-primary"
              )}
            >
              {t("rentNow")}
            </Link>
            <div className="mt-4 flex items-center justify-between border-t border-black/10 px-4 pt-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/60">
                {t("language")}
              </span>
              <LanguageSwitcher variant={isHero ? "hero" : variant === "light" ? "light" : "dark"} />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
