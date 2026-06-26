"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { TourBookingSearch } from "@/components/tours/TourBookingSearch";
import { getTourBySlug } from "@/data/tours";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function BookingDetailsSection() {
  const t = useTranslations("tours");
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const tourSlug = searchParams.get("tour");
  const tour = tourSlug ? getTourBySlug(tourSlug) : undefined;
  const hasSearch = Boolean(searchParams.get("checkIn") && searchParams.get("checkOut"));

  return (
    <section className="booking-details bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="booking-details__layout">
          <div className="booking-details__search">
            <h2 className={cn("booking-details__title", displayFontClass(locale))}>{t("bookingDetailsTitle")}</h2>
            {!hasSearch ? (
              <p className={cn("booking-details__notice booking-details__notice--warn", bodyFontClass(locale))}>
                {t("insufficientData")}
              </p>
            ) : (
              <div className={cn("booking-details__summary", bodyFontClass(locale))}>
                {tour ? (
                  <p>
                    <strong>{t("selectedTour")}:</strong> {t(`items.${tour.descriptionKey}.name`)}
                  </p>
                ) : null}
                <p>
                  <strong>{t("checkIn")}:</strong> {searchParams.get("checkIn")}
                </p>
                <p>
                  <strong>{t("checkOut")}:</strong> {searchParams.get("checkOut")}
                </p>
                <p>
                  <strong>{t("rooms")}:</strong> {searchParams.get("rooms")} · <strong>{t("adults")}:</strong>{" "}
                  {searchParams.get("adults")} · <strong>{t("children")}:</strong> {searchParams.get("children")}
                </p>
              </div>
            )}

            <TourBookingSearch tourSlug={tourSlug ?? undefined} submitLabel={t("search")} />
          </div>

          <form className={cn("booking-details__form", bodyFontClass(locale))} onSubmit={(e) => e.preventDefault()}>
            <h3 className={cn("booking-details__form-title", displayFontClass(locale))}>{t("guestDetails")}</h3>

            <div className="booking-details__row">
              <label className="booking-details__field">
                <span>{t("firstName")}</span>
                <input type="text" name="firstName" required autoComplete="given-name" />
              </label>
              <label className="booking-details__field">
                <span>{t("lastName")}</span>
                <input type="text" name="lastName" required autoComplete="family-name" />
              </label>
            </div>

            <label className="booking-details__field">
              <span>{t("email")}</span>
              <input type="email" name="email" required autoComplete="email" />
            </label>

            <label className="booking-details__field">
              <span>{t("phone")}</span>
              <input type="tel" name="phone" required autoComplete="tel" />
            </label>

            <label className="booking-details__field">
              <span>{t("specialRequests")}</span>
              <textarea name="specialRequests" rows={4} />
            </label>

            <button type="submit" className="tour-booking-search__submit" disabled={!hasSearch}>
              {t("confirmBooking")}
            </button>

            <p className="booking-details__footer">
              <Link href="/booking-lists" className="auth-link">
                {t("viewBookings")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
