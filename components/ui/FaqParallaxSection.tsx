"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn } from "@/lib/utils";
import { slideInFromEnd } from "@/lib/motionVariants";

const BG_IMAGE = "/images/faq-parallax-bg.jpg";

const FAQ_ITEMS = [
  { id: "orders", questionKey: "homeFaq1Q", answerKey: "homeFaq1A" },
  { id: "cancel", questionKey: "homeFaq2Q", answerKey: "homeFaq2A" },
  { id: "refund", questionKey: "homeFaq3Q", answerKey: "homeFaq3A" },
  { id: "cruise", questionKey: "homeFaq4Q", answerKey: "homeFaq4A" },
] as const;

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function HelmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M93.5,44.5h-9.9c-0.9-5.3-2.9-10.2-6-14.4l7-7c1-1,1.6-2.4,1.6-3.9c0-1.5-0.6-2.8-1.6-3.9c-2.1-2.1-5.6-2.1-7.8,0l-7,7c-4.2-3-9.1-5.1-14.4-6V6.5C55.5,3.5,53,1,50,1c-3,0-5.5,2.5-5.5,5.5v9.9c-5.3,0.9-10.2,2.9-14.4,6l-7-7c-1-1-2.4-1.6-3.9-1.6c-1.5,0-2.8,0.6-3.9,1.6c-2.1,2.1-2.1,5.6,0,7.8l7,7c-3,4.2-5.1,9.1-6,14.4H6.5C3.5,44.5,1,47,1,50c0,3,2.5,5.5,5.5,5.5h9.9c0.2,0.9,0.3,1.8,0.6,2.7c0.2,0.8,1,1.2,1.7,1c0.8-0.2,1.2-1,1-1.7c-0.6-2.4-0.9-5-0.9-7.5c0-17.2,14-31.1,31.1-31.1s31.1,14,31.1,31.1S67.2,81.2,50,81.2c-11.1,0-21.5-6-27-15.7c-0.4-0.7-1.3-0.9-2-0.5c-0.7,0.4-0.9,1.3-0.5,2c0.6,1,1.2,2,1.9,2.9l-7,7c-1,1-1.6,2.4-1.6,3.9c0,1.5,0.6,2.8,1.6,3.9c1,1,2.5,1.6,3.9,1.6c1.4,0,2.8-0.5,3.9-1.6l7-7c0.8,0.6,1.7,1.2,2.6,1.7c3.6,2.2,7.6,3.6,11.8,4.3v9.9c0,3,2.5,5.5,5.5,5.5c3,0,5.5-2.5,5.5-5.5v-9.9c5.3-0.9,10.2-2.9,14.4-6l7,7c1,1,2.4,1.6,3.9,1.6c1.5,0,2.8-0.6,3.9-1.6c2.1-2.1,2.1-5.6,0-7.8l-7-7c3-4.2,5.1-9.1,6-14.4h9.9c3,0,5.5-2.5,5.5-5.5C99,47,96.5,44.5,93.5,44.5z" />
      <path d="M50,75.9c14.3,0,25.9-11.6,25.9-25.9c0-14.3-11.6-25.9-25.9-25.9c-14.3,0-25.9,11.6-25.9,25.9C24.1,64.3,35.7,75.9,50,75.9z M50,27c12.7,0,23,10.3,23,23S62.7,73,50,73c-12.7,0-23-10.3-23-23S37.3,27,50,27z" />
      <path d="M50,63.6c7.5,0,13.6-6.1,13.6-13.6c0-4.4-2.2-8.6-5.8-11.1c-0.6-0.5-1.5-0.3-2,0.4c-0.5,0.6-0.3,1.5,0.4,2c2.9,2,4.5,5.3,4.5,8.8c0,5.9-4.8,10.7-10.7,10.7c-5.9,0-10.7-4.8-10.7-10.7c0-5.5,4.1-10.1,9.6-10.6c0.8-0.1,1.4-0.8,1.3-1.6s-0.8-1.4-1.6-1.3C41.7,37.2,36.4,43,36.4,50C36.4,57.5,42.5,63.6,50,63.6z" />
      <path d="M43.5,50c0,3.6,2.9,6.5,6.5,6.5s6.5-2.9,6.5-6.5s-2.9-6.5-6.5-6.5S43.5,46.4,43.5,50z M53.6,50c0,2-1.6,3.6-3.6,3.6S46.4,52,46.4,50s1.6-3.6,3.6-3.6S53.6,48,53.6,50z" />
    </svg>
  );
}

function AccordionArrow({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-5 w-2 shrink-0 text-white transition-transform duration-500 ease-out",
        open && "rotate-180"
      )}
      viewBox="0 0 30 90"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14.3,88.6l-12.8-18c-0.3-0.4-0.2-0.9,0.1-1.2c0.3-0.3,0.8-0.4,1.2-0.2L15.1,77l12.2-7.7c0.4-0.2,0.9-0.2,1.2,0.2c0.2,0.2,0.3,0.4,0.3,0.7c0,0.2-0.1,0.4-0.2,0.6L15.8,88.6C15.6,88.9,15.4,89,15,89C14.7,89,14.5,88.9,14.3,88.6z" />
      <path d="M13,68.5V1h4.3v67.5H13z" />
    </svg>
  );
}

function FaqAccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  locale,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  locale: string;
}) {
  return (
    <div className={cn("faq-accordion-item", isOpen && "faq-accordion-item-open")}>
      <button
        type="button"
        className="faq-accordion-trigger flex w-full items-center justify-between gap-4 px-5 py-5 text-start sm:px-6 sm:py-6"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        id={`faq-trigger-${id}`}
      >
        <span className="flex min-w-0 flex-1 items-center gap-4">
          <HelmIcon className="h-5 w-5 shrink-0 text-white/90" />
          <span
            className={cn(
              "text-sm font-normal uppercase leading-snug tracking-[0.04em] text-white sm:text-[15px]",
              locale === "ar" ? "font-displayAr" : "font-displayEn"
            )}
          >
            {question}
          </span>
        </span>
        <AccordionArrow open={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                "faq-accordion-content px-5 pb-6 ps-[3.25rem] text-sm leading-relaxed text-white/80 sm:px-6 sm:pb-7 sm:ps-[3.5rem]",
                locale === "ar" ? "font-bodyAr" : "font-bodyEn"
              )}
            >
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqParallaxSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  const titleWords = [
    t("homeFaqTitle1"),
    t("homeFaqTitle2"),
    t("homeFaqTitle3"),
  ].filter(Boolean);
  const titleWordGroups = [titleWords];

  const headingVariants = useMemo(
    () => slideInFromEnd(false, 48, 0.3),
    []
  );
  const accordionVariants = useMemo(
    () => slideInFromEnd(false, 48, 0.45),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.12 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="faq-parallax-section relative overflow-hidden bg-[#0f1e2d]"
    >
      <div className="faq-parallax-bg absolute inset-0" aria-hidden dir="ltr">
        <motion.div
          className="faq-parallax-bg-image absolute -inset-[12%] will-change-transform"
          style={{ y: bgY, scale: bgScale }}
        >
          <Image
            src={BG_IMAGE}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "22% center" }}
            sizes="100vw"
            priority={false}
          />
        </motion.div>
        <div className="faq-parallax-overlay absolute inset-0" />
      </div>

      <div className="container-luxury relative z-[1] py-16 lg:py-28">
        <div
          className="faq-parallax-layout grid items-center gap-10 lg:grid-cols-2 lg:gap-0"
          dir="ltr"
        >
          <div className="hidden min-h-[1px] lg:block" aria-hidden />

          <div className="faq-parallax-content lg:ps-10 xl:ps-16" dir={locale === "ar" ? "rtl" : "ltr"}>
            <motion.div
              className="faq-parallax-heading-block mb-10 text-center lg:mb-12"
              variants={headingVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <p
                className={cn(
                  "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/65",
                  locale === "ar" ? "font-bodyAr" : "font-bodyEn"
                )}
              >
                {t("homeFaqEyebrow")}
              </p>
              <SplitHeading
                wordGroups={titleWordGroups}
                loop
                active={inView}
                className={cn(
                  "faq-parallax-heading font-normal uppercase leading-[1.2] tracking-[0.05em] text-white",
                  locale === "ar" ? "font-displayAr text-2xl sm:text-3xl lg:text-4xl" : "font-displayEn text-2xl sm:text-3xl lg:text-[2.35rem]"
                )}
              />
            </motion.div>

            <motion.div
              className="faq-accordion space-y-0"
              variants={accordionVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {FAQ_ITEMS.map((item) => (
                <FaqAccordionItem
                  key={item.id}
                  id={item.id}
                  question={t(item.questionKey)}
                  answer={t(item.answerKey)}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
                  locale={locale}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
