"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { PORTFOLIO_LISTING_ITEMS } from "@/data/portfolio";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function SliderChevron({ flip }: { flip?: boolean }) {
  return (
    <svg
      className={cn("h-5 w-5", flip && "scale-x-[-1]")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PortfolioListingSection() {
  const t = useTranslations("portfolio");
  const tHome2 = useTranslations("home2");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(
    (dir: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>(".portfolio-listing-card");
      const cardWidth = card?.offsetWidth ?? 280;
      const gap = 12;
      el.scrollBy({ left: dir * (cardWidth + gap) * (isRtl ? -1 : 1), behavior: "smooth" });
    },
    [isRtl]
  );

  return (
    <section className="portfolio-listing bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-luxury">
        <header className="portfolio-listing__header">
          <p className={cn("portfolio-listing__eyebrow", bodyFontClass(locale))}>{t("eyebrow")}</p>
          <h2
            className={cn(
              "portfolio-listing__title",
              displayFontClass(locale),
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
            )}
          >
            {t("heading")}
          </h2>
        </header>

        <div className="portfolio-listing__slider-wrap">
          <button
            type="button"
            className="portfolio-listing__arrow portfolio-listing__arrow--prev"
            onClick={() => scroll(-1)}
            aria-label={tHome2("heroPrev")}
          >
            <SliderChevron flip={!isRtl} />
          </button>

          <div className="portfolio-listing__viewport">
            <div ref={scrollRef} className="portfolio-listing__track">
              {PORTFOLIO_LISTING_ITEMS.map((item) => (
                <article key={item.slug} className="portfolio-listing-card group">
                  <div className="portfolio-listing-card__media">
                    <Image
                      src={item.image}
                      alt={tHome2(item.nameKey)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 70vw, (max-width:1024px) 32vw, 18vw"
                      quality={IMAGE_QUALITY}
                      loading="lazy"
                    />
                    <div className="portfolio-listing-card__shade" aria-hidden />
                    <div className="portfolio-listing-card__hover-overlay" aria-hidden />

                    <div className="portfolio-listing-card__content">
                      <span className={cn("portfolio-listing-card__location", bodyFontClass(locale))}>
                        {tHome2(item.locationKey)}
                      </span>
                      <h3 className={cn("portfolio-listing-card__name", displayFontClass(locale))}>
                        <Link href={`/portfolio/${item.slug}`}>{tHome2(item.nameKey)}</Link>
                      </h3>
                      <Link href={`/portfolio/${item.slug}`} className={cn("portfolio-listing-card__btn", bodyFontClass(locale))}>
                        {tHome2("portfolioViewDetails")}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="portfolio-listing__arrow portfolio-listing__arrow--next"
            onClick={() => scroll(1)}
            aria-label={tHome2("heroNext")}
          >
            <SliderChevron flip={isRtl} />
          </button>
        </div>
      </div>
    </section>
  );
}
