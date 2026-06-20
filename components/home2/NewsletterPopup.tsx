"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { HOME2_NEWSLETTER_IMAGE } from "@/data/home2";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const STORAGE_KEY = "home2-newsletter-dismissed";

export function NewsletterPopup() {
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <div className="home2-newsletter relative w-full max-w-3xl overflow-hidden bg-white shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute end-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
          aria-label={t("newsletterClose")}
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative hidden min-h-[280px] md:block">
            <Image src={HOME2_NEWSLETTER_IMAGE} alt="" fill className="object-cover" sizes="400px" />
          </div>

          <div className="p-8 text-start sm:p-10">
            <p className={cn(bodyFontClass(locale), "mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a1a]/65")}>
              {t("newsletterEyebrow")}
            </p>
            <h3 className={cn(displayFontClass(locale), "mb-3 text-2xl text-[#1a1a1a] sm:text-3xl", isRtl && "normal-case")}>
              {t("newsletterTitle")}
            </h3>
            <p className={cn(bodyFontClass(locale), "mb-6 text-sm leading-relaxed text-[#1a1a1a]/70")}>
              {t("newsletterDesc")}
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                dismiss();
              }}
            >
              <input type="email" placeholder={t("newsletterPlaceholder")} className="home2-input" required />
              <button type="submit" className="neera-btn-know-more w-full justify-center">
                {t("newsletterSubmit")}
              </button>
            </form>

            <p className={cn(bodyFontClass(locale), "mt-4 text-xs text-[#1a1a1a]/55")}>
              {t("newsletterPrivacy")}{" "}
              <Link href="/privacy" className="text-neera-gold hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
