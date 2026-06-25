"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HOME2_CLIENTS_IMAGE } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const FEATURE_KEYS = [
  "travellingFeature1",
  "travellingFeature2",
  "travellingFeature3",
  "travellingFeature4",
  "travellingFeature5",
] as const;

function VesselIcon() {
  return (
    <svg className="h-8 w-8 shrink-0 text-neera-gold" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M62.7 74.7H59.3v14H22.1V4.1L59.3 11.3v14h3.4V8.5L18.8 0v100l43.9-8.5v-14h-3.4v10.4H30.9V15.4L54 11.1v10.6h-3.4v-6.8H30.9v69.2L54 84.3V74.7h-3.4v10.4l-19.7 3.1V15.4z" />
    </svg>
  );
}

function SurfIcon() {
  return (
    <svg className="h-8 w-8 shrink-0 text-neera-gold" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M59.4 43.3V31.6c0-.6-.5-1.2-1.2-1.2h-4.6V20h1.2c.6 0 1.2-.5 1.2-1.2v-8.1c1.7 0 5.3.3 9.9 1.5 1.2.3 4 1.3 4 1.3.1 0 .3.1.4.1.4 0 .8-.2 1-.6l2.3-4.3c.3-.5.1-1.2-.4-1.5-.2-.2-5.7-3.9-14.9-5.7C41.6-1.8 30.9 1.5 30.5 1.6c-.5.2-.8.6-.8 1.1l.1 5c0 .5.4 1 .9 1.1l7.9 1.6v8.4c0 .6.5 1.2 1.2 1.2h1.2v10.4h-4.6c-.6 0-1.2.5-1.2 1.2v11.7c-5.8.6-10.4 5.5-10.4 11.5v44c0 .6.5 1.2 1.2 1.2h42.9c.6 0 1.2-.5 1.2-1.2v-44c0-6-4.6-10.9-10.4-11.5z" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg className="h-8 w-8 shrink-0 text-neera-gold" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M50 4.4C24.8 4.4 4.4 24.8 4.4 50S24.8 95.6 50 95.6 95.6 75.2 95.6 50 75.2 4.4 50 4.4zm0 91.2C27.2 95.6 8.8 77.2 8.8 50S27.2 8.8 50 8.8 91.2 27.2 91.2 50 72.8 91.2 50 91.2z" />
      <path d="M74.8 39.8H60.2V25.2c0-2.7-2.2-5-5-5H44.7c-2.7 0-5 2.2-5 5v14.6H25.2c-2.7 0-5 2.2-5 5v10.6c0 2.7 2.2 5 5 5h14.6v14.6c0 2.7 2.2 5 5 5h10.6c2.7 0 5-2.2 5-5V60.2h14.6c2.7 0 5-2.2 5-5V44.7c0-2.5-2.2-4.7-4.8-4.9z" />
    </svg>
  );
}

function CookingIcon() {
  return (
    <svg className="h-8 w-8 shrink-0 text-neera-gold" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M82.3 38.9c-1.2 1.8 1.4 3.6 2.7 1.9l12.4-17.2c1.1-1.5 1.7-3.2 1.7-5 .1-5.2-5.1-9.4-10.1-8.2-2.2.5-4.2 1.9-5.3 3.9l-12.3 20c-2.7-1.1-5.9-1.7-8.6-.2l-1.9 1c-1.7.8-3.6.8-5.3-.2l-2.6-1.6c-3.1-1.9-6.9-1.7-9.8.5-1.7 1.4-3.7 2.9-6 2.3-4.6-1-9.5 2.3-10.3 6.9l-.5 2.4h-4.6c-.9 0-1.6.7-1.6 1.6 0 2 .2 4 .5 5.9C9.7 53.1 1 61.9 1 72.8c.3 21.9 29.8 27.6 38.1 7.4.8.5 1.7.9 2.6 1.4v6.9c0 .9.7 1.6 1.6 1.6h29c.9 0 1.6-.7 1.6-1.6v-6.9c13.1-6.2 21.9-20 21.8-34.6 0-.9-.7-1.6-1.6-1.6H79.6v-1.9c0-3.5-2.1-6.7-5.3-8.1l12-19.4c.7-1.2 1.9-2.1 3.3-2.4 4.5-1.1 8 4.5 5.1 8.1l-17.4 24.1z" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg className="h-8 w-8 shrink-0 text-neera-gold" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M38.6 57c.8 0 1.5.7 1.5 1.5 0 .9-.7 1.5-1.5 1.5-.6 0-1.2-.1-1.8-.3-.6-.2-1.2-.5-1.6-.9-.5-.3-.9-.1-1.3.2-1.4.9-2.9 1.8-5.7-.2-.3-.3-.6-.2-.9 0-.1.1-.3.2-.4.3-1.4.8-2.9 1.7-5.6-.2-.1-.1-.2-.1-.4-.4-.2-.8 0-1.2.3-1.4.9-2.9 1.8-5.7-.2-.6-.4-1.5.2-2 .5-.5.3-.9.6-1.4.6C9.8 60 9.1 59.4 9 58.6c-.1-1.1.9-1.5 1.4-1.8 1.2-.8 3.1-2.1 5.4-.5.3.2.5.3.7.4L11 45.5c-.3-.8.1-1.7.9-1.9l3.7-1.4v-6c0-.9.6-1.5 1.5-1.5h1.5V32c0-.5.3-1 .7-1.2v-4c0-.9.7-1.5 1.5-1.5h4.6c.8 0 1.5.6 1.5 1.5v3.8h.2v-6.8c0-.9.7-1.5 1.5-1.5.9 0 1.5.7 1.5 1.5v6.9c.6.2 1.1.8 1.1 1.5v2.5h1.7c.9 0 1.5.7 1.5 1.5v6l3.6 1.3c.8.4 1.1 1.3.7 2l-4.9 10c.8-.2 1.7-.1 3 .7.3.2.6.3.9.5.2.1.5.2.8.2z" />
    </svg>
  );
}

const FEATURE_ICONS = [VesselIcon, SurfIcon, QualityIcon, CookingIcon, ExperienceIcon];

function FadeInRight({
  children,
  delay = 0,
  visible = false,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  visible?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`animate-on-scroll-right ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function AboutTravellingSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [bgPositionY, setBgPositionY] = useState(38);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const updateScrollEffects = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const travel = section.offsetHeight - viewport;

      if (rect.top < viewport * 0.82) {
        setContentVisible(true);
      }

      if (travel > 0) {
        const scrolled = Math.min(Math.max(-rect.top, 0), travel);
        const progress = scrolled / travel;
        setBgPositionY(38 + progress * 22);
      } else {
        const progress = Math.min(1, Math.max(0, (viewport - rect.top) / viewport));
        setBgPositionY(38 + progress * 14);
      }
    };

    updateScrollEffects();
    window.addEventListener("scroll", updateScrollEffects, { passive: true });
    window.addEventListener("resize", updateScrollEffects);
    return () => {
      window.removeEventListener("scroll", updateScrollEffects);
      window.removeEventListener("resize", updateScrollEffects);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="travelling-section relative overflow-hidden bg-[#0a1628]"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden dir="ltr">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url(/images/travelling-bg.png)",
            backgroundPosition: `22% ${bgPositionY}%`,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-[#0a1628]/10 via-[#0a1628]/45 to-[#0a1628]/88"
          aria-hidden
        />
      </div>

      <div
        dir="ltr"
        className="container-luxury relative z-10 flex min-h-screen items-center py-20 lg:py-28"
      >
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className={cn(
            "travelling-content ml-auto w-full max-w-xl lg:max-w-[46%] xl:max-w-[42%]",
            isRtl ? "text-right" : "text-left"
          )}
        >
          <SplitHeading
            wordGroups={[t("travellingTitleLine1").split(" "), t("travellingTitleLine2").split(" ")]}
            active={contentVisible}
            className={cn(
              displayFontClass(locale),
              "travelling-heading mb-6 w-full text-4xl font-normal leading-[1.15] text-white sm:text-5xl lg:text-[3.35rem]",
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.06em]"
            )}
          />

          <FadeInRight visible={contentVisible} delay={900}>
            <p
              className={cn(
                bodyFontClass(locale),
                "mb-10 max-w-lg text-sm leading-relaxed text-white/90"
              )}
            >
              {t("travellingDescription")}
            </p>
          </FadeInRight>

          <div className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {FEATURE_KEYS.map((key, index) => {
              const Icon = FEATURE_ICONS[index];
              return (
                <FadeInRight key={key} visible={contentVisible} delay={1020 + index * 90}>
                  <div className="flex items-start gap-3 text-start">
                    <Icon />
                    <p
                      dir={isRtl ? "rtl" : "ltr"}
                      className={cn(bodyFontClass(locale), "text-sm leading-snug text-white/90")}
                    >
                      {t(key)}
                    </p>
                  </div>
                </FadeInRight>
              );
            })}
          </div>

          <FadeInRight visible={contentVisible} delay={1500}>
            <div dir="ltr" className="flex flex-wrap items-center justify-start gap-6">
              <Link href="/map" className="travelling-explore-btn inline-flex shrink-0">
                {t("travellingExplore")}
              </Link>

              <Link href="/faq" className="flex items-center gap-4 transition-opacity hover:opacity-90">
                <div className="relative h-10 w-[88px] shrink-0">
                  <Image
                    src={HOME2_CLIENTS_IMAGE}
                    alt=""
                    fill
                    quality={IMAGE_QUALITY}
                    className="object-contain object-start"
                    sizes="88px"
                  />
                </div>
                <p
                  dir={isRtl ? "rtl" : "ltr"}
                  className={cn(displayFontClass(locale), "whitespace-nowrap text-lg text-white")}
                >
                  {t("travellingReviews")}
                </p>
              </Link>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
