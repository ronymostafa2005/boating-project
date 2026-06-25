"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { PRICING_FAQ_BG, PRICING_FAQ_ITEMS } from "@/data/pricingPlans";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function FaqPrefixIcon() {
  return (
    <div className="pricing-faq-prefix-icon" aria-hidden>
      <span>
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M93.5,44.5L93.5,44.5h-9.9c-0.9-5.3-2.9-10.2-6-14.4l7-7c1-1,1.6-2.4,1.6-3.9c0-1.5-0.6-2.8-1.6-3.9c-2.1-2.1-5.6-2.1-7.8,0 l-7,7c-4.2-3-9.1-5.1-14.4-6V6.5C55.5,3.5,53,1,50,1c-3,0-5.5,2.5-5.5,5.5v9.9c-5.3,0.9-10.2,2.9-14.4,6l-7-7c-1-1-2.4-1.6-3.9-1.6 c-1.5,0-2.8,0.6-3.9,1.6c-2.1,2.1-2.1,5.6,0,7.8l7,7c-3,4.2-5.1,9.1-6,14.4H6.5C3.5,44.5,1,47,1,50c0,3,2.5,5.5,5.5,5.5h9.9 c0.2,0.9,0.3,1.8,0.6,2.7c0.2,0.8,1,1.2,1.7,1c0.8-0.2,1.2-1,1-1.7c-0.6-2.4-0.9-5-0.9-7.5c0-17.2,14-31.1,31.1-31.1 s31.1,14,31.1,31.1S67.2,81.2,50,81.2c-11.1,0-21.5-6-27-15.7c-0.4-0.7-1.3-0.9-2-0.5c-0.7,0.4-0.9,1.3-0.5,2c0.6,1,1.2,2,1.9,2.9 l-7,7c-1,1-1.6,2.4-1.6,3.9c0,1.5,0.6,2.8,1.6,3.9c1,1,2.5,1.6,3.9,1.6c1.4,0,2.8-0.5,3.9-1.6l7-7c0.8,0.6,1.7,1.2,2.6,1.7 c3.6,2.2,7.6,3.6,11.8,4.3v9.9c0,3,2.5,5.5,5.5,5.5c3,0,5.5-2.5,5.5-5.5v-9.9c5.3-0.9,10.2-2.9,14.4-6l7,7c1,1,2.4,1.6,3.9,1.6 c1.5,0,2.8-0.6,3.9-1.6c2.1-2.1,2.1-5.6,0-7.8l-7-7c3-4.2,5.1-9.1,6-14.4h9.9c3,0,5.5-2.5,5.5-5.5C99,47,96.5,44.5,93.5,44.5z M16.1,52.6H6.5h0c-1.4,0-2.6-1.2-2.6-2.6c0-1.4,1.2-2.6,2.6-2.6h9.6C16,48.2,16,49.1,16,50S16,51.7,16.1,52.6z M24.2,27.9l-6.8-6.8 c-1-1-1-2.7,0-3.7c0.5-0.5,1.2-0.8,1.9-0.8c0.7,0,1.3,0.3,1.9,0.8l6.8,6.8C26.5,25.3,25.3,26.6,24.2,27.9z M52.6,16.1 C51.7,16,50.9,16,50,16s-1.8,0-2.6,0.1v0V6.5c0-1.4,1.2-2.6,2.6-2.6c1.4,0,2.6,1.2,2.6,2.6V16.1z M72.1,24.2l6.8-6.8 c1-1,2.7-1,3.7,0c1,1,1,2.7,0,3.7l-6.8,6.8C74.7,26.5,73.4,25.3,72.1,24.2z M21.1,82.6L21.1,82.6c-1,1-2.7,1-3.7,0c-1-1-1-2.7,0-3.7 l6.8-6.8c1.1,1.3,2.4,2.6,3.7,3.7L21.1,82.6z M52.6,93.5c0,1.4-1.2,2.6-2.6,2.6c-1.4,0-2.6-1.2-2.6-2.6v-9.6C48.2,84,49.1,84,50,84 s1.8,0,2.6-0.1V93.5z M82.6,78.9L82.6,78.9c1,1,1,2.7,0,3.7c-1,1-2.7,1-3.7,0l-6.8-6.8c1.3-1.1,2.6-2.4,3.7-3.7L82.6,78.9z M93.5,52.6h-9.6C84,51.8,84,50.9,84,50s0-1.8-0.1-2.6h9.6c1.4,0,2.6,1.2,2.6,2.6C96.1,51.4,94.9,52.6,93.5,52.6z" />
          <path d="M50,75.9c14.3,0,25.9-11.6,25.9-25.9c0-14.3-11.6-25.9-25.9-25.9c-14.3,0-25.9,11.6-25.9,25.9C24.1,64.3,35.7,75.9,50,75.9z M50,27c12.7,0,23,10.3,23,23S62.7,73,50,73c-12.7,0-23-10.3-23-23S37.3,27,50,27z" />
          <path d="M50,63.6c7.5,0,13.6-6.1,13.6-13.6c0-4.4-2.2-8.6-5.8-11.1l0,0c-0.6-0.5-1.5-0.3-2,0.4c-0.5,0.6-0.3,1.5,0.4,2 c2.9,2,4.5,5.3,4.5,8.8c0,5.9-4.8,10.7-10.7,10.7c-5.9,0-10.7-4.8-10.7-10.7c0-5.5,4.1-10.1,9.6-10.6c0.8-0.1,1.4-0.8,1.3-1.6 s-0.8-1.4-1.6-1.3C41.7,37.2,36.4,43,36.4,50C36.4,57.5,42.5,63.6,50,63.6z" />
          <path d="M43.5,50c0,3.6,2.9,6.5,6.5,6.5s6.5-2.9,6.5-6.5s-2.9-6.5-6.5-6.5S43.5,46.4,43.5,50z M53.6,50c0,2-1.6,3.6-3.6,3.6 S46.4,52,46.4,50s1.6-3.6,3.6-3.6S53.6,48,53.6,50z" />
        </svg>
      </span>
    </div>
  );
}

function FaqAccordionArrow({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "pricing-faq-arrow shrink-0 text-white/75 transition-transform duration-300",
        open && "rotate-180"
      )}
      width="14"
      height="22"
      viewBox="0 0 14 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <path d="M7 2v18" strokeLinecap="round" />
      <path d="M2 14l5 6 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingFaqSection() {
  const t = useTranslations("pricingPlans");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";
  const [openId, setOpenId] = useState<string>(PRICING_FAQ_ITEMS[0].id);

  return (
    <section className="faq-parallax-section">
      <div className="faq-parallax-bg absolute inset-0" aria-hidden>
        <div className="faq-parallax-bg-image relative h-full w-full">
          <Image
            src={PRICING_FAQ_BG}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: isRtl ? "78% center" : "22% center" }}
            sizes="100vw"
            quality={IMAGE_QUALITY}
          />
        </div>
        <div className="faq-parallax-overlay absolute inset-0" />
      </div>

      <div className="container-luxury relative z-10 flex min-h-[inherit] items-center py-14 sm:py-16 lg:py-20">
        <div className="ms-auto w-full lg:max-w-[52%]">
          <div className="faq-parallax-content pricing-faq-intro">
            <p
              className={cn(
                bodyFontClass(locale),
                "pricing-faq-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white"
              )}
            >
              {t("faqEyebrow")}
            </p>

            <h2
              className={cn(
                displayFontClass(locale),
                "pricing-faq-title mb-8 text-3xl font-normal text-white sm:text-4xl lg:mb-10 lg:text-[2.65rem]",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
              )}
            >
              {t("faqTitle")}
            </h2>

            <div className="pricing-faq-accordion">
              {PRICING_FAQ_ITEMS.map((item) => {
                const open = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={cn("faq-accordion-item", open && "faq-accordion-item-open")}
                  >
                    <button
                      type="button"
                      className={cn(
                        bodyFontClass(locale),
                        "faq-accordion-trigger flex w-full items-center gap-4 px-4 py-4 text-start sm:px-5 sm:py-[1.15rem]",
                        !isRtl && "uppercase tracking-[0.08em]"
                      )}
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? "" : item.id)}
                    >
                      <FaqPrefixIcon />
                      <span className="min-w-0 flex-1 text-[0.8125rem] font-medium leading-snug text-white sm:text-sm">
                        {t(item.questionKey)}
                      </span>
                      <FaqAccordionArrow open={open} />
                    </button>

                    <div
                      className="faq-accordion-content grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={cn(
                            bodyFontClass(locale),
                            "px-4 pb-5 pt-1 text-sm leading-relaxed text-white sm:px-5 sm:pb-6"
                          )}
                        >
                          {t(item.answerKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
