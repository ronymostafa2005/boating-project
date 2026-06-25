"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HOME2_PRICING } from "@/data/home2";
import type { PricingFeatureStatus } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { hydratedInitial, useIsHydrated } from "@/hooks/useIsHydrated";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-4 w-4 shrink-0", className)} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-4 w-4 shrink-0", className)} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
    </svg>
  );
}

function FeatureIcon({ status }: { status: PricingFeatureStatus }) {
  if (status === "included") return <CheckIcon className="text-[#6aab6a]" />;
  if (status === "excluded") return <CrossIcon className="text-[#d97777]" />;
  return <span className="inline-block h-4 w-4 shrink-0" aria-hidden />;
}

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: MOTION_EASE },
  },
};

const fadeInRight = (isRtl: boolean, delay = 0.2): Variants => ({
  hidden: { opacity: 0, x: isRtl ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: MOTION_EASE, delay },
  },
});

export function PricingPlanSection() {
  const hydrated = useIsHydrated();
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const pricingTitleGroups = [t("pricingTitle").split(" ")];

  return (
    <section className="home2-pricing bg-white py-16 lg:py-24 xl:py-28">
      <div className="container-luxury mb-12 lg:mb-14">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={zoomIn}
          initial={hydratedInitial(hydrated, "hidden")}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p
            className={cn(
              bodyFontClass(locale),
              "mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#1a1a1a]/55"
            )}
          >
            {t("pricingEyebrow")}
          </p>
          <SplitHeading
            wordGroups={pricingTitleGroups}
            active
            loop
            className={cn(
              displayFontClass(locale),
              "home2-pricing-title text-3xl font-normal text-[#1a1a1a] sm:text-4xl lg:text-[2.75rem]",
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
            )}
          />
        </motion.div>
      </div>

      <div className="container-luxury grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
        {HOME2_PRICING.map((plan, index) => {
          const featured = "featured" in plan && plan.featured;

          return (
            <motion.article
              key={plan.nameKey}
              className={cn("home2-pricing-card", featured && "home2-pricing-card--featured")}
              variants={fadeInRight(isRtl, 0.2 + index * 0.2)}
              initial={hydratedInitial(hydrated, "hidden")}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="home2-pricing-card__media">
                <Link href="/boats" className="block h-full w-full">
                  <Image
                    src={plan.image}
                    alt={t(plan.nameKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 50vw, 33vw"
                    quality={IMAGE_QUALITY}
                    loading="lazy"
                  />
                </Link>
              </div>

              <div className="home2-pricing-card__body">
                <div className="home2-pricing-card__head">
                  <h3 className={cn(displayFontClass(locale), "home2-pricing-card__plan-title")}>
                    <Link href="/boats">
                      {t(plan.nameKey)}
                      {!isRtl && (
                        <>
                          <span className="home2-pricing-card__dash" aria-hidden>
                            {" "}
                            —{" "}
                          </span>
                          <span className="home2-pricing-card__price-inline">
                            <span className="text-neera-gold">$</span>
                            {plan.price}
                          </span>
                        </>
                      )}
                    </Link>
                  </h3>
                  {isRtl ? (
                    <p className={cn(displayFontClass(locale), "home2-pricing-card__price-rtl")}>
                      <span className="text-neera-gold">$</span> {plan.price}
                    </p>
                  ) : null}
                  <span className="home2-pricing-card__separator" aria-hidden />
                </div>

                <ul className="home2-pricing-card__features">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={`${plan.nameKey}-${featureIndex}`}
                      className={cn(
                        "home2-pricing-card__feature",
                        feature.status === "excluded" && "home2-pricing-card__feature--excluded"
                      )}
                    >
                      <FeatureIcon status={feature.status} />
                      <span className={cn(bodyFontClass(locale), "home2-pricing-card__feature-text")}>
                        {t(feature.textKey)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/boats" className={cn(bodyFontClass(locale), "home2-pricing-card__btn")}>
                  {t("choosePlan")}
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
