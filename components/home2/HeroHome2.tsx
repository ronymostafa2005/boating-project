"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HOME2_HERO_SLIDES } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, scriptFontClass } from "@/lib/utils";

export function HeroHome2() {
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive((index + HOME2_HERO_SLIDES.length) % HOME2_HERO_SLIDES.length);
  }, []);

  const slide = HOME2_HERO_SLIDES[active];

  return (
    <section className="home2-hero relative min-h-screen overflow-hidden bg-deep-sea">
      {HOME2_HERO_SLIDES.map((item, i) => {
        const isActive = i === active;

        return (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              isActive ? "opacity-100" : "opacity-0"
            )}
          >
            {isActive ? (
              <video
                key={`video-${item.id}`}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={item.thumb}
              >
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={item.thumb}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                quality={IMAGE_QUALITY}
                priority={i === 0}
              />
            )}
          </div>
        );
      })}

      <div className="container-luxury relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-36 pt-40 text-center sm:pt-44 lg:pt-48">
        <p
          className={cn(
            bodyFontClass(locale),
            "mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80"
          )}
        >
          {t(slide.subtitleKey)}
        </p>

        <SplitHeading
          wordGroups={[t(slide.titleKey).split(" ")]}
          active
          loop
          className={cn(
            scriptFontClass(locale),
            "home2-hero-title mb-6 max-w-4xl text-4xl font-normal normal-case leading-[1.15] text-white sm:text-5xl lg:text-[4.25rem]",
            isRtl && "font-displayAr normal-case tracking-normal"
          )}
        />

        <p
          className={cn(
            bodyFontClass(locale),
            "mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-[15px]"
          )}
        >
          {t(slide.descKey)}
        </p>

        <Link href="/boats" className="neera-btn-explore">
          {t("heroExplore")}
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          className={cn(bodyFontClass(locale), "text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white")}
          aria-label={t("heroPrev")}
        >
          {t("heroPrev")}
        </button>

        <div className="flex items-center gap-3">
          {HOME2_HERO_SLIDES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-14 w-20 overflow-hidden border transition-all sm:h-16 sm:w-24",
                i === active ? "border-white opacity-100" : "border-white/40 opacity-70 hover:border-white/70"
              )}
              aria-label={`Slide ${i + 1}`}
            >
              <Image
                src={item.thumb}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
                quality={60}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          className={cn(bodyFontClass(locale), "text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white")}
          aria-label={t("heroNext")}
        >
          {t("heroNext")}
        </button>
      </div>
    </section>
  );
}
