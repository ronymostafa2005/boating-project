"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { StatsCounterIcon } from "@/components/about/StatsCounterIcons";
import { HOME_ABOUT_STATS } from "@/data/about";
import { slideInFromEnd } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

export function AboutStatsCounterSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollCarousel = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".about-stats-slide");
    const amount = slide?.offsetWidth ?? track.clientWidth;
    const delta = isRtl ? -direction * amount : direction * amount;
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="stats-counter-section about-stats-counter overflow-hidden py-0"
      variants={slideInFromEnd(isRtl, 40, 0.3)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div
        ref={trackRef}
        className="about-stats-carousel stats-counter-grid"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {HOME_ABOUT_STATS.map((stat, index) => (
          <StatsCounterItem
            key={stat.labelKey}
            iconIndex={index}
            value={stat.value}
            label={t(stat.labelKey)}
            active={active}
            locale={locale}
            isLast={index === HOME_ABOUT_STATS.length - 1}
          />
        ))}
      </div>

      <div className="about-stats-pagination flex justify-center gap-4 px-4 py-5 xl:hidden">
        <button
          type="button"
          onClick={() => scrollCarousel(-1)}
          className={cn(
            bodyFontClass(locale),
            "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
          )}
        >
          {t("extravagantPrev")}
        </button>
        <button
          type="button"
          onClick={() => scrollCarousel(1)}
          className={cn(
            bodyFontClass(locale),
            "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
          )}
        >
          {t("extravagantNext")}
        </button>
      </div>
    </motion.section>
  );
}

function StatsCounterItem({
  iconIndex,
  value,
  label,
  active,
  locale,
  isLast,
}: {
  iconIndex: number;
  value: number;
  label: string;
  active: boolean;
  locale: string;
  isLast: boolean;
}) {
  const count = useCountUp(value, active);
  const numberLocale = locale === "ar" ? "ar-SA" : "en-US";

  return (
    <div
      className={cn(
        "about-stats-slide stats-counter-item",
        !isLast && "stats-counter-item-divider"
      )}
    >
      <div className="stats-counter-item-inner flex flex-col items-center px-6 py-10 text-center sm:px-8 sm:py-12 lg:py-14">
        <StatsCounterIcon
          index={iconIndex}
          className="stats-counter-icon mb-6 text-neera-gold"
        />
        <p
          className={cn(
            displayFontClass(locale),
            "stats-counter-number text-4xl font-normal leading-none sm:text-[2.75rem]"
          )}
        >
          {count.toLocaleString(numberLocale)}
        </p>
        <h5
          className={cn(
            bodyFontClass(locale),
            "stats-counter-label mt-4 text-[13px] font-medium uppercase leading-snug tracking-[0.1em]"
          )}
        >
          {label}
        </h5>
      </div>
    </div>
  );
}
