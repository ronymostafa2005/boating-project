"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/locale";

interface LanguageSwitcherProps {
  variant?: "light" | "dark" | "hero";
  className?: string;
}

const FLAG_SRC: Record<Locale, string> = {
  ar: "/images/flags/sa.svg",
  en: "/images/flags/us.svg",
};

export function LanguageSwitcher({
  variant = "dark",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = routing.locales.find((l) => l !== locale) as Locale;

  function switchLocale() {
    router.replace(pathname, { locale: otherLocale });
  }

  const label =
    otherLocale === "ar" ? "Switch to Arabic" : "Switch to English";

  return (
    <button
      type="button"
      onClick={switchLocale}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
        variant === "hero"
          ? "border-[#1a1a1a]/15 bg-white/80 hover:border-[#1a1a1a]/35 hover:bg-white"
          : variant === "light"
            ? "border-white/25 bg-white/10 hover:border-white/45 hover:bg-white/15"
            : "border-luxury-slate bg-luxury-charcoal hover:border-gold",
        className
      )}
      aria-label={label}
      title={label}
    >
      <img
        src={FLAG_SRC[otherLocale]}
        alt=""
        width={24}
        height={16}
        className="h-4 w-6 rounded-[2px] object-cover shadow-sm"
        aria-hidden
      />
    </button>
  );
}
