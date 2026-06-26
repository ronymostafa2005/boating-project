"use client";

import { useRouter } from "@/lib/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn, bodyFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

type Props = {
  tourSlug?: string;
  showRoomSelector?: boolean;
  submitLabel?: string;
  className?: string;
};

export function TourBookingSearch({
  tourSlug,
  showRoomSelector = true,
  submitLabel,
  className,
}: Props) {
  const t = useTranslations("tours");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    if (tourSlug) params.set("tour", tourSlug);
    params.set("checkIn", String(data.get("checkIn") ?? ""));
    params.set("checkOut", String(data.get("checkOut") ?? ""));
    params.set("rooms", String(data.get("rooms") ?? "1"));
    params.set("adults", String(data.get("adults") ?? "2"));
    params.set("children", String(data.get("children") ?? "0"));
    router.push(`/booking-details?${params.toString()}`);
  };

  return (
    <form className={cn("tour-booking-search", className)} onSubmit={handleSubmit}>
      <div className="tour-booking-search__row">
        <label className={cn("tour-booking-search__field", bodyFontClass(locale))}>
          <span>{t("checkIn")}</span>
          <input type="date" name="checkIn" required />
        </label>
        <label className={cn("tour-booking-search__field", bodyFontClass(locale))}>
          <span>{t("checkOut")}</span>
          <input type="date" name="checkOut" required />
        </label>
      </div>

      {showRoomSelector ? (
        <div className="tour-booking-search__row tour-booking-search__row--3">
          <label className={cn("tour-booking-search__field", bodyFontClass(locale))}>
            <span>{t("rooms")}</span>
            <select name="rooms" defaultValue="1">
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className={cn("tour-booking-search__field", bodyFontClass(locale))}>
            <span>{t("adults")}</span>
            <select name="adults" defaultValue="2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className={cn("tour-booking-search__field", bodyFontClass(locale))}>
            <span>{t("children")}</span>
            <select name="children" defaultValue="0">
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <button type="submit" className={cn("tour-booking-search__submit", bodyFontClass(locale))}>
        {submitLabel ?? t("search")}
      </button>
    </form>
  );
}
