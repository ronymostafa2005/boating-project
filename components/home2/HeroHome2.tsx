"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { HOME2_HERO_SLIDES } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, home2FontClass, home2DisplayFontClass } from "@/lib/utils";

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
    <section className={cn("home2-hero relative min-h-screen overflow-hidden bg-[#0a1628]", home2FontClass(locale))}>
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

      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="container-luxury relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-36 pt-32 text-center sm:pt-36 lg:pt-40">
        <p
          className={cn(
            home2FontClass(locale),
            "mb-8 text-sm font-normal tracking-[0.22em] text-white/90 sm:text-base"
          )}
        >
          {t(slide.subtitleKey)}
        </p>

        <h1
          className={cn(
            home2DisplayFontClass(locale),
            "home2-hero-title mb-8 w-full max-w-4xl text-[2.5rem] font-medium leading-[1.28] text-white sm:max-w-5xl sm:text-5xl lg:mb-10 lg:max-w-6xl lg:text-[4rem] lg:leading-[1.32] xl:max-w-7xl xl:text-[4.5rem] 2xl:max-w-[85rem]",
            isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.12em]"
          )}
        >
          <span className="block">{t(slide.titleLine1Key)}</span>
          <span className="block">{t(slide.titleLine2Key)}</span>
        </h1>

        <p
          className={cn(
            home2FontClass(locale),
            "mx-auto mb-12 max-w-xl text-base leading-[1.6] text-white/80 sm:mb-14 sm:text-lg"
          )}
        >
          {t(slide.descKey)}
        </p>

        <Link href="/boats" className="home2-hero-explore-btn">
          {t("heroExplore")}
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          className={cn(home2FontClass(locale), "text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white")}
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
          className={cn(home2FontClass(locale), "text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white")}
          aria-label={t("heroNext")}
        >
          {t("heroNext")}
        </button>
      </div>
    </section>
  );
}
