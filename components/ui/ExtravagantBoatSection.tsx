"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { slideFromSide } from "@/lib/motionVariants";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";

const YACHTS = [
  {
    id: "highly",
    dateKey: "extravagantDate",
    titleKey: "extravagantYacht1Title",
    descKey: "extravagantYacht1Desc",
    priceKey: "extravagantYacht1Price",
    detailsHref: "/boats",
    specKeys: [
      { label: "extravagantSpecSeatCount", value: "extravagantYacht1Seat" },
      { label: "extravagantSpecDeparts", value: "extravagantYacht1Departs" },
      { label: "extravagantSpecOnboard", value: "extravagantYacht1Onboard" },
      { label: "extravagantSpecUpdated", value: "extravagantYacht1Updated" },
      { label: "extravagantSpecRatio", value: "extravagantYacht1Ratio" },
    ],
    images: [
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-1.jpg",
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-2.jpg",
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-3.jpg",
    ],
    imageFirst: false,
  },
  {
    id: "premium",
    dateKey: "extravagantDate",
    titleKey: "extravagantYacht2Title",
    descKey: "extravagantYacht2Desc",
    priceKey: "extravagantYacht2Price",
    detailsHref: "/boats",
    specKeys: [
      { label: "extravagantSpecSeatCount", value: "extravagantYacht2Seat" },
      { label: "extravagantSpecDeparts", value: "extravagantYacht2Departs" },
      { label: "extravagantSpecOnboard", value: "extravagantYacht2Onboard" },
      { label: "extravagantSpecUpdated", value: "extravagantYacht2Updated" },
      { label: "extravagantSpecRatio", value: "extravagantYacht2Ratio" },
    ],
    images: [
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-two-1.jpg",
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-two-2.jpg",
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-two-3.jpg",
    ],
    imageFirst: true,
  },
] as const;

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

function ImageCarousel({
  images,
  alt,
  animationSide,
  isRtl,
}: {
  images: readonly string[];
  alt: string;
  animationSide: "left" | "right";
  isRtl: boolean;
}) {
  const [active, setActive] = useState(0);
  const variants = slideFromSide(isRtl, animationSide);

  return (
    <motion.div
      className="extravagant-carousel relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:min-h-[420px] lg:h-full"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      custom={0.1}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <Image
            src={images[active]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={IMAGE_QUALITY}
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>

      <div className="extravagant-carousel-dots absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActive(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full border border-white/80 transition-all",
              active === index ? "bg-transparent ring-1 ring-white" : "bg-white/90"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SpecsGrid({
  specs,
  prevLabel,
  nextLabel,
  animationSide,
  locale,
}: {
  specs: { label: string; value: string }[];
  prevLabel: string;
  nextLabel: string;
  animationSide: "left" | "right";
  locale: string;
}) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const maxPage = Math.max(0, Math.ceil(specs.length / perPage) - 1);
  const visible = specs.slice(page * perPage, page * perPage + perPage);
  const isRtl = locale === "ar";
  const variants = slideFromSide(isRtl, animationSide);

  return (
    <motion.div
      className="extravagant-specs"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={0.5}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {visible.map((spec) => (
          <div key={spec.label} className="extravagant-spec-item">
            <h5 className={cn(bodyFontClass(locale), "text-[10px] font-medium uppercase tracking-[0.16em] text-white/55")}>
              {spec.label}
            </h5>
            <p className={cn(bodyFontClass(locale), "mt-1.5 text-sm text-white/90")}>{spec.value}</p>
          </div>
        ))}
      </div>

      {specs.length > perPage ? (
        <div className="mt-5 flex gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className={cn(
              bodyFontClass(locale),
              "text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white disabled:opacity-30"
            )}
          >
            {prevLabel}
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={page === maxPage}
            className={cn(
              bodyFontClass(locale),
              "text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white disabled:opacity-30"
            )}
          >
            {nextLabel}
          </button>
        </div>
      ) : null}
    </motion.div>
  );
}

function YachtRow({
  yacht,
  t,
  locale,
  prevLabel,
  nextLabel,
  detailsLabel,
  routeMapLabel,
  startingFromLabel,
}: {
  yacht: (typeof YACHTS)[number];
  t: ReturnType<typeof useTranslations<"home">>;
  locale: string;
  prevLabel: string;
  nextLabel: string;
  detailsLabel: string;
  routeMapLabel: string;
  startingFromLabel: string;
}) {
  const side = yacht.imageFirst ? "left" : "right";
  const contentSide = yacht.imageFirst ? "right" : "left";
  const titleWords = t(yacht.titleKey).split(" ");
  const isRtl = locale === "ar";
  const contentVariants = slideFromSide(isRtl, contentSide);

  const content = (
    <div className="extravagant-yacht-content flex flex-col justify-center px-8 py-12 lg:px-12 lg:py-16 xl:px-16">
      <motion.p
        className={cn(
          "mb-3 text-[11px] uppercase tracking-[0.18em] text-white/55",
          locale === "ar" ? "font-bodyAr" : "font-bodyEn"
        )}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
      >
        {t(yacht.dateKey)}
      </motion.p>

      <SplitHeading
        wordGroups={[titleWords]}
        active
        loop
        className={cn(
          "mb-5 font-normal uppercase leading-tight tracking-[0.05em] text-white",
          locale === "ar" ? "font-displayAr text-2xl sm:text-3xl" : "font-displayEn text-2xl sm:text-[2rem]"
        )}
      />

      <motion.p
        className={cn(
          "mb-8 max-w-md text-sm leading-relaxed text-white/65",
          locale === "ar" ? "font-bodyAr" : "font-bodyEn"
        )}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        {t(yacht.descKey)}
      </motion.p>

      <motion.div
        className="mb-8"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.4}
      >
        <p className={cn(bodyFontClass(locale), "text-[10px] uppercase tracking-[0.16em] text-white/50")}>
          {startingFromLabel}
        </p>
        <p className={cn(displayFontClass(locale), "mt-1 text-2xl text-neera-gold sm:text-[1.75rem]")}>
          {t(yacht.priceKey)}
        </p>
      </motion.div>

      <SpecsGrid
        specs={yacht.specKeys.map((s) => ({
          label: t(s.label),
          value: t(s.value),
        }))}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        animationSide={contentSide}
        locale={locale}
      />

      <motion.div
        className="mt-8 flex flex-wrap gap-3"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.7}
      >
        <Link href={yacht.detailsHref} className="extravagant-btn extravagant-btn-gold">
          {detailsLabel}
        </Link>
        <button type="button" className="extravagant-btn extravagant-btn-outline">
          {routeMapLabel}
        </button>
      </motion.div>
    </div>
  );

  const carousel = (
    <ImageCarousel
      images={yacht.images}
      alt={t(yacht.titleKey)}
      animationSide={side}
      isRtl={isRtl}
    />
  );

  return (
    <div className="grid lg:grid-cols-2">
      {yacht.imageFirst ? (
        <>
          <div className="order-1">{carousel}</div>
          <div className="order-2">{content}</div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1">{content}</div>
          <div className="order-1 lg:order-2">{carousel}</div>
        </>
      )}
    </div>
  );
}

export function ExtravagantBoatSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const titleWords = [
    t("extravagantTitle1"),
    t("extravagantTitle2"),
    t("extravagantTitle3"),
  ].filter(Boolean);

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
    <section ref={sectionRef} className="extravagant-boat-section">
      <div className="container-luxury py-16 lg:py-20">
        <motion.div
          className="mb-14 text-center lg:mb-16"
          variants={zoomIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p
            className={cn(
              "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60",
              locale === "ar" ? "font-bodyAr" : "font-bodyEn"
            )}
          >
            {t("extravagantEyebrow")}
          </p>
          <SplitHeading
            wordGroups={[titleWords]}
            loop
            active={inView}
            className={cn(
              "font-normal uppercase leading-tight tracking-[0.05em] text-white",
              locale === "ar" ? "font-displayAr text-3xl sm:text-4xl" : "font-displayEn text-3xl sm:text-[2.75rem]"
            )}
          />
        </motion.div>
      </div>

      <div className="space-y-0">
        {YACHTS.map((yacht) => (
          <YachtRow
            key={yacht.id}
            yacht={yacht}
            t={t}
            locale={locale}
            prevLabel={t("extravagantPrev")}
            nextLabel={t("extravagantNext")}
            detailsLabel={t("extravagantDetails")}
            routeMapLabel={t("extravagantRouteMap")}
            startingFromLabel={t("extravagantStartingFrom")}
          />
        ))}
      </div>
    </section>
  );
}
