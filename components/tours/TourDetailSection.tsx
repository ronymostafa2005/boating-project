"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { TourAvailabilityCalendar } from "@/components/tours/TourAvailabilityCalendar";
import { TourBookingSearch } from "@/components/tours/TourBookingSearch";
import type { TourItem } from "@/data/tours";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

type Props = {
  tour: TourItem;
};

export function TourDetailSection({ tour }: Props) {
  const t = useTranslations("tours");
  const tHome = useTranslations("home2");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";
  const [activeImage, setActiveImage] = useState(0);
  const name = t(`items.${tour.descriptionKey}.name`);
  const meta = t(`items.${tour.descriptionKey}.meta`);
  const description = t(`items.${tour.descriptionKey}.description`);

  return (
    <section className="tour-detail bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="tour-detail__layout">
          <div className="tour-detail__main">
            <div className="tour-detail-gallery">
              <div className="tour-detail-gallery__main">
                <Image
                  src={tour.gallery[activeImage] ?? tour.image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  quality={IMAGE_QUALITY}
                  priority
                />
              </div>
              {tour.gallery.length > 1 ? (
                <div className="tour-detail-gallery__thumbs">
                  {tour.gallery.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      className={cn("tour-detail-gallery__thumb", activeImage === index && "is-active")}
                      onClick={() => setActiveImage(index)}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="120px" quality={IMAGE_QUALITY} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="tour-detail__copy">
              <h2 className={cn("tour-detail__name", displayFontClass(locale), !isRtl && "uppercase")}>
                {name}
              </h2>
              <p className={cn("tour-detail__meta", bodyFontClass(locale))}>{meta}</p>
              <p className={cn("tour-detail__price", bodyFontClass(locale))}>
                <span className="text-neera-gold">$</span> {tour.price}{" "}
                <span className="tour-detail__price-unit">{tHome("perRoom")}</span>
              </p>
              <p className={cn("tour-detail__description", bodyFontClass(locale))}>{description}</p>
            </div>
          </div>

          <aside className="tour-detail__sidebar">
            <div className="tour-detail-booking">
              <h3 className={cn("tour-detail-booking__title", displayFontClass(locale))}>
                {t("checkAvailability")}
              </h3>
              <TourBookingSearch tourSlug={tour.slug} submitLabel={t("bookNow")} />
              <div className="tour-detail-booking__calendar">
                <h4 className={cn("tour-detail-booking__calendar-title", bodyFontClass(locale))}>
                  {t("availabilityCalendar")}
                </h4>
                <TourAvailabilityCalendar compact />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
