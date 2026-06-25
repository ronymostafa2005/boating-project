"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ABOUT_PARTNERS } from "@/data/about";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function PortfolioPartnersSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <section className="portfolio-partners bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-luxury">
        <header className="portfolio-partners__header">
          <p className={cn("portfolio-partners__eyebrow", bodyFontClass(locale))}>{t("partnersEyebrow")}</p>
          <h2
            className={cn(
              "portfolio-partners__title",
              displayFontClass(locale),
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.06em]"
            )}
          >
            {t("partnersTitle")}
          </h2>
        </header>

        <div className="partners-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="partner-card group relative min-h-[160px] overflow-hidden bg-[#0f1e2d] sm:min-h-[200px] lg:min-h-[240px]"
            >
              <div className="partner-card-hover-reveal absolute inset-0" aria-hidden>
                <Image
                  src={partner.hoverBg}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  quality={IMAGE_QUALITY}
                  loading="lazy"
                />
                <div className="partner-card-hover-overlay absolute inset-0" />
              </div>

              <div className="relative z-[1] flex h-full min-h-[inherit] items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
                <Image
                  src={partner.logo}
                  alt=""
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                  className="h-auto max-h-[52px] w-auto max-w-[70%] object-contain sm:max-h-[64px] lg:max-h-[76px]"
                  quality={IMAGE_QUALITY}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
