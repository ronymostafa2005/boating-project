"use client";

import { useLocale, useTranslations } from "next-intl";
import { TourAvailabilityCalendar } from "@/components/tours/TourAvailabilityCalendar";
import { TourBookingSearch } from "@/components/tours/TourBookingSearch";
import { TourCard } from "@/components/tours/TourCard";
import { TOUR_LISTING_ITEMS } from "@/data/tours";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function RoomAvailabilitySection() {
  const t = useTranslations("tours");
  const locale = useLocale() as Locale;
  const previewTours = TOUR_LISTING_ITEMS.slice(0, 4);

  return (
    <section className="room-availability bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="room-availability__intro">
          <h2 className={cn("room-availability__title", displayFontClass(locale))}>{t("roomAvailabilityTitle")}</h2>
          <p className={cn("room-availability__text", bodyFontClass(locale))}>{t("roomAvailabilityIntro")}</p>
        </div>

        <div className="room-availability__search-panel">
          <TourBookingSearch showRoomSelector submitLabel={t("search")} />
        </div>

        <div className="room-availability__master-calendar">
          <TourAvailabilityCalendar />
        </div>

        <div className="room-availability__preview">
          <h3 className={cn("room-availability__preview-title", displayFontClass(locale))}>
            {t("featuredTours")}
          </h3>
          <div className="tour-listing__grid tour-listing__grid--compact">
            {previewTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} locale={locale} className="tour-listing__card" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
