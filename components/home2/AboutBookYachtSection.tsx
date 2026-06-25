"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { AboutFeatureIcon } from "@/components/home2/AboutServiceIcons";
import {
  HOME2_ABOUT_LIST,
  HOME2_ABOUT_SIDE_IMAGE,
  HOME2_FILLER_SLIDES,
  HOME2_TESTIMONIALS,
} from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

function ArrowLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 24" fill="currentColor" aria-hidden>
      <path d="M98.7 12.6 84.4 22.8c-.3.2-.7.2-1-.1-.3-.2-.3-.6-.1-.9l6.2-9.9-6.1-9.7c-.2-.3-.1-.7.1-.9.1-.1.3-.2.5-.2.2 0 .3 0 .4.1l14.2 10.2c.2.1.3.4.3.6 0 .2-.1.4-.3.6z" />
      <path d="M82.7 13.6H1v-3.4h81.7v3.4z" />
    </svg>
  );
}

const fadeInUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: MOTION_EASE, delay },
  },
});

const featureItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: MOTION_EASE, delay: 0.45 + i * 0.07 },
  }),
};

export function AboutBookYachtSection() {
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [fillerIndex, setFillerIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFillerIndex((i) => (i + 1) % HOME2_FILLER_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % HOME2_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filler = HOME2_FILLER_SLIDES[fillerIndex];
  const testimonial = HOME2_TESTIMONIALS[testimonialIndex];
  const leftFeatures = HOME2_ABOUT_LIST.slice(0, 3);
  const rightFeatures = HOME2_ABOUT_LIST.slice(3, 6);

  return (
    <section className="home2-about-section overflow-hidden py-16 lg:py-24">
      <div className="container-luxury">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          {/* Left — content & features */}
          <motion.div
            className="text-start lg:col-span-6 xl:col-span-6"
            variants={fadeInUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p
              className={cn(
                bodyFontClass(locale),
                "mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-neera-gold"
              )}
            >
              {t("aboutEyebrow")}
            </p>

            <SplitHeading
              wordGroups={t("aboutTitle").split(" ").map((word) => [word])}
              active
              loop
              className={cn(
                displayFontClass(locale),
                "home2-about-title mb-10 max-w-xl text-3xl font-normal leading-[1.12] text-[#1a1a1a] sm:text-4xl lg:text-[2.65rem]",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.03em]"
              )}
            />

            <div className="mb-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {[leftFeatures, rightFeatures].map((column, colIdx) => (
                <ul key={colIdx} className="space-y-5">
                  {column.map((key, i) => {
                    const globalIndex = colIdx * 3 + i;
                    return (
                      <motion.li
                        key={key}
                        custom={globalIndex}
                        variants={featureItem}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <span className="shrink-0 text-[#1a1a1a]/85">
                          <AboutFeatureIcon index={globalIndex} />
                        </span>
                        <span
                          className={cn(
                            displayFontClass(locale),
                            "text-[15px] leading-snug text-[#1a1a1a]/90 sm:text-base",
                            !isRtl && "capitalize"
                          )}
                        >
                          {t(key)}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Link href="/about" className="neera-btn-know-more inline-flex">
                {t("aboutViewMore")}
              </Link>
              <Link
                href="/boats"
                className={cn(
                  "home2-text-link group inline-flex items-center gap-3",
                  bodyFontClass(locale)
                )}
              >
                <span>{t("bookYacht")}</span>
                <ArrowLinkIcon className="h-2.5 w-10 text-[#1a1a1a]/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neera-gold rtl:scale-x-[-1] rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Middle — filler carousel */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeInUp(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="home2-filler-carousel mx-auto max-w-[340px] lg:max-w-none">
              <div className="relative aspect-[400/465] overflow-hidden bg-[#eef1f4]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filler.titleKey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: MOTION_EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={filler.image}
                      alt={t(filler.titleKey)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 340px, 25vw"
                      quality={IMAGE_QUALITY}
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.h3
                  key={filler.titleKey}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: MOTION_EASE }}
                  className={cn(
                    displayFontClass(locale),
                    "mt-6 text-center text-lg font-normal leading-snug text-[#1a1a1a] sm:text-xl",
                    !isRtl && "uppercase tracking-[0.04em]"
                  )}
                >
                  {t(filler.titleKey)}
                </motion.h3>
              </AnimatePresence>

              <div className="mt-5 flex items-center justify-center gap-2.5">
                {HOME2_FILLER_SLIDES.map((slide, i) => (
                  <button
                    key={slide.titleKey}
                    type="button"
                    onClick={() => setFillerIndex(i)}
                    className={cn(
                      "home2-filler-dot flex h-3 w-3 items-center justify-center rounded-full transition-all duration-300",
                      i === fillerIndex
                        ? "border border-[#1a1a1a]/35 bg-transparent"
                        : "bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/35"
                    )}
                    aria-label={t(slide.titleKey)}
                    aria-current={i === fillerIndex}
                  >
                    {i === fillerIndex && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1a1a1a]/70" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — compass image + testimonial */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeInUp(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="home2-about-side relative mx-auto min-h-[420px] max-w-[380px] overflow-hidden sm:min-h-[500px] lg:mx-0 lg:max-w-none lg:min-h-[560px]">
              <Image
                src={HOME2_ABOUT_SIDE_IMAGE}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 380px, 25vw"
                quality={IMAGE_QUALITY}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#243647]/90 via-[#243647]/20 to-transparent" aria-hidden />

              <div className="absolute inset-x-0 bottom-0 px-6 py-8 sm:px-8 sm:py-10">
                <span
                  className={cn(
                    displayFontClass(locale),
                    "pointer-events-none mb-3 block text-5xl leading-none text-white/20"
                  )}
                  aria-hidden
                >
                  &ldquo;
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonial.authorKey}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.55, ease: MOTION_EASE }}
                  >
                    <p
                      className={cn(
                        bodyFontClass(locale),
                        "mb-5 text-sm leading-relaxed text-white/88 italic sm:text-[15px]"
                      )}
                    >
                      {t(testimonial.quoteKey)}
                    </p>
                    <p
                      className={cn(
                        displayFontClass(locale),
                        "text-sm font-medium uppercase tracking-[0.12em] text-white",
                        isRtl && "normal-case tracking-normal"
                      )}
                    >
                      — {t(testimonial.authorKey)}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
