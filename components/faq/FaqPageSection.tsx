"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import type { Locale } from "@/types/locale";

export interface FaqPageItem {
  id: string;
  title: string;
  content: string;
}

interface FaqPageSectionProps {
  items: FaqPageItem[];
}

function FaqDecorIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5 shrink-0 text-neera-gold", className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1.5l1.2 4.4 4.4 1.2-4.4 1.2L12 12.7l-1.2-4.4-4.4-1.2 4.4-1.2L12 1.5zm0 10.3l1.4 5.1 5.1 1.4-5.1 1.4L12 24.6l-1.4-5.1-5.1-1.4 5.1-1.4L12 11.8z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6.5 4h3l1.5 5-2 1.5c1.2 2.4 3.1 4.3 5.5 5.5L15.5 14l5 1.5v3c0 .8-.7 1.5-1.5 1.5C9.2 20 4 14.8 4 7.5 4 6.7 4.7 6 5.5 6z" strokeLinejoin="round" />
    </svg>
  );
}

function FaqToggleArrow({ open }: { open: boolean }) {
  return (
    <svg
      className={cn("faq-page-arrow shrink-0 text-[#1a1a1a]/45 transition-transform duration-300", open && "rotate-180")}
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

export function FaqPageSection({ items }: FaqPageSectionProps) {
  const t = useTranslations("faq");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const contactRows: {
    key: string;
    icon: typeof PinIcon;
    lines: string[];
    href?: string;
  }[] = [
    {
      key: "address",
      icon: PinIcon,
      lines: [t("addressLine1"), t("addressLine2")],
    },
    { key: "hours", icon: ClockIcon, lines: [t("hours")] },
    { key: "email", icon: MailIcon, lines: [t("email")], href: `mailto:${t("email")}` },
    {
      key: "phone",
      icon: PhoneIcon,
      lines: [t("phone")],
      href: `tel:${t("phone").replace(/\s/g, "")}`,
    },
  ];

  return (
    <section className="faq-page-section bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-luxury">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-8">
            <h2
              className={cn(
                displayFontClass(locale),
                "faq-page-title mb-8 text-[#1a1a1a] sm:mb-10",
                isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.06em]"
              )}
            >
              {t("sectionTitle")}
            </h2>

            <div className="faq-page-accordion">
              {items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={cn("faq-page-item", isOpen && "faq-page-item--open")}
                  >
                    <button
                      type="button"
                      className={cn(
                        bodyFontClass(locale),
                        "faq-page-trigger"
                      )}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                    >
                      <FaqDecorIcon />
                      <span
                        className={cn(
                          "faq-page-question flex-1 text-start",
                          !isRtl && "uppercase tracking-[0.04em]"
                        )}
                      >
                        {item.title}
                      </span>
                      <FaqToggleArrow open={isOpen} />
                    </button>
                    <div
                      className={cn(
                        "faq-page-answer-grid",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className={cn(bodyFontClass(locale), "faq-page-answer")}>
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="faq-page-item faq-page-cta">
              <div className="faq-page-cta__inner">
                <div className="faq-page-cta__copy">
                  <h3
                    className={cn(
                      displayFontClass(locale),
                      "faq-page-cta__title text-[#1a1a1a]",
                      isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.06em]"
                    )}
                  >
                    {t("ctaTitle")}
                  </h3>
                  <p className={cn(bodyFontClass(locale), "faq-page-cta__subtitle")}>
                    {t("ctaSubtitle")}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className={cn(bodyFontClass(locale), "faq-page-cta__btn shrink-0")}
                >
                  {t("ctaButton")}
                </Link>
              </div>
            </div>
          </div>

          <aside className="faq-page-contact-aside lg:col-span-4">
            <h3
              className={cn(
                displayFontClass(locale),
                "faq-page-contact-title text-[#1a1a1a]",
                isRtl ? "normal-case" : "uppercase"
              )}
            >
              {t("contactTitle")}
            </h3>

            <ul className="faq-page-contact-list">
              {contactRows.map(({ key, icon: Icon, lines, href }) => {
                const content = (
                  <span className={cn(bodyFontClass(locale), "faq-page-contact-text")}>
                    {lines.map((line, index) => (
                      <span key={index} className="faq-page-contact-line">
                        {line}
                      </span>
                    ))}
                  </span>
                );

                return (
                  <li key={key} className="faq-page-contact-row">
                    <span className="faq-page-contact-icon">
                      <Icon className="faq-page-contact-icon__svg" />
                    </span>
                    {href ? (
                      <a href={href} className="faq-page-contact-link">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/faq.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 33vw"
                quality={IMAGE_QUALITY}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
