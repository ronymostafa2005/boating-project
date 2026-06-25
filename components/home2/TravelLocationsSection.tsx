"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HOME2_LOCATION_TABS } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE, slideInFromEnd } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const LOCATIONS_TITLE_GROUPS: Record<string, string[][]> = {
  en: [["Visit", "stunning"], ["locations"]],
  ar: [["زر", "أماكن"], ["خلابة"]],
};

function TabArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 24" fill="currentColor" aria-hidden>
      <path d="M98.7 12.6 84.4 22.8c-.3.2-.7.2-1-.1-.3-.2-.3-.6-.1-.9l6.2-9.9-6.1-9.7c-.2-.3-.1-.7.1-.9.1-.1.3-.2.5-.2.2 0 .3 0 .4.1l14.2 10.2c.2.1.3.4.3.6 0 .2-.1.4-.3.6z" />
      <path d="M82.7 13.6H1v-3.4h81.7z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 73.5 98" fill="currentColor" aria-hidden>
      <path d="M36.8 0C16.4 0 0 16.4 0 36.8 0 61.3 36.8 98 36.8 98s36.8-36.7 36.8-61.2C73.5 16.4 57.1 0 36.8 0zm0 12.3c13.6 0 24.5 11 24.5 24.5 0 13.6-10.9 24.5-24.5 24.5-13.5 0-24.5-10.9-24.5-24.5C12.3 23.3 23.3 12.3 36.8 12.3z" />
    </svg>
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

export function TravelLocationsSection() {
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [activeTab, setActiveTab] = useState(0);

  const tab = HOME2_LOCATION_TABS[activeTab];
  const fadeInRight = slideInFromEnd(isRtl, 40, 0.3);
  const fadeInLeft: Variants = slideInFromEnd(!isRtl, 40, 0.3);

  return (
    <section className="home2-locations overflow-hidden bg-pearl py-[60px] sm:py-[80px] lg:py-[100px] xl:py-[120px]">
      <div className="container-luxury">
        <motion.div
          className="home2-locations-heading mx-auto mb-8 max-w-4xl text-center sm:mb-10 lg:mb-12"
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
            {t("locationsEyebrow")}
          </p>
          <SplitHeading
            wordGroups={LOCATIONS_TITLE_GROUPS[locale] ?? LOCATIONS_TITLE_GROUPS.en}
            active
            loop
            className={cn(
              displayFontClass(locale),
              "home2-locations-title text-3xl font-normal text-[#1a1a1a] sm:text-4xl lg:text-[2.75rem]",
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
            )}
          />
        </motion.div>

        <motion.div
          className="home2-locations-tabs mb-8 sm:mb-10 lg:mb-12"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="home2-locations-tabs__scroll flex flex-wrap justify-center gap-x-1 gap-y-2 lg:gap-x-0">
            {HOME2_LOCATION_TABS.map((item, i) => {
              const isActive = i === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "home2-locations-tab inline-flex items-center gap-2 px-3 py-2 transition-colors sm:px-4",
                    bodyFontClass(locale),
                    isActive
                      ? "text-neera-gold"
                      : "text-[#1a1a1a]/55 hover:text-[#1a1a1a]/80"
                  )}
                  aria-pressed={isActive}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] sm:text-[12px]">
                    {t(item.labelKey)}
                  </span>
                  <TabArrowIcon className="h-2 w-8 shrink-0 opacity-80" />
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            className="home2-locations-panel grid lg:grid-cols-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: MOTION_EASE }}
          >
            <motion.div
              className="home2-locations-map border-[#1a1a1a]/10 lg:border-e lg:pe-0"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="home2-locations-map__inner relative mx-auto aspect-[4/3] w-full max-w-[640px] lg:max-w-none">
                <Image
                  src={tab.mapImage}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  quality={IMAGE_QUALITY}
                  priority={activeTab === 0}
                />
                {tab.hotspots.map((spot) => (
                  <div
                    key={spot.labelKey}
                    className="home2-locations-hotspot absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: spot.left, top: spot.top }}
                  >
                    <PinIcon className="home2-locations-hotspot__pin mx-auto mb-0.5 h-7 w-5 text-[#1a1a1a] sm:h-8 sm:w-[22px]" />
                    <div className="home2-locations-hotspot__thumb relative mx-auto h-[72px] w-[72px] overflow-hidden rounded-full border-[3px] border-white shadow-md sm:h-[88px] sm:w-[88px]">
                      <Image
                        src={spot.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="88px"
                        quality={IMAGE_QUALITY}
                      />
                    </div>
                    <span
                      className={cn(
                        bodyFontClass(locale),
                        "mt-1 block text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#1a1a1a]/75"
                      )}
                    >
                      {t(spot.labelKey)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="home2-locations-itinerary px-0 pt-10 lg:px-[10%] lg:pt-0"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="home2-locations-itinerary__headers mb-6 flex gap-4">
                <h5
                  className={cn(
                    bodyFontClass(locale),
                    "w-[4.5rem] shrink-0 text-sm font-normal uppercase tracking-[0.12em] text-[#1a1a1a]"
                  )}
                >
                  {t("stopDay")}
                </h5>
                <h5
                  className={cn(
                    bodyFontClass(locale),
                    "text-sm font-normal uppercase tracking-[0.12em] text-[#1a1a1a]"
                  )}
                >
                  {t("stopPort")}
                </h5>
              </div>

              <div className="relative">
                <motion.span
                  key={`${tab.id}-line`}
                  className="home2-locations-schedule__line"
                  aria-hidden
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 1.05, ease: MOTION_EASE, delay: 0.15 }}
                />
                <ol className="home2-locations-schedule relative space-y-0">
                {tab.stops.map((stop, index) => (
                  <li
                    key={`${tab.id}-stop-${index}`}
                    className="home2-locations-schedule__item relative flex gap-4 pb-8 last:pb-0"
                  >
                    <div className="home2-locations-schedule__icon relative z-[1] flex w-8 shrink-0 justify-center pt-0.5">
                      <PinIcon className="h-8 w-[18px] text-neera-gold" />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h5
                        className={cn(
                          displayFontClass(locale),
                          "mb-1 text-base font-normal leading-snug text-[#1a1a1a] sm:text-lg"
                        )}
                      >
                        {stop.type === "sailing" ? t("stopSailing") : t(stop.placeKey)}
                      </h5>
                      {stop.type === "port" && "timeKey" in stop && stop.timeKey ? (
                        <p
                          className={cn(
                            bodyFontClass(locale),
                            "text-sm leading-relaxed text-[#1a1a1a]/65"
                          )}
                        >
                          {t(stop.timeKey)}
                        </p>
                      ) : null}
                      {stop.type === "port" && "noteKey" in stop && stop.noteKey ? (
                        <p
                          className={cn(
                            bodyFontClass(locale),
                            "mt-1.5 flex items-start gap-2 text-xs leading-relaxed text-[#1a1a1a]/55"
                          )}
                        >
                          <span className="mt-0.5 shrink-0 text-neera-gold" aria-hidden>
                            📣
                          </span>
                          {t(stop.noteKey)}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
