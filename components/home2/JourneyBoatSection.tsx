"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { JourneyDecorIcons } from "@/components/home2/JourneyDecorIcons";
import { HOME2_TOURS } from "@/data/home2";
import { MOTION_EASE, slideInFromEnd } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

function CapacityIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-3.5 w-3", className)} viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M192 0c41.8 0 75.8 33.1 76.7 74.5 44.2 18.3 76.7 61.5 76.7 111.5 0 33.1-13.3 63.2-34.9 85.1l-1.1 1.1c-8.3 8.3-21.9 8.3-30.2 0l-1.1-1.1C256.3 248.2 243 218.1 243 185c0-50 32.5-93.2 76.7-111.5C320.2 33.1 354.2 0 396 0H192zm-96 288c-53 0-96 43-96 96v32c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32v-32c0-53-43-96-96-96H96z" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-3.5 w-3.5", className)} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M149.1 64.8 138.7 96H64C28.7 96 0 124.7 0 160v288c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
    </svg>
  );
}

function TourPrice({
  price,
  perRoom,
  inline,
  locale,
}: {
  price: string;
  perRoom: string;
  inline?: boolean;
  locale: string;
}) {
  return (
    <div className={cn(bodyFontClass(locale), inline ? "home2-tour-card-vbo__price-inline" : "home2-tour-card-vbo__price")}>
      <span className="home2-tour-card-vbo__price-value">
        <span className="text-neera-gold">$</span> {price}
      </span>
      <span className="home2-tour-card-vbo__price-unit">{perRoom}</span>
    </div>
  );
}

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: MOTION_EASE },
  },
};

const fadeInRight = (isRtl: boolean): Variants => slideInFromEnd(isRtl, 40, 0.3);

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: MOTION_EASE, delay: 0.1 },
  },
};

const JOURNEY_TITLE_GROUPS: Record<string, string[][]> = {
  en: [["Reserve", "your", "dream", "location"]],
  ar: [["احجز", "موقع", "أحلامك"]],
};

export function JourneyBoatSection() {
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="home2-journey-section relative overflow-hidden bg-white py-[60px] sm:py-[80px] lg:py-[100px] xl:py-[150px]">
      <JourneyDecorIcons />

      <div className="container-luxury relative z-10">
        <motion.div
          className="home2-journey-heading mx-auto mb-10 max-w-7xl text-center sm:mb-14 lg:mb-[70px]"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p
            className={cn(
              bodyFontClass(locale),
              "mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#1a1a1a]/65"
            )}
          >
            {t("journeyEyebrow")}
          </p>
          <SplitHeading
            wordGroups={JOURNEY_TITLE_GROUPS[locale] ?? JOURNEY_TITLE_GROUPS.en}
            active
            loop
            className={cn(
              displayFontClass(locale),
              "home2-journey-title text-3xl font-normal text-[#1a1a1a] sm:text-4xl lg:text-[2.75rem]",
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
            )}
          />
        </motion.div>

        <motion.div
          className="home2-journey-grid"
          variants={fadeInRight(isRtl)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {HOME2_TOURS.map((tour) => {
            const desc = t(tour.descKey);
            const hasDesc = Boolean(desc);

            return (
              <article key={tour.nameKey} className="home2-tour-card-vbo group">
                <div className="home2-tour-card-vbo__inner">
                  <div className="home2-tour-card-vbo__media-block">
                    <div className="home2-tour-card-vbo__image-wrap">
                      <Link href="/boats" className="block h-full w-full">
                        <SafeImage
                          src={tour.image}
                          alt={t(tour.nameKey)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width:767px) 420px, 460px"
                          quality={IMAGE_QUALITY}
                          loading="lazy"
                        />
                      </Link>
                      <button
                        type="button"
                        className="home2-tour-card-vbo__camera"
                        aria-label="Gallery"
                      >
                        <CameraIcon />
                      </button>
                    </div>

                    <div className="home2-tour-card-vbo__info text-start">
                      {hasDesc ? (
                        <p className={cn(bodyFontClass(locale), "home2-tour-card-vbo__desc home2-tour-card-vbo__desc--top")}>
                          {desc}
                        </p>
                      ) : null}

                      <div className="home2-tour-card-vbo__title-row">
                        <h4 className={cn(displayFontClass(locale), "home2-tour-card-vbo__title")}>
                          <Link href="/boats">{t(tour.nameKey)}</Link>
                        </h4>
                        {!hasDesc ? (
                          <TourPrice price={tour.price} perRoom={t("perRoom")} inline locale={locale} />
                        ) : null}
                      </div>

                      <span className={cn(bodyFontClass(locale), "home2-tour-card-vbo__meta")}>
                        {t(tour.metaKey)}
                      </span>
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
                        <TourPrice price={tour.price} perRoom={t("perRoom")} locale={locale} />
                      ) : null}
                    </div>
                    <Link href="/boats" className={cn(bodyFontClass(locale), "home2-tour-card-vbo__btn")}>
                      {t("details")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center sm:mt-20 lg:mt-[100px]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link href="/boats" className={cn(bodyFontClass(locale), "home2-journey-explore-btn")}>
            <span>{t("exploreAll")}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
