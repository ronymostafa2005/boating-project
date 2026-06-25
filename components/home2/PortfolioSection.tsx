"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HOME2_PORTFOLIO } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE, slideInFromEnd } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { hydratedInitial, useIsHydrated } from "@/hooks/useIsHydrated";

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

const fadeInRight = (isRtl: boolean): Variants => slideInFromEnd(isRtl, 40, 0.3);

export function PortfolioSection() {
  const hydrated = useIsHydrated();
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const portfolioTitleGroups =
    locale === "ar" ? [t("portfolioTitle").split(" ")] : [["Elegant", "Yacht"]];

  const scroll = useCallback(
    (dir: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>(".home2-portfolio-card");
      const cardWidth = card?.offsetWidth ?? 320;
      const gap = 20;
      el.scrollBy({ left: dir * (cardWidth + gap) * (isRtl ? -1 : 1), behavior: "smooth" });
    },
    [isRtl]
  );

  return (
    <section className="home2-portfolio overflow-hidden bg-[#f4efe8] py-16 lg:py-24 xl:py-28">
      <div className="container-luxury mb-10 lg:mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            className="text-start"
            variants={fadeInLeft}
            initial={hydratedInitial(hydrated, "hidden")}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className={cn(
                bodyFontClass(locale),
                "mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#1a1a1a]/55"
              )}
            >
              {t("portfolioEyebrow")}
            </p>
            <SplitHeading
              wordGroups={portfolioTitleGroups}
              active
              loop
              className={cn(
                displayFontClass(locale),
                "home2-portfolio-title text-3xl font-normal text-[#1a1a1a] sm:text-4xl lg:text-[2.75rem]",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
              )}
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-5"
            variants={fadeInRight(isRtl)}
            initial={hydratedInitial(hydrated, "hidden")}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="home2-portfolio-arrow"
              aria-label={t("heroPrev")}
            >
              <CarouselArrow flip={!isRtl} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="home2-portfolio-arrow"
              aria-label={t("heroNext")}
            >
              <CarouselArrow flip={isRtl} />
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        className="home2-portfolio-track"
        variants={fadeInRight(isRtl)}
        initial={hydratedInitial(hydrated, "hidden")}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {HOME2_PORTFOLIO.map((item) => (
          <article key={item.nameKey} className="home2-portfolio-card group">
            <div className="home2-portfolio-card__media">
              <Image
                src={item.image}
                alt={t(item.nameKey)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width:640px) 85vw, (max-width:1024px) 45vw, 25vw"
                quality={IMAGE_QUALITY}
                loading="lazy"
              />
              <div className="home2-portfolio-card__shade" aria-hidden />
              <div className="home2-portfolio-card__hover-overlay" aria-hidden />

              <div className="home2-portfolio-card__content">
                <span className={cn(bodyFontClass(locale), "home2-portfolio-card__location")}>
                  {t(item.locationKey)}
                </span>
                <h3 className={cn(displayFontClass(locale), "home2-portfolio-card__name")}>
                  <Link href="/boats">{t(item.nameKey)}</Link>
                </h3>
                <Link href="/boats" className={cn(bodyFontClass(locale), "home2-portfolio-card__btn")}>
                  {t("portfolioViewDetails")}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
