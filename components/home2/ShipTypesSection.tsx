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
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

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

export function ShipTypesSection() {
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(HOME2_SHIP_TYPES.length - 1, activeIndex + dir));
    setActiveIndex(next);
    const card = el.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="home2-ships-section relative overflow-hidden py-[60px] sm:py-[80px] lg:py-[100px] xl:py-[150px]">
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
            className="max-w-xl text-start"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className={cn(
                bodyFontClass(locale),
                "mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white/70"
              )}
            >
              {t("shipsEyebrow")}
            </p>
            <SplitHeading
              wordGroups={[t("shipsTitle").split(" ")]}
              active
              loop
              className={cn(
                displayFontClass(locale),
                "text-3xl font-normal leading-[1.12] text-white sm:text-4xl lg:text-[2.65rem]",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.03em]"
              )}
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            variants={fadeInRight}
            initial="hidden"
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
              disabled={activeIndex === HOME2_SHIP_TYPES.length - 1}
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {HOME2_SHIP_TYPES.map((ship, index) => (
          <article
            key={ship.key}
            className={cn(
              "home2-ship-card group relative flex min-h-[420px] min-w-[78%] shrink-0 flex-col justify-between px-6 py-10 sm:min-w-[52%] md:min-w-[38%] lg:min-h-[460px] lg:min-w-0 lg:flex-1 xl:px-8",
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
                  displayFontClass(locale),
                  "mb-4 text-xl text-white sm:text-2xl",
                  !isRtl && "uppercase tracking-[0.04em]"
                )}
              >
                {t(ship.key)}
              </h3>
              <p
                className={cn(
                  bodyFontClass(locale),
                  "max-w-[280px] text-sm leading-relaxed text-white/78"
                )}
              >
                {t(ship.descKey)}
              </p>
            </div>

            <Link
              href="/boats"
              className={cn(
                "home2-ship-know-more relative z-10 mt-8 inline-flex w-fit",
                bodyFontClass(locale)
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
