"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { BackToTopAnchorIcon } from "@/components/ui/BackToTopAnchorIcon";
import { YachtLogo } from "@/components/ui/YachtLogo";
import { cn } from "@/lib/utils";

const CDN = "https://neera.wpenginepowered.com/wp-content/uploads";
const FOOTER_PATTERN = `${CDN}/2023/12/Neera-Footer-Pattern-Bg.png`;
const NEWSLETTER_BG = `${CDN}/2023/12/Neera-Footer-newsletter-bg.jpg`;
const GOOGLE_PLAY = `${CDN}/2023/12/google-paly-button.svg`;
const APP_STORE = `${CDN}/2023/12/app-store-image.svg`;

const NAV_LINKS = [
  { key: "whatWeDo", href: "/how-it-works" },
  { key: "ourProjects", href: "/boats" },
  { key: "aboutUs", href: "/about" },
] as const;

const SOCIAL_LINKS = [
  { id: "facebook", href: "https://www.facebook.com/" },
  { id: "instagram", href: "https://www.instagram.com/" },
  { id: "twitter", href: "https://twitter.com/" },
  { id: "whatsapp", href: "https://www.whatsapp.com/" },
] as const;

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
    </svg>
  );
}

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M97.7,6.1c-16.1,5.9-31.4,14.3-47,21.5c-16.6,7.7-33,16.1-49.5,24.2c-1,0.5-0.9,2.4,0.3,2.6c10.9,1.5,21.5,3.9,32.2,6.3c0.2,10.9-0.1,21.8,0.1,32.7c0,1.5,1.8,1.8,2.6,0.7c5.6-8.1,11.4-16.2,17.4-24.1c8.4,5,16.8,10.1,24.8,15.8c0.7,0.5,1.9,0,2.1-0.8c2.5-13.1,5.1-25.7,8.8-38.4c3.7-12.8,7.1-25.6,10-38.6C99.7,6.8,98.8,5.7,97.7,6.1z" />
    </svg>
  );
}

function SocialIcon({ id }: { id: string }) {
  const cls = "h-4 w-4";
  if (id === "facebook") {
    return (
      <svg className={cls} viewBox="0 0 50.9 98" fill="currentColor" aria-hidden>
        <path d="M33,98V53.3h15l2.2-17.4H33V24.8c0-5,1.4-8.5,8.6-8.5l9.2,0V0.7C49.3,0.5,43.8,0,37.5,0C24.1,0,15,8.1,15,23v12.8H0v17.4h15V98H33z" />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg className={cls} viewBox="0 0 50 50" fill="currentColor" aria-hidden>
        <path d="M35.5,0H14.5C6.5,0,0,6.5,0,14.5v20.9C0,43.5,6.5,50,14.5,50h20.9c8,0,14.5-6.5,14.5-14.5V14.5C50,6.5,43.5,0,35.5,0z M45.6,35.5c0,5.6-4.6,10.2-10.2,10.2H14.5c-5.6,0-10.2-4.6-10.2-10.2V14.5c0-5.6,4.6-10.2,10.2-10.2h20.9c5.6,0,10.2,4.6,10.2,10.2V35.5z" />
        <path d="M25,12.2c-7,0-12.8,5.7-12.8,12.8c0,7,5.7,12.8,12.8,12.8c7,0,12.8-5.7,12.8-12.8C37.8,18,32,12.2,25,12.2z M25,33.4c-4.6,0-8.4-3.8-8.4-8.4c0-4.6,3.8-8.4,8.4-8.4c4.6,0,8.4,3.8,8.4,8.4C33.4,29.6,29.6,33.4,25,33.4z" />
        <path d="M36.2,9.5c-1.2,1.2-1.2,3.1,0,4.3c1.2,1.2,3.1,1.2,4.3,0c1.2-1.2,1.2-3.1,0-4.3C39.3,8.3,37.4,8.3,36.2,9.5z" />
      </svg>
    );
  }
  if (id === "twitter") {
    return (
      <svg className={cls} viewBox="0 0 50 47.3" fill="currentColor" aria-hidden>
        <path d="M29.8,20.3L48.7,0h-4.6L27.8,17.5L14.7,0H0.2l19.5,26.1L0,47.3h4.6l17.1-18.4l13.7,18.4H50L29.8,20.3z M24.1,26.4L22,23.6L6.9,3.4H13L25.4,20l2.1,2.7l15.8,21.1h-6.1L24.1,26.4z" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M99,48.7c0,26.4-21.5,47.7-48.1,47.7c-8.1,0-16.1-2-23.3-5.9L1,99l8.7-25.6c-4.5-7.4-6.9-16-6.9-24.6C2.8,22.4,24.3,1,50.9,1C77.5,1,99,22.4,99,48.7z" />
    </svg>
  );
}

function PaymentIcons() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
      <li className="rounded bg-white/95 px-2 py-1 text-[10px] font-bold tracking-wide text-[#1A1F71]">VISA</li>
      <li className="rounded bg-white/95 px-2 py-1 text-[10px] font-bold text-[#1A1A1A]">MC</li>
      <li className="rounded bg-white/95 px-2 py-1 text-[10px] font-bold text-[#2478BC]">AMEX</li>
      <li className="rounded bg-white/95 px-2 py-1 text-[10px] font-bold text-[#1A1A1A]">Pay</li>
      <li className="rounded bg-white/95 px-2 py-1 text-[10px] font-bold text-[#862165]">Skrill</li>
    </ul>
  );
}

function NewsletterForm({
  placeholder,
  submitLabel,
  locale,
}: {
  placeholder: string;
  submitLabel: string;
  locale: string;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
  };

  return (
    <form
      className="footer-newsletter-form"
      onSubmit={handleSubmit}
      name="newsletterSubscribeForm"
    >
      <div className="footer-newsletter-field flex items-end gap-4">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "footer-newsletter-input min-w-0 flex-1 bg-transparent pb-3 text-sm text-white outline-none placeholder:text-white/45",
            locale === "ar" ? "font-bodyAr" : "font-bodyEn"
          )}
        />
        <button type="submit" className="footer-newsletter-submit shrink-0">
          <span className="sr-only">{submitLabel}</span>
          <PaperPlaneIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    </form>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const ctaWords = [
    t("ctaTitle1"),
    t("ctaTitle2"),
    t("ctaTitle3"),
    t("ctaTitle4"),
  ].filter(Boolean);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="neera-footer relative bg-[#0f1e2d] text-white">
      <div
        className="neera-footer-pattern pointer-events-none absolute inset-0"
        aria-hidden
        style={{ backgroundImage: `url(${FOOTER_PATTERN})` }}
      />

      <div className="container-luxury relative z-[1] pt-16 pb-8 lg:pt-24 xl:pt-28">
        {/* Top row: brand + newsletter CTA */}
        <div className="mb-14 grid gap-10 lg:mb-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="mb-6 inline-flex items-center gap-2.5">
              <YachtLogo className="text-neera-gold" />
              <span
                className={cn(
                  "text-lg font-medium tracking-tight text-white sm:text-xl",
                  locale === "ar" ? "font-displayAr" : "font-displayEn"
                )}
              >
                Boating<span className="text-neera-gold">.sa</span>
              </span>
            </Link>
            <p
              className={cn(
                "mb-6 max-w-sm text-sm leading-relaxed text-white/70",
                locale === "ar" ? "font-bodyAr" : "font-bodyEn"
              )}
            >
              {t("description")}
            </p>
            <ul className="footer-inline-nav flex flex-wrap items-center gap-x-1 gap-y-2">
              {NAV_LINKS.map((link, index) => (
                <li key={link.key} className="flex items-center">
                  {index > 0 ? (
                    <span className="mx-3 text-white/25" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white",
                      locale === "ar" ? "font-bodyAr" : "font-bodyEn"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <div className="footer-cta relative overflow-hidden">
              <Image
                src={NEWSLETTER_BG}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="footer-cta-overlay absolute inset-0" aria-hidden />

              <div className="relative z-[1] grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:py-14">
                <div className="text-center lg:text-start">
                  <p
                    className={cn(
                      "mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/65",
                      locale === "ar" ? "font-bodyAr" : "font-bodyEn"
                    )}
                  >
                    {t("businessTalks")}
                  </p>
                  <SplitHeading
                    wordGroups={[ctaWords]}
                    loop
                    active
                    className={cn(
                      "footer-cta-heading font-normal uppercase leading-[1.15] tracking-[0.05em] text-white",
                      locale === "ar" ? "font-displayAr text-2xl sm:text-3xl" : "font-displayEn text-2xl sm:text-[2rem]"
                    )}
                  />
                </div>

                <NewsletterForm
                  placeholder={t("emailPlaceholder")}
                  submitLabel={t("submit")}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle row */}
        <div className="mb-12 grid gap-10 border-t border-white/10 pt-12 lg:mb-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h5
              className={cn(
                "mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80",
                locale === "ar" ? "font-bodyAr" : "font-bodyEn"
              )}
            >
              {t("getTheApp")}
            </h5>
            <div className="footer-app-buttons flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image src={GOOGLE_PLAY} alt="Google Play" width={140} height={42} className="h-10 w-auto" />
              </a>
              <a
                href="https://apps.apple.com/us/app/apple-store/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Image src={APP_STORE} alt="App Store" width={140} height={42} className="h-10 w-auto" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h5
                className={cn(
                  "mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80",
                  locale === "ar" ? "font-bodyAr" : "font-bodyEn"
                )}
              >
                {t("addressTitle")}
              </h5>
              <div className="flex gap-3 text-sm leading-relaxed text-white/70">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                <p className={locale === "ar" ? "font-bodyAr" : "font-bodyEn"}>{t("address")}</p>
              </div>
            </div>

            <div>
              <h5
                className={cn(
                  "mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80",
                  locale === "ar" ? "font-bodyAr" : "font-bodyEn"
                )}
              >
                {t("contactTitle")}
              </h5>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a href="tel:000123456789" className="flex items-center gap-3 transition-colors hover:text-white">
                    <PhoneIcon className="h-4 w-4 shrink-0 text-white/60" />
                    <span className={locale === "ar" ? "font-bodyAr" : "font-bodyEn"}>{t("phone")}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@example.com"
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <EnvelopeIcon className="h-4 w-4 shrink-0 text-white/60" />
                    <span className={locale === "ar" ? "font-bodyAr" : "font-bodyEn"}>{t("email")}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5
                className={cn(
                  "mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80",
                  locale === "ar" ? "font-bodyAr" : "font-bodyEn"
                )}
              >
                {t("socialTitle")}
              </h5>
              <ul className="footer-social-icons flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/5"
                      aria-label={social.id}
                    >
                      <SocialIcon id={social.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8 lg:flex-row lg:justify-between">
          <p
            className={cn(
              "text-center text-xs text-white/55 lg:text-start",
              locale === "ar" ? "font-bodyAr" : "font-bodyEn"
            )}
          >
            {t("copyright", { year })}
          </p>

          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <PaymentIcons />
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-scroll-top flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neera-gold transition-colors hover:bg-neera-gold-dark"
              aria-label={t("scrollTop")}
            >
              <BackToTopAnchorIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
