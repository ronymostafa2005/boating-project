"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ShipTypeIcon } from "@/components/home2/ShipTypeIcons";
import { HOME2_SHIP_TYPES, HOME2_SHIPS_BG } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE } from "@/lib/motionVariants";
import { hydratedInitial, useIsHydrated } from "@/hooks/useIsHydrated";
import { cn, home2FontClass, home2DisplayFontClass } from "@/lib/utils";

function CarouselArrow({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={cn("h-2.5 w-10", flip && "scale-x-[-1]", className)}
      viewBox="0 0 100 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M98.7 12.6 84.4 22.8c-.3.2-.7.2-1-.1-.3-.2-.3-.6-.1-.9l6.2-9.9-6.1-9.7c-.2-.3-.1-.7.1-.9.1-.1.3-.2.5-.2.2 0 .3 0 .4.1l14.2 10.2c.2.1.3.4.3.6 0 .2-.1.4-.3.6z" />
      <path d="M82.7 13.6H1v-3.4h81.7v3.4z" />
    </svg>
  );
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: MOTION_EASE, delay: 0.2 },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: MOTION_EASE, delay: 0.3 },
  },
};

const VISIBLE_SHIP_CARDS = 4;

export function ShipTypesSection() {
  const hydrated = useIsHydrated();
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxScrollIndex = Math.max(0, HOME2_SHIP_TYPES.length - VISIBLE_SHIP_CARDS);
  const shipsTitleWords = t("shipsTitle").split(" ");
  const shipsTitleLines = isRtl
    ? [shipsTitleWords]
    : [shipsTitleWords.slice(0, 4), shipsTitleWords.slice(4)];

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(maxScrollIndex, activeIndex + dir));
    setActiveIndex(next);
    const card = el.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section className={cn("home2-ships-section relative overflow-hidden py-[60px] sm:py-[80px] lg:py-[100px] xl:py-[150px]", home2FontClass(locale))}>
      <Image
        src={HOME2_SHIPS_BG}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={IMAGE_QUALITY}
        loading="lazy"
        priority={false}
      />
      <div className="absolute inset-0 bg-deep-sea/80" aria-hidden />

      <div className="container-luxury relative z-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
          <motion.div
            className="max-w-3xl text-start"
            variants={fadeInLeft}
            initial={hydratedInitial(hydrated, "hidden")}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className={cn(
                home2FontClass(locale),
                "mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#fff] sm:text-sm"
              )}
            >
              {t("shipsEyebrow")}
            </p>
            <SplitHeading
              wordGroups={shipsTitleLines}
              active
              loop
              className={cn(
                home2DisplayFontClass(locale),
                "home2-ships-title text-3xl font-semibold leading-[1.4] text-[#fff] sm:text-4xl sm:leading-[1.45] lg:text-[3rem] lg:leading-[1.5]",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.03em]"
              )}
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            variants={fadeInRight}
            initial={hydratedInitial(hydrated, "hidden")}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={activeIndex === 0}
              className="home2-ships-arrow disabled:opacity-30"
              aria-label="Previous"
            >
              <CarouselArrow flip={!isRtl} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={activeIndex >= maxScrollIndex}
              className="home2-ships-arrow disabled:opacity-30"
              aria-label="Next"
            >
              <CarouselArrow flip={isRtl} />
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        className="home2-ships-track relative z-10 flex overflow-x-auto"
        variants={fadeInRight}
        initial={hydratedInitial(hydrated, "hidden")}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {HOME2_SHIP_TYPES.map((ship, index) => (
          <article
            key={ship.key}
            className={cn(
              "home2-ship-card group relative flex min-h-[420px] shrink-0 flex-col justify-between px-6 py-10 lg:min-h-[460px] xl:px-8",
              index < HOME2_SHIP_TYPES.length - 1 && "home2-ship-card-divider"
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <div className="home2-ship-card__reveal" aria-hidden>
              <Image
                src={ship.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 78vw, 25vw"
                quality={IMAGE_QUALITY}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ocean-navy/55" />
            </div>

            <div className="relative z-10">
              <ShipTypeIcon index={index} className="mb-6 text-white" />
              <h3
                className={cn(
                  home2DisplayFontClass(locale),
                  "mb-4 text-2xl font-semibold text-[#fff] sm:text-3xl",
                  !isRtl && "uppercase tracking-[0.04em]"
                )}
              >
                {t(ship.key)}
              </h3>
              <p
                className={cn(
                  home2FontClass(locale),
                  "max-w-[300px] text-base font-medium leading-relaxed text-[#fff] sm:text-lg"
                )}
              >
                {t(ship.descKey)}
              </p>
            </div>

            <Link
              href="/boats"
              className={cn(
                "home2-ship-know-more relative z-10 mt-8 inline-flex w-fit",
                home2FontClass(locale)
              )}
            >
              {t("knowMore")}
            </Link>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
