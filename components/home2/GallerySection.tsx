"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { GalleryFeatureIcon } from "@/components/home2/GalleryFeatureIcons";
import { HOME2_GALLERY_FEATURES, HOME2_GALLERY_IMAGES } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE, slideInFromEnd } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { hydratedInitial, useIsHydrated } from "@/hooks/useIsHydrated";

const GALLERY_TITLE_GROUPS: Record<string, string[][]> = {
  en: [["Why", "Cruise"], ["Nation?"]],
  ar: [["لماذا", "كروز"], ["نيشن؟"]],
};

const GALLERY_MASONRY_AREAS = [
  "a", // top left
  "b", // top right
  "c", // bottom left top
  "f", // bottom left bottom
  "d", // center tall
  "e", // bottom right top
  "g", // bottom right bottom
] as const;

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: MOTION_EASE },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: MOTION_EASE, delay: 0.2 + i * 0.08 },
  }),
};

export function GallerySection() {
  const hydrated = useIsHydrated();
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const titleGroups = GALLERY_TITLE_GROUPS[locale] ?? GALLERY_TITLE_GROUPS.en;
  const fadeInRight: Variants = slideInFromEnd(isRtl, 40, 0.4);

  return (
    <section className="home2-gallery overflow-hidden bg-[#f4efe8] py-14 sm:py-20 lg:py-[150px]">
      <div className="container-luxury mb-10 text-center sm:mb-12 lg:mb-14">
        <motion.div
          variants={zoomIn}
          initial={hydratedInitial(hydrated, "hidden")}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className={cn(
              bodyFontClass(locale),
              "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a1a]/65"
            )}
          >
            {t("galleryEyebrow")}
          </p>
          <SplitHeading
            wordGroups={titleGroups}
            active
            loop
            className={cn(
              displayFontClass(locale),
              "home2-gallery-title mx-auto max-w-4xl text-3xl font-normal text-[#1a1a1a] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]",
              isRtl ? "normal-case" : "uppercase tracking-[0.04em]"
            )}
          />
        </motion.div>
      </div>

      <div className="container-luxury mb-12 lg:mb-[50px]">
        <motion.div
          className="home2-gallery-features"
          initial={hydratedInitial(hydrated, "hidden")}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {HOME2_GALLERY_FEATURES.map((key, i) => (
            <motion.div
              key={key}
              custom={i}
              variants={featureItem}
              className="home2-gallery-feature"
            >
              <GalleryFeatureIcon index={i} className="shrink-0 text-neera-gold" />
              <div className="min-w-0 flex-1">
                <h5
                  className={cn(
                    bodyFontClass(locale),
                    "text-[13px] font-medium uppercase leading-snug tracking-[0.08em] text-[#1a1a1a]"
                  )}
                >
                  {t(key)}
                </h5>
                <span className="home2-gallery-feature__sep mt-3 block" aria-hidden />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="home2-gallery-masonry"
        variants={fadeInRight}
        initial={hydratedInitial(hydrated, "hidden")}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {HOME2_GALLERY_IMAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            className={cn(
              "home2-gallery-masonry__item group relative block overflow-hidden border-0 bg-transparent p-0",
              `home2-gallery-masonry__item--${GALLERY_MASONRY_AREAS[i]}`
            )}
            onClick={() => setActiveImage(activeImage === i ? null : i)}
            aria-label={`Gallery image ${i + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={IMAGE_QUALITY}
              loading={i < 2 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </motion.div>

      {activeImage !== null ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
          onKeyDown={(e) => e.key === "Escape" && setActiveImage(null)}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close"
            tabIndex={-1}
          />
          <div className="relative h-[min(85vh,720px)] w-full max-w-5xl">
            <Image
              src={HOME2_GALLERY_IMAGES[activeImage]}
              alt=""
              fill
              className="object-contain"
              sizes="100vw"
              quality={IMAGE_QUALITY}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
