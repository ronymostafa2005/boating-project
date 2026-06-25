"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ABOUT_PARTNERS } from "@/data/about";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE, slideInFromEndCustom } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { useMemo } from "react";

const headingZoom: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: MOTION_EASE },
  },
};

function PartnerCard({
  logo,
  logoWidth,
  logoHeight,
  hoverBg,
  delay,
  variants,
}: {
  logo: string;
  logoWidth: number;
  logoHeight: number;
  hoverBg: string;
  delay: number;
  variants: ReturnType<typeof slideInFromEndCustom>;
}) {
  return (
    <motion.div
      className="partner-card group relative min-h-[160px] overflow-hidden bg-[#0f1e2d] sm:min-h-[200px] lg:min-h-[240px]"
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="partner-card-hover-reveal absolute inset-0" aria-hidden>
        <Image
          src={hoverBg}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 50vw, 25vw"
          quality={IMAGE_QUALITY}
          loading="lazy"
        />
        <div className="partner-card-hover-overlay absolute inset-0" />
      </div>

      <div className="relative z-[1] flex h-full min-h-[inherit] items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Image
          src={logo}
          alt=""
          width={logoWidth}
          height={logoHeight}
          className="h-auto max-h-[52px] w-auto max-w-[70%] object-contain sm:max-h-[64px] lg:max-h-[76px]"
          quality={IMAGE_QUALITY}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export function AboutPartnersSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const titleWords = [
    t("partnersTitle1"),
    t("partnersTitle2"),
    t("partnersTitle3"),
  ].filter(Boolean);

  const cardVariants = useMemo(() => slideInFromEndCustom(isRtl), [isRtl]);

  return (
    <section className="partners-section relative bg-white py-14 lg:py-20 xl:py-24">
      <div className="container-luxury">
        <motion.div
          className="mx-auto mb-10 w-full max-w-5xl text-center lg:mb-12"
          variants={headingZoom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p
            className={cn(
              bodyFontClass(locale),
              "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#0f1e2d]/55"
            )}
          >
            {t("partnersEyebrow")}
          </p>
          <SplitHeading
            wordGroups={[titleWords]}
            active
            className={cn(
              displayFontClass(locale),
              "about-partners-title partners-heading text-2xl font-normal text-[#0f1e2d] sm:text-3xl lg:text-[2.35rem]",
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.03em]"
            )}
          />
        </motion.div>

        <div className="partners-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_PARTNERS.map((partner) => (
            <PartnerCard
              key={partner.id}
              logo={partner.logo}
              logoWidth={partner.logoWidth}
              logoHeight={partner.logoHeight}
              hoverBg={partner.hoverBg}
              delay={partner.delay}
              variants={cardVariants}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
