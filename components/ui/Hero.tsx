"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import type { Locale } from "@/types/locale";

const heroSlides = [
  {
    id: 1,
    src: "/images/hero/hero-slide-1.png",
    thumb: "/images/hero/hero-slide-1.png",
    alt: "Luxury yacht journey at sea",
  },
  {
    id: 2,
    src: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-2.jpg",
    thumb: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-2.jpg",
    alt: "Luxury yacht on open water",
  },
  {
    id: 3,
    src: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-two-1.jpg",
    thumb: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-two-1.jpg",
    alt: "Aerial yacht view",
  },
];

interface HeroProps {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  exploreText: string;
  exploreHref: string;
  viewVideoText: string;
  prevLabel: string;
  nextLabel: string;
  locale: Locale;
}

export function Hero({
  eyebrow,
  titleLine1,
  titleLine2,
  description,
  exploreText,
  exploreHref,
  viewVideoText,
  prevLabel,
  nextLabel,
  locale,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isRtl = locale === "ar";

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  }, []);

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const prevIndex =
    (activeIndex - 1 + heroSlides.length) % heroSlides.length;
  const nextIndex = (activeIndex + 1) % heroSlides.length;

  const sliderThumbs = useMemo(
    () => [
      { slide: heroSlides[prevIndex], index: prevIndex, role: "prev" as const },
      { slide: heroSlides[nextIndex], index: nextIndex, role: "next" as const },
    ],
    [prevIndex, nextIndex]
  );

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background — active slide only (faster load) */}
      <div className="absolute inset-0">
        <Image
          key={heroSlides[activeIndex].id}
          src={heroSlides[activeIndex].src}
          alt={heroSlides[activeIndex].alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={IMAGE_QUALITY}
        />
      </div>

      {/* Neera-style overlay: dark left for text, lighter top/right for header & slider */}
      <div
        className={cn(
          "absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/25 to-black/5",
          isRtl && "bg-gradient-to-l"
        )}
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden />

      {/* Content — aligned to inline-start (left in EN, right in AR) */}
      <div className="container-luxury relative z-10 flex min-h-screen items-center justify-start pt-24 pb-28 lg:pt-28">
        <div className="max-w-3xl space-y-7 text-start">
          <p className={cn(bodyFontClass(locale), "text-[11px] font-normal uppercase tracking-[0.35em] text-white/90")}>
            {eyebrow}
          </p>

          <h1
            className={cn(
              displayFontClass(locale),
              "text-[2.5rem] font-normal uppercase leading-[1.35] tracking-[0.14em] text-white sm:text-5xl sm:tracking-[0.18em] lg:text-[3.25rem] lg:leading-[1.4] lg:tracking-[0.22em] xl:text-[3.75rem]",
              isRtl && "normal-case leading-[1.3] tracking-normal"
            )}
          >
            <span className="block">{titleLine1}</span>
            <span className="block whitespace-nowrap">{titleLine2}</span>
          </h1>

          <p className={cn(bodyFontClass(locale), "max-w-[420px] text-[15px] leading-[1.75] text-white/75")}>
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-start gap-6 pt-1">
            <Link href={exploreHref} className="neera-btn-explore">
              {exploreText}
            </Link>

            <button
              type="button"
              className={cn(
                "group flex items-center gap-4 text-white transition-colors hover:text-white",
                isRtl && "flex-row-reverse"
              )}
              aria-label={viewVideoText}
            >
              <span className="neera-play-btn relative">
                <span className="neera-play-ring" aria-hidden />
                <svg
                  className={cn(
                    "relative z-10 h-3.5 w-3.5 fill-white",
                    isRtl ? "me-0.5" : "ms-0.5"
                  )}
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className={cn(bodyFontClass(locale), "text-sm font-normal tracking-wide")}>
                {viewVideoText}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Vertical slider — 2 thumbnails + Prev/Next like Neera */}
      <div
        className={cn(
          "absolute top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center lg:flex",
          isRtl ? "left-6 xl:left-10" : "right-6 xl:right-10"
        )}
      >
        <button
          type="button"
          onClick={goPrev}
          className={cn(
            "mb-4 flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white",
            bodyFontClass(locale)
          )}
          aria-label={prevLabel}
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
          {prevLabel}
        </button>

        <div className="flex flex-col gap-4">
          {sliderThumbs.map(({ slide, index, role }) => (
            <button
              key={`${role}-${slide.id}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-[72px] w-[108px] overflow-hidden border transition-all duration-300",
                index === activeIndex
                  ? "border-white opacity-100"
                  : "border-white/40 opacity-80 hover:border-white/70 hover:opacity-100"
              )}
              aria-label={`${role} slide`}
            >
              <Image
                src={slide.thumb}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="108px"
                quality={60}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className={cn(
            "mt-4 flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white",
            bodyFontClass(locale)
          )}
          aria-label={nextLabel}
        >
          {nextLabel}
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Mobile dots */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:hidden">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-1 rounded-full transition-all",
              i === activeIndex ? "w-7 bg-gold" : "w-1 bg-white/50"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
