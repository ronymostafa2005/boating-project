"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn } from "@/lib/utils";
import { slideInFromEndCustom } from "@/lib/motionVariants";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";

const CDN = "https://neera.wpenginepowered.com/wp-content/uploads";

const PARTNERS = [
  {
    id: "dance",
    logo: `${CDN}/2023/12/Neera-Client-4.png`,
    logoWidth: 139,
    logoHeight: 130,
    hoverBg: `${CDN}/2023/12/Neera-Client-logo-bg-01.jpg`,
    delay: 0.2,
  },
  {
    id: "charlie",
    logo: `${CDN}/2023/12/Neera-Client-3.png`,
    logoWidth: 195,
    logoHeight: 93,
    hoverBg: `${CDN}/2024/01/contact-hover-image-1.jpg`,
    delay: 0.35,
  },
  {
    id: "weport",
    logo: `${CDN}/2023/12/Neera-Client-2.png`,
    logoWidth: 219,
    logoHeight: 130,
    hoverBg: `${CDN}/2024/01/contact-hover-image-2.jpg`,
    delay: 0.55,
  },
  {
    id: "bight",
    logo: `${CDN}/2023/12/Neera-Client-1.png`,
    logoWidth: 217,
    logoHeight: 93,
    hoverBg: `${CDN}/2024/01/contact-hover-image-3.jpg`,
    delay: 0.75,
  },
] as const;

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const headingZoom: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease },
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

export function PartnersSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const titleWords = [
    t("partnersTitle1"),
    t("partnersTitle2"),
    t("partnersTitle3"),
  ].filter(Boolean);
  const titleWordGroups = [titleWords];

  const cardVariants = useMemo(
    () => slideInFromEndCustom(locale === "ar"),
    [locale]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="partners-section relative bg-white py-14 lg:py-20 xl:py-24">
      <div className="container-luxury">
        <motion.div
          className="mb-10 text-center lg:mb-12"
          variants={headingZoom}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p
            className={cn(
              "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#0f1e2d]/55",
              locale === "ar" ? "font-bodyAr" : "font-bodyEn"
            )}
          >
            {t("partnersEyebrow")}
          </p>
          <SplitHeading
            wordGroups={titleWordGroups}
            loop
            active={inView}
            className={cn(
              "partners-heading font-normal uppercase leading-[1.2] tracking-[0.05em] text-[#0f1e2d]",
              locale === "ar" ? "font-displayAr text-2xl sm:text-3xl lg:text-4xl" : "font-displayEn text-2xl sm:text-3xl lg:text-[2.35rem]"
            )}
          />
        </motion.div>

        <div className="partners-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((partner) => (
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
