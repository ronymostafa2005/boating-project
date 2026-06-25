"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  PORTFOLIO_ADVANTAGE_KEYS,
  PORTFOLIO_DETAIL_GALLERY,
  PORTFOLIO_FEATURE_KEYS,
} from "@/data/portfolio";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function WheelIcon() {
  return (
    <svg className="portfolio-detail-wheel-icon" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M93.5,44.5L93.5,44.5h-9.9c-0.9-5.3-2.9-10.2-6-14.4l7-7c1-1,1.6-2.4,1.6-3.9c0-1.5-0.6-2.8-1.6-3.9c-2.1-2.1-5.6-2.1-7.8,0 l-7,7c-4.2-3-9.1-5.1-14.4-6V6.5C55.5,3.5,53,1,50,1c-3,0-5.5,2.5-5.5,5.5v9.9c-5.3,0.9-10.2,2.9-14.4,6l-7-7c-1-1-2.4-1.6-3.9-1.6 c-1.5,0-2.8,0.6-3.9,1.6c-2.1,2.1-2.1,5.6,0,7.8l7,7c-3,4.2-5.1,9.1-6,14.4H6.5C3.5,44.5,1,47,1,50c0,3,2.5,5.5,5.5,5.5h9.9 c0.2,0.9,0.3,1.8,0.6,2.7c0.2,0.8,1,1.2,1.7,1c0.8-0.2,1.2-1,1-1.7c-0.6-2.4-0.9-5-0.9-7.5c0-17.2,14-31.1,31.1-31.1 s31.1,14,31.1,31.1S67.2,81.2,50,81.2c-11.1,0-21.5-6-27-15.7c-0.4-0.7-1.3-0.9-2-0.5c-0.7,0.4-0.9,1.3-0.5,2c0.6,1,1.2,2,1.9,2.9 l-7,7c-1,1-1.6,2.4-1.6,3.9c0,1.5,0.6,2.8,1.6,3.9c1,1,2.5,1.6,3.9,1.6c1.4,0,2.8-0.5,3.9-1.6l7-7c0.8,0.6,1.7,1.2,2.6,1.7 c3.6,2.2,7.6,3.6,11.8,4.3v9.9c0,3,2.5,5.5,5.5,5.5c3,0,5.5-2.5,5.5-5.5v-9.9c5.3-0.9,10.2-2.9,14.4-6l7,7c1,1,2.4,1.6,3.9,1.6 c1.5,0,2.8-0.6,3.9-1.6c2.1-2.1,2.1-5.6,0-7.8l-7-7c3-4.2,5.1-9.1,6-14.4h9.9c3,0,5.5-2.5,5.5-5.5C99,47,96.5,44.5,93.5,44.5z" />
      <path d="M50,75.9c14.3,0,25.9-11.6,25.9-25.9c0-14.3-11.6-25.9-25.9-25.9c-14.3,0-25.9,11.6-25.9,25.9C24.1,64.3,35.7,75.9,50,75.9z M50,27c12.7,0,23,10.3,23,23S62.7,73,50,73c-12.7,0-23-10.3-23-23S37.3,27,50,27z" />
    </svg>
  );
}

export function PortfolioDetailSection() {
  const t = useTranslations("portfolioDetail");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = PORTFOLIO_DETAIL_GALLERY[slideIndex];

  return (
    <section className="portfolio-detail-content bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="portfolio-detail-layout">
          <div className="portfolio-detail-gallery">
            <div className="portfolio-detail-gallery__layout">
              <div className="portfolio-detail-gallery__main">
                <Image
                  src={slide.main}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={IMAGE_QUALITY}
                  priority
                />
              </div>
              <div className="portfolio-detail-gallery__thumbs">
                {slide.thumbs.map((src) => (
                  <div key={src} className="portfolio-detail-gallery__thumb">
                    <Image src={src} alt="" fill className="object-cover" sizes="180px" quality={IMAGE_QUALITY} />
                  </div>
                ))}
              </div>
            </div>

            <div className="portfolio-detail-gallery__dots" role="tablist" aria-label={t("galleryLabel")}>
              {PORTFOLIO_DETAIL_GALLERY.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={slideIndex === index}
                  className={cn("portfolio-detail-gallery__dot", slideIndex === index && "is-active")}
                  onClick={() => setSlideIndex(index)}
                  aria-label={t("gallerySlide", { index: index + 1 })}
                />
              ))}
            </div>
          </div>

          <div className={cn("portfolio-detail-copy", bodyFontClass(locale))}>
            <div className="portfolio-detail-block">
              <h2
                className={cn(
                  "portfolio-detail-block__title",
                  displayFontClass(locale),
                  !isRtl && "uppercase tracking-[0.06em]"
                )}
              >
                {t("synopsisTitle")}
              </h2>
              <p className="portfolio-detail-block__text">
                {t.rich("synopsis", { bold: (chunks) => <strong>{chunks}</strong> })}
              </p>
            </div>

            <div className="portfolio-detail-block">
              <h2
                className={cn(
                  "portfolio-detail-block__title",
                  displayFontClass(locale),
                  !isRtl && "uppercase tracking-[0.06em]"
                )}
              >
                {t("featuresTitle")}
              </h2>
              <ul className="portfolio-detail-features">
                {PORTFOLIO_FEATURE_KEYS.map((key) => (
                  <li key={key} className="portfolio-detail-feature">
                    <WheelIcon />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="portfolio-detail-block">
              <h2
                className={cn(
                  "portfolio-detail-block__title",
                  displayFontClass(locale),
                  !isRtl && "uppercase tracking-[0.06em]"
                )}
              >
                {t("benefitsTitle")}
              </h2>
              <p className="portfolio-detail-block__text">{t("benefits")}</p>
            </div>

            <div className="portfolio-detail-block">
              <h2
                className={cn(
                  "portfolio-detail-block__title",
                  displayFontClass(locale),
                  !isRtl && "uppercase tracking-[0.06em]"
                )}
              >
                {t("advantagesTitle")}
              </h2>
              <ul className="portfolio-detail-advantages">
                {PORTFOLIO_ADVANTAGE_KEYS.map((key) => (
                  <li key={key} className="portfolio-detail-feature">
                    <WheelIcon />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
