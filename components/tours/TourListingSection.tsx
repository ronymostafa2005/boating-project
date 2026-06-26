"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TOUR_LOCATION_FILTERS, getToursByLocation, type TourLocation } from "@/data/tours";
import { TourCard } from "@/components/tours/TourCard";
import { cn, bodyFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function TourListingSection() {
  const t = useTranslations("tours");
  const locale = useLocale() as Locale;
  const [activeLocation, setActiveLocation] = useState<TourLocation>("all");
  const tours = getToursByLocation(activeLocation);

  return (
    <section className="tour-listing bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <nav className={cn("tour-listing__filters", bodyFontClass(locale))} aria-label={t("filterLabel")}>
          {TOUR_LOCATION_FILTERS.map((location) => (
            <button
              key={location}
              type="button"
              className={cn("tour-listing__filter", activeLocation === location && "is-active")}
              onClick={() => setActiveLocation(location)}
            >
              {t(`locations.${location}`)}
            </button>
          ))}
        </nav>

        <div className="tour-listing__grid">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} locale={locale} className="tour-listing__card" />
          ))}
        </div>
      </div>
    </section>
  );
}
