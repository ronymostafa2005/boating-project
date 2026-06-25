"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { OUR_CREW_TESTIMONIALS, OUR_CREW_TESTIMONIAL_BG } from "@/data/ourCrew";
import type { Locale } from "@/types/locale";

function QuoteMark() {
  return (
    <div className="our-crew-quote-icon-wrapper">
      <div className="our-crew-quote-icon">
        <span>
          <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden>
            <path d="M1,7.2c0.4-0.1,0.7-0.1,1.1-0.1c13.2,0,26.5,0,39.7,0c0.4,0,0.8,0,1.2,0c0,0.3,0.1,0.6,0.1,0.8 c0,14.5,0.3,29-0.1,43.5C42.5,66.1,36,77.5,24.2,85.7c-6.7,4.7-14.3,7-22.4,7.1c-0.3,0-0.5,0-0.8,0c0-4.8,0-9.5,0-14.3 c1.3-0.1,2.8-0.1,4.1-0.3c11.8-1.8,21.1-10.9,23.4-22.8c0.4-1.8,0.4-3.5,0.6-5.5c-9.6,0-18.8,0-28.1,0C1,35.7,1,21.4,1,7.2z" />
            <path d="M99,52.7c-0.3,1.8-0.4,3.5-0.8,5.2c-2.1,11.1-7.7,20-16.5,26.6c-7,5.3-15,8-23.7,8.2c-0.3,0-0.5,0-0.8,0 c-0.1,0-0.1,0-0.2-0.1c0-4.7,0-9.3,0-14.1c9.6-0.3,17.4-4.3,22.9-12.3c3.4-4.8,4.9-10.2,5-16.2c-9.3,0-18.6,0-27.9,0 c0-14.4,0-28.6,0-42.9c0.3,0,0.6,0,0.9,0c13.4,0,26.8,0,40.3,0c0.3,0,0.5,0,0.8,0.1C99,22.4,99,37.6,99,52.7z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="our-crew-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rating;
        return (
          <svg
            key={index}
            className={cn("our-crew-stars__icon", filled && "our-crew-stars__icon--filled")}
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.25"
            aria-hidden
          >
            <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.2L12 18.8 7.6 21.6l1.7-7.2-5.6-4.9 7.4-.6L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}

export function CrewTestimonialsSection() {
  const t = useTranslations("ourCrew");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <section className="our-crew-testimonials relative overflow-hidden">
      <Image
        src={OUR_CREW_TESTIMONIAL_BG}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={IMAGE_QUALITY}
        priority={false}
        aria-hidden
      />
      <div className="our-crew-testimonials__overlay" aria-hidden />

      <div className="container-luxury relative z-10">
        <div className="our-crew-testimonials__grid">
          {OUR_CREW_TESTIMONIALS.map((item, index) => (
            <article
              key={item.id}
              className={cn(
                "our-crew-testimonial group",
                index < OUR_CREW_TESTIMONIALS.length - 1 && "our-crew-testimonial--divider"
              )}
            >
              <div className="our-crew-testimonial__quote">
                <QuoteMark />
                <p className={cn(bodyFontClass(locale), "our-crew-testimonial__text")}>
                  {t(item.quoteKey)}
                </p>
              </div>

              <div className="our-crew-testimonial__footer">
                <div className="our-crew-testimonial__avatar">
                  <Image
                    src={item.image}
                    alt={t(item.nameKey)}
                    fill
                    className="object-cover"
                    sizes="80px"
                    quality={IMAGE_QUALITY}
                  />
                </div>
                <div className="our-crew-testimonial__meta">
                  <h4
                    className={cn(
                      displayFontClass(locale),
                      "our-crew-testimonial__name",
                      !isRtl && "uppercase tracking-[0.04em]"
                    )}
                  >
                    {t(item.nameKey)}
                    {!isRtl && <span aria-hidden> —</span>}
                  </h4>
                  <p
                    className={cn(
                      bodyFontClass(locale),
                      "our-crew-testimonial__role",
                      !isRtl && "uppercase tracking-[0.12em]"
                    )}
                  >
                    {t(item.roleKey)}
                  </p>
                  <StarRating rating={item.rating} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
