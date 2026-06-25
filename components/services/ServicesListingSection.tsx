"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { ShipTypeIcon } from "@/components/home2/ShipTypeIcons";
import { SERVICE_LISTING_ITEMS } from "@/data/services";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function ServicesListingSection() {
  const t = useTranslations("home2");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <section className="services-listing bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="services-listing__grid">
          {SERVICE_LISTING_ITEMS.map((service, index) => (
            <article key={service.key} className="service-listing-card group">
              <div className="service-listing-card__reveal" aria-hidden>
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={IMAGE_QUALITY}
                  loading="lazy"
                />
                <div className="service-listing-card__overlay" />
              </div>

              <div className="service-listing-card__content">
                <ShipTypeIcon index={index} className="service-listing-card__icon" />
                <h2
                  className={cn(
                    "service-listing-card__title",
                    displayFontClass(locale),
                    !isRtl && "uppercase tracking-[0.06em]"
                  )}
                >
                  {t(service.key)}
                </h2>
                <p className={cn("service-listing-card__desc", bodyFontClass(locale))}>
                  {t(service.descKey)}
                </p>
              </div>

              <Link href={`/services/${service.slug}`} className={cn("service-listing-card__btn", bodyFontClass(locale))}>
                {t("knowMore")}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
