"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { Link } from "@/lib/i18n/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const AMENITY_KEYS = [
  "bookAmenity1",
  "bookAmenity2",
  "bookAmenity3",
  "bookAmenity4",
  "bookAmenity5",
] as const;

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden
    >
      <path d="M50 5l5.5 16.9H72.4L58.5 35.1l5.5 16.9L50 38.8 36.1 52l5.5-16.9L27.6 21.9h16.9L50 5zm0 72.5l5.5 16.9h16.9l-13.9 13.2 5.5 16.9L50 111.3l-13.9 13.2 5.5-16.9L27.6 94.4h16.9L50 77.5z" />
      <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 121 94" fill="currentColor" aria-hidden>
      <path d="M15 4.5h63.9c5.1 0 9.2 4.1 9.3 9.2v35.1c0 2.5-1 4.8-2.8 6.5-1.7 1.7-4 2.7-6.5 2.7H60.7c-12.4 0-19.5 4.4-30.5 11.2-1.8 1.1-3.7 2.3-5 3.1-2.3 1.4-4 1.4-5.4-.1-1-1.1-1.4-3-1.4-5.8v-7.7c0-.2-.1-.4-.2-.5-.1-.1-.2-.1-.4-.1H15c-5.1 0-9.2-4.1-9.3-9.2V13.7C5.8 8.6 9.9 4.5 15 4.5zm63.9 3.7H15c-3.1 0-5.5 2.5-5.5 5.5v35.1c0 3.1 2.5 5.5 5.5 5.5h2.6c2.5 0 4.5 2 4.5 4.5v7.7c0 3.6-.1 3.4 1.7 2.3 1.9-1.2 3.2-2 4.4-2.7 11.6-7.1 19-11.8 32.5-11.8h18.1c1.5 0 2.9-.6 4-1.6 1-1 1.6-2.4 1.6-3.9V13.7c0-3-2.4-5.5-5.5-5.5z" />
      <circle cx="47" cy="32" r="4" />
      <circle cx="64.8" cy="32" r="4" />
      <circle cx="29.1" cy="32" r="4" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

export function BookNowSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "ar";

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("1");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("rooms", rooms);
    params.set("adults", adults);
    params.set("children", children);
    router.push(`/boats?${params.toString()}`);
  }

  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@boating.sa";

  return (
    <section className="book-now-section relative z-30 overflow-visible py-16 lg:pt-8 lg:pb-24">
      <div className="container-luxury">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Image + contact */}
          <ScrollReveal className="lg:col-span-4">
            <div className="relative mx-auto max-w-[340px] lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/book-now-yacht.png"
                  alt={t("bookImageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 340px, 33vw"
                />
              </div>
              <div className="book-now-contact-box absolute bottom-0 start-0 flex max-w-[220px] items-start gap-3 p-5">
                <ChatIcon className="mt-0.5 h-8 w-8 shrink-0 text-neera-gold" />
                <div>
                  <p className={cn(bodyFontClass(locale), "text-sm font-semibold leading-snug text-white")}>
                    {t("bookContactTitle")}
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className={cn(
                      bodyFontClass(locale),
                      "mt-1 block text-xs text-white/85 transition-colors hover:text-neera-gold"
                    )}
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal className="lg:col-span-4">
            <div className="text-center lg:text-start">
              <p className={cn(bodyFontClass(locale), "mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a1a]/70")}>
                {t("bookEyebrow")}
              </p>
              <h2 className={cn(displayFontClass(locale), "mb-5 text-4xl font-normal uppercase leading-tight text-[#1a1a1a] sm:text-5xl")}>
                {t("bookTitle")}
              </h2>
              <p className={cn(bodyFontClass(locale), "mb-8 max-w-md text-sm leading-relaxed text-gray-600 lg:mx-0 mx-auto")}>
                {t("bookDescription")}
              </p>

              <ul className="mb-10 space-y-3.5">
                {AMENITY_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-center justify-center gap-3 lg:justify-start"
                  >
                    <CompassIcon className="h-4 w-4 shrink-0 text-[#1a1a1a]/55" />
                    <span className={cn(bodyFontClass(locale), "text-sm text-[#1a1a1a]/85")}>
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/about" className="neera-btn-know-more inline-flex">
                {t("bookKnowMore")}
              </Link>
            </div>
          </ScrollReveal>

          {/* Booking form — overlaps hero bottom on desktop */}
          <ScrollReveal className="relative z-30 lg:col-span-4 lg:-mt-20 xl:-mt-24">
            <div
              className={cn(
                "book-now-form-card relative z-30 mx-auto max-w-[400px] lg:mx-0 lg:max-w-none",
                isRtl ? "lg:me-auto" : "lg:ms-auto"
              )}
            >
              <h3 className={cn(displayFontClass(locale), "mb-8 text-2xl font-normal leading-snug text-[#1a1a1a] sm:text-[1.65rem]")}>
                {t("bookFormTitle")}
              </h3>

              <form onSubmit={handleSearch} className="space-y-5">
                <div>
                  <label htmlFor="check-in" className="book-now-label">
                    {t("bookCheckIn")}
                  </label>
                  <div className="book-now-input-wrap">
                    <input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="book-now-input"
                      required
                    />
                    <CalendarIcon className="pointer-events-none absolute end-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a1a1a]/40" />
                  </div>
                </div>

                <div>
                  <label htmlFor="check-out" className="book-now-label">
                    {t("bookCheckOut")}
                  </label>
                  <div className="book-now-input-wrap">
                    <input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      min={checkIn || undefined}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="book-now-input"
                      required
                    />
                    <CalendarIcon className="pointer-events-none absolute end-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a1a1a]/40" />
                  </div>
                </div>

                <div>
                  <label htmlFor="rooms" className="book-now-label">
                    {t("bookRooms")}
                  </label>
                  <select
                    id="rooms"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="book-now-select"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="book-now-guests-box">
                  <span className="book-now-room-label">{t("bookRoom1")}</span>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="adults" className="book-now-label mb-2">
                        {t("bookAdults")}
                      </label>
                      <select
                        id="adults"
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        className="book-now-select book-now-select-sm"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={String(n)}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="children" className="book-now-label mb-2">
                        {t("bookChildren")}
                      </label>
                      <select
                        id="children"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        className="book-now-select book-now-select-sm"
                      >
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={String(n)}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button type="submit" className="book-now-search-btn">
                    {t("bookSearch")}
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
