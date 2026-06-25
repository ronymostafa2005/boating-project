"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { SERVICE_ADVENTURE_KEYS } from "@/data/services";
import type { ServiceItem } from "@/data/services";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function WheelIcon() {
  return (
    <svg className="service-detail-wheel-icon" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M93.5,44.5L93.5,44.5h-9.9c-0.9-5.3-2.9-10.2-6-14.4l7-7c1-1,1.6-2.4,1.6-3.9c0-1.5-0.6-2.8-1.6-3.9c-2.1-2.1-5.6-2.1-7.8,0 l-7,7c-4.2-3-9.1-5.1-14.4-6V6.5C55.5,3.5,53,1,50,1c-3,0-5.5,2.5-5.5,5.5v9.9c-5.3,0.9-10.2,2.9-14.4,6l-7-7c-1-1-2.4-1.6-3.9-1.6 c-1.5,0-2.8,0.6-3.9,1.6c-2.1,2.1-2.1,5.6,0,7.8l7,7c-3,4.2-5.1,9.1-6,14.4H6.5C3.5,44.5,1,47,1,50c0,3,2.5,5.5,5.5,5.5h9.9 c0.2,0.9,0.3,1.8,0.6,2.7c0.2,0.8,1,1.2,1.7,1c0.8-0.2,1.2-1,1-1.7c-0.6-2.4-0.9-5-0.9-7.5c0-17.2,14-31.1,31.1-31.1 s31.1,14,31.1,31.1S67.2,81.2,50,81.2c-11.1,0-21.5-6-27-15.7c-0.4-0.7-1.3-0.9-2-0.5c-0.7,0.4-0.9,1.3-0.5,2c0.6,1,1.2,2,1.9,2.9 l-7,7c-1,1-1.6,2.4-1.6,3.9c0,1.5,0.6,2.8,1.6,3.9c1,1,2.5,1.6,3.9,1.6c1.4,0,2.8-0.5,3.9-1.6l7-7c0.8,0.6,1.7,1.2,2.6,1.7 c3.6,2.2,7.6,3.6,11.8,4.3v9.9c0,3,2.5,5.5,5.5,5.5c3,0,5.5-2.5,5.5-5.5v-9.9c5.3-0.9,10.2-2.9,14.4-6l7,7c1,1,2.4,1.6,3.9,1.6 c1.5,0,2.8-0.6,3.9-1.6c2.1-2.1,2.1-5.6,0-7.8l-7-7c3-4.2,5.1-9.1,6-14.4h9.9c3,0,5.5-2.5,5.5-5.5C99,47,96.5,44.5,93.5,44.5z" />
      <path d="M50,75.9c14.3,0,25.9-11.6,25.9-25.9c0-14.3-11.6-25.9-25.9-25.9c-14.3,0-25.9,11.6-25.9,25.9C24.1,64.3,35.7,75.9,50,75.9z M50,27c12.7,0,23,10.3,23,23S62.7,73,50,73c-12.7,0-23-10.3-23-23S37.3,27,50,27z" />
    </svg>
  );
}

type Props = {
  service: ServiceItem;
};

export function ServiceDetailSection({ service }: Props) {
  const t = useTranslations("serviceDetail");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <section className="service-detail-content bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className={cn("service-detail-layout", bodyFontClass(locale))}>
          <div className="service-detail-hero-image">
            <Image
              src={service.heroImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, min(93rem, 88vw)"
              quality={IMAGE_QUALITY}
              priority
            />
          </div>

          <h2
            className={cn(
              "service-detail-hero-title",
              displayFontClass(locale),
              !isRtl && "uppercase tracking-[0.04em]"
            )}
          >
            {t("heroTitle")}
          </h2>

          <p className="service-detail-text">{t("intro")}</p>

          <div className="service-detail-block">
            <h3
              className={cn(
                "service-detail-block__title",
                displayFontClass(locale),
                !isRtl && "uppercase tracking-[0.06em]"
              )}
            >
              {t("amenitiesTitle")}
            </h3>
            <p className="service-detail-text">{t("amenitiesIntro")}</p>

            <div className="service-detail-gallery">
              {service.galleryImages.map((src) => (
                <div key={src} className="service-detail-gallery__item">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={IMAGE_QUALITY}
                  />
                </div>
              ))}
            </div>

            <p className="service-detail-text">{t("amenitiesOutro")}</p>
          </div>

          <div className="service-detail-block">
            <h3
              className={cn(
                "service-detail-block__title",
                displayFontClass(locale),
                !isRtl && "uppercase tracking-[0.06em]"
              )}
            >
              {t("adventureTitle")}
            </h3>

            <ul className="service-detail-features">
              {SERVICE_ADVENTURE_KEYS.map((key) => (
                <li key={key} className="service-detail-feature">
                  <WheelIcon />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="service-detail-text service-detail-text--closing">{t("closing")}</p>
        </div>
      </div>
    </section>
  );
}
