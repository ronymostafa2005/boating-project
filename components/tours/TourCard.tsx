"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { TourItem } from "@/data/tours";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

function CapacityIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-3.5 w-3", className)} viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M192 0c41.8 0 75.8 33.1 76.7 74.5 44.2 18.3 76.7 61.5 76.7 111.5 0 33.1-13.3 63.2-34.9 85.1l-1.1 1.1c-8.3 8.3-21.9 8.3-30.2 0l-1.1-1.1C256.3 248.2 243 218.1 243 185c0-50 32.5-93.2 76.7-111.5C320.2 33.1 354.2 0 396 0H192zm-96 288c-53 0-96 43-96 96v32c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32v-32c0-53-43-96-96-96H96z" />
    </svg>
  );
}

type Props = {
  tour: TourItem;
  locale: string;
  className?: string;
};

export function TourCard({ tour, locale, className }: Props) {
  const t = useTranslations("tours");
  const tHome = useTranslations("home2");
  const name = t(`items.${tour.descriptionKey}.name`);
  const meta = t(`items.${tour.descriptionKey}.meta`);
  const desc = t(`items.${tour.descriptionKey}.desc`);
  const hasDesc = Boolean(desc);

  return (
    <article className={cn("home2-tour-card-vbo group", className)}>
      <div className="home2-tour-card-vbo__inner">
        <div className="home2-tour-card-vbo__media-block">
          <div className="home2-tour-card-vbo__image-wrap">
            <Link href={`/tours/${tour.slug}`} className="block h-full w-full">
              <Image
                src={tour.image}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width:767px) 420px, 460px"
                quality={IMAGE_QUALITY}
                loading="lazy"
              />
            </Link>
          </div>

          <div className="home2-tour-card-vbo__info text-start">
            {hasDesc ? (
              <p className={cn(bodyFontClass(locale), "home2-tour-card-vbo__desc home2-tour-card-vbo__desc--top")}>
                {desc}
              </p>
            ) : null}

            <div className="home2-tour-card-vbo__title-row">
              <h3 className={cn(displayFontClass(locale), "home2-tour-card-vbo__title")}>
                <Link href={`/tours/${tour.slug}`}>{name}</Link>
              </h3>
              {!hasDesc ? (
                <div className={cn(bodyFontClass(locale), "home2-tour-card-vbo__price-inline")}>
                  <span className="home2-tour-card-vbo__price-value">
                    <span className="text-neera-gold">$</span> {tour.price}
                  </span>
                  <span className="home2-tour-card-vbo__price-unit">{tHome("perRoom")}</span>
                </div>
              ) : null}
            </div>

            <span className={cn(bodyFontClass(locale), "home2-tour-card-vbo__meta")}>{meta}</span>
          </div>
        </div>

        <div className="home2-tour-card-vbo__footer">
          <div className="home2-tour-card-vbo__price-row">
            <div className="home2-tour-card-vbo__capacity" aria-hidden>
              {Array.from({ length: tour.capacity }).map((_, i) => (
                <CapacityIcon key={i} className="text-neera-gold" />
              ))}
            </div>
            {hasDesc ? (
              <div className={cn(bodyFontClass(locale), "home2-tour-card-vbo__price")}>
                <span className="home2-tour-card-vbo__price-value">
                  <span className="text-neera-gold">$</span> {tour.price}
                </span>
                <span className="home2-tour-card-vbo__price-unit">{tHome("perRoom")}</span>
              </div>
            ) : null}
          </div>
          <Link href={`/tours/${tour.slug}`} className={cn(bodyFontClass(locale), "home2-tour-card-vbo__btn")}>
            {tHome("details")}
          </Link>
        </div>
      </div>
    </article>
  );
}
