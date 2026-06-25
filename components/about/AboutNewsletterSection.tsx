"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { slideFromSide } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const NEWSLETTER_TITLE_GROUPS: Record<string, string[][]> = {
  en: [["Subscribe"], ["today!"]],
};

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M97.7,6.1c-16.1,5.9-31.4,14.3-47,21.5c-16.6,7.7-33,16.1-49.5,24.2c-1,0.5-0.9,2.4,0.3,2.6c10.9,1.5,21.5,3.9,32.2,6.3c0.2,10.9-0.1,21.8,0.1,32.7c0,1.5,1.8,1.8,2.6,0.7c5.6-8.1,11.4-16.2,17.4-24.1c8.4,5,16.8,10.1,24.8,15.8c0.7,0.5,1.9,0,2.1-0.8c2.5-13.1,5.1-25.7,8.8-38.4c3.7-12.8,7.1-25.6,10-38.6C99.7,6.8,98.8,5.7,97.7,6.1z" />
    </svg>
  );
}

export function AboutNewsletterSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const titleGroups =
    locale === "ar"
      ? [t("newsletterTitleLine1").split(" "), t("newsletterTitleLine2").split(" ")]
      : NEWSLETTER_TITLE_GROUPS.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    setSubmitted(true);
  };

  return (
    <section className="about-newsletter-section bg-white py-16 lg:py-20">
      <div className="container-luxury">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="text-center lg:text-start"
            variants={slideFromSide(isRtl, "left")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            custom={0.3}
          >
            <p
              className={cn(
                bodyFontClass(locale),
                "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a1a]/65"
              )}
            >
              {t("newsletterEyebrow")}
            </p>
            <SplitHeading
              wordGroups={titleGroups}
              active
              loop
              className={cn(
                displayFontClass(locale),
                "about-newsletter-title text-3xl font-normal text-[#1a1a1a] sm:text-4xl lg:text-[2.65rem]",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
              )}
            />
          </motion.div>

          <motion.div
            variants={slideFromSide(isRtl, "right")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            custom={0.3}
          >
            <form
              className="about-newsletter-form mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
              onSubmit={handleSubmit}
              name="mailchimpSubscribeForm"
            >
              <div className="about-newsletter-field flex items-end gap-4 sm:gap-5">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  className={cn(
                    bodyFontClass(locale),
                    "about-newsletter-input min-w-0 flex-1 bg-transparent pb-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/45"
                  )}
                />
                <button type="submit" className={cn(bodyFontClass(locale), "about-newsletter-submit shrink-0")}>
                  <span>{t("newsletterSubmit")}</span>
                  <PaperPlaneIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
            {submitted ? (
              <p className={cn(bodyFontClass(locale), "mt-3 text-sm text-neera-gold")}>
                {locale === "ar" ? "شكراً لاشتراكك!" : "Thank you for subscribing!"}
              </p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
