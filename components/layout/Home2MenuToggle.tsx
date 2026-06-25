"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavbarLogo } from "./NavbarLogo";
import type { NavDropdownItem } from "./NavDropdown";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, home2FontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

const CDN = "https://neera.wpenginepowered.com/wp-content/uploads";
const WHATSAPP_QR = `${CDN}/2023/12/Neera-WhatsApp-QR.png`;
const SIDEBAR_CTA_BG = `${CDN}/2023/12/Neera-Footer-newsletter-bg.jpg`;

interface Home2MenuToggleProps {
  navItems: NavDropdownItem[];
}

function TwoLineMenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
      <path d="M0 1H22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 11H22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M6 16.5V13.5C6 8.80558 9.80558 5 14.5 5C19.1944 5 23 8.80558 23 13.5V16.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect x="4" y="15" width="4.5" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="19.5" y="15" width="4.5" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M99,48.7c0,26.4-21.5,47.7-48.1,47.7c-8.1,0-16.1-2-23.3-5.9L1,99l8.7-25.6c-4.5-7.4-6.9-16-6.9-24.6C2.8,22.4,24.3,1,50.9,1C77.5,1,99,22.4,99,48.7z" />
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

function flattenNavItems(items: NavDropdownItem[]) {
  const links: { key: string; href?: string; onClick?: () => void }[] = [];
  for (const item of items) {
    if (item.children?.length) {
      for (const child of item.children) {
        links.push({ key: child.key, href: child.href, onClick: child.onClick });
      }
    } else if (item.href) {
      links.push({ key: item.key, href: item.href });
    }
  }
  return links;
}

export function Home2MenuToggle({ navItems }: Home2MenuToggleProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const mobileLinks = flattenNavItems(navItems);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";
  const phoneMain = tNav("callPhone");
  const phoneAboard = tNav("topBarPhone");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !agreed) return;
    setEmail("");
    setAgreed(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 text-neera-gold transition-colors hover:text-neera-gold-dark"
        aria-label={tNav("openMenu")}
        aria-expanded={open}
      >
        <TwoLineMenuIcon />
      </button>

      <div
        className={cn("home2-offcanvas", open && "home2-offcanvas--open")}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="home2-offcanvas__backdrop"
          aria-label={tNav("closeMenu")}
          onClick={() => setOpen(false)}
        />

        <aside
          className="home2-offcanvas__panel"
          role="dialog"
          aria-modal="true"
          aria-label={tNav("openMenu")}
        >
          <button
            type="button"
            className="home2-offcanvas__close"
            aria-label={tNav("closeMenu")}
            onClick={() => setOpen(false)}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeWidth="1.75" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Mobile: pages + language */}
          <div className="home2-offcanvas__mobile lg:hidden">
            <nav className="home2-offcanvas__nav">
              {mobileLinks.map((link) =>
                link.onClick ? (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => {
                      link.onClick?.();
                      setOpen(false);
                    }}
                    className={cn(home2FontClass(locale), "home2-offcanvas__nav-link text-start")}
                  >
                    {tNav(link.key)}
                  </button>
                ) : (
                  <Link
                    key={link.key}
                    href={link.href!}
                    onClick={() => setOpen(false)}
                    className={cn(
                      home2FontClass(locale),
                      "home2-offcanvas__nav-link",
                      pathname === link.href && "text-neera-gold"
                    )}
                  >
                    {tNav(link.key)}
                  </Link>
                )
              )}
            </nav>

            <div className="home2-offcanvas__mobile-lang mx-0 mt-4">
              <span className={cn(home2FontClass(locale), "home2-offcanvas__lang-label")}>
                {tNav("language")}
              </span>
              <LanguageSwitcher variant="hero" />
            </div>
          </div>

          {/* Desktop: contact sidebar */}
          <div className="home2-offcanvas__desktop hidden lg:flex lg:flex-col">
            <Link href="/home-2" className="mb-5 inline-flex" onClick={() => setOpen(false)}>
              <NavbarLogo locale={locale} textClassName="text-[#1a1a1a]" imageClassName="text-[#1a1a1a]" />
            </Link>

            <p className={cn(home2FontClass(locale), "home2-offcanvas__desc mb-6")}>
              {tFooter("description")}
            </p>

            <div className="home2-offcanvas__card mb-4">
              <HeadsetIcon className="shrink-0 text-neera-gold" />
              <p className={cn(home2FontClass(locale), "home2-offcanvas__card-text")}>
                {tNav("sidebarCallPrefix")}{" "}
                <a href={`tel:${phoneMain.replace(/\s/g, "")}`} className="text-neera-gold">
                  {phoneMain}
                </a>{" "}
                {tNav("sidebarCallMiddle")}{" "}
                <a href={`tel:${phoneAboard.replace(/\s/g, "")}`} className="text-neera-gold">
                  {phoneAboard}
                </a>
              </p>
            </div>

            <div className="home2-offcanvas__card home2-offcanvas__card--whatsapp mb-6">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2 text-[#1a1a1a]">
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  <span className={cn(home2FontClass(locale), "text-sm font-medium")}>
                    {tNav("sidebarWhatsAppTitle")}
                  </span>
                </div>
                <p className={cn(home2FontClass(locale), "home2-offcanvas__card-text")}>
                  {tNav("sidebarWhatsAppHelp")}
                </p>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="home2-offcanvas__qr shrink-0"
              >
                <Image
                  src={WHATSAPP_QR}
                  alt="WhatsApp QR"
                  width={88}
                  height={88}
                  quality={IMAGE_QUALITY}
                />
              </a>
            </div>

            <div className="home2-offcanvas__cta relative mt-auto overflow-hidden">
              <Image
                src={SIDEBAR_CTA_BG}
                alt=""
                fill
                className="object-cover"
                sizes="420px"
                quality={IMAGE_QUALITY}
                aria-hidden
              />
              <div className="absolute inset-0 bg-[#0a1628]/82" aria-hidden />
              <div className="relative z-[1] p-6">
                <SplitHeadingMini locale={locale} tFooter={tFooter} />
                <form onSubmit={handleNewsletterSubmit} className="home2-offcanvas__form">
                  <div className="flex items-end gap-3 border-b border-white/35 pb-2">
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={tFooter("emailPlaceholder")}
                      className={cn(home2FontClass(locale), "home2-offcanvas__input min-w-0 flex-1")}
                    />
                    <button type="submit" className="home2-offcanvas__submit shrink-0" disabled={!agreed}>
                      <span className="sr-only">{tFooter("submit")}</span>
                      <PaperPlaneIcon className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <label className={cn(home2FontClass(locale), "home2-offcanvas__privacy mt-4 flex items-start gap-2")}>
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>
                      {tNav("sidebarPrivacyPrefix")}{" "}
                      <Link href="/privacy" className="underline" onClick={() => setOpen(false)}>
                        {tNav("privacy")}
                      </Link>
                    </span>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function SplitHeadingMini({
  locale,
  tFooter,
}: {
  locale: Locale;
  tFooter: ReturnType<typeof useTranslations<"footer">>;
}) {
  const words = [tFooter("ctaTitle1"), tFooter("ctaTitle2"), tFooter("ctaTitle3"), tFooter("ctaTitle4")].filter(
    Boolean
  );

  return (
    <h2
      className={cn(
        home2FontClass(locale),
        "mb-5 text-xl uppercase leading-snug tracking-[0.06em] text-white sm:text-2xl",
        locale === "ar" && "normal-case tracking-normal"
      )}
    >
      {words.join(locale === "ar" ? " " : " ")}
    </h2>
  );
}
