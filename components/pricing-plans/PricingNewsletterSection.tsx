"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

export function PricingNewsletterSection() {
  const t = useTranslations("pricingPlans");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    setSubmitted(true);
  };

  return (
    <section className="pricing-plans-newsletter bg-white py-16 lg:py-20">
      <div className="container-luxury">
        <div className="pricing-plans-newsletter-grid">
          <div className="pricing-plans-newsletter-copy w-full text-center lg:text-start">
            <p
              className={cn(
                bodyFontClass(locale),
                "mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/65"
              )}
            >
              {t("newsletterEyebrow")}
            </p>
            <h2
              className={cn(
                displayFontClass(locale),
                "pricing-plans-newsletter-title w-full text-3xl font-normal text-[#1a1a1a] sm:text-4xl lg:text-[2.65rem]",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
              )}
            >
              {t("newsletterTitle")}
            </h2>
          </div>

          <div className="pricing-plans-newsletter-form-wrap w-full">
            <form
              className="pricing-plans-newsletter-form w-full"
              onSubmit={handleSubmit}
              name="pricingNewsletterForm"
            >
              <div className="pricing-plans-newsletter-field">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  className={cn(
                    bodyFontClass(locale),
                    "pricing-plans-newsletter-input min-w-0 flex-1 bg-transparent text-sm text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]/45"
                  )}
                />
                <button
                  type="submit"
                  className={cn(bodyFontClass(locale), "pricing-plans-newsletter-submit shrink-0")}
                >
                  {t("newsletterSubmit")}
                </button>
              </div>
            </form>
            {submitted ? (
              <p className={cn(bodyFontClass(locale), "mt-3 text-sm text-neera-gold")}>
                {t("newsletterThanks")}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
