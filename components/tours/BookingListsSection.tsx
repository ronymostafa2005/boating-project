"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { BOOKING_LIST_MOCK, getTourBySlug } from "@/data/tours";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function BookingListsSection() {
  const t = useTranslations("tours");
  const locale = useLocale() as Locale;
  return (
    <section className="booking-lists bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="booking-lists__header">
          <h2 className={cn("booking-lists__title", displayFontClass(locale))}>{t("bookingListsTitle")}</h2>
          <p className={cn("booking-lists__intro", bodyFontClass(locale))}>{t("bookingListsIntro")}</p>
        </div>

        <div className="booking-lists__table-wrap">
          <table className={cn("booking-lists__table", bodyFontClass(locale))}>
            <thead>
              <tr>
                <th>{t("bookingId")}</th>
                <th>{t("tour")}</th>
                <th>{t("checkIn")}</th>
                <th>{t("checkOut")}</th>
                <th>{t("rooms")}</th>
                <th>{t("total")}</th>
                <th>{t("status")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {BOOKING_LIST_MOCK.map((booking) => {
                const tour = getTourBySlug(booking.tourSlug);
                const tourName = tour ? t(`items.${tour.descriptionKey}.name`) : booking.tourSlug;
                return (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{tourName}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.rooms}</td>
                  <td>
                    <span className="text-neera-gold">$</span> {booking.total}
                  </td>
                  <td>
                    <span className={cn("booking-lists__status", `is-${booking.statusKey}`)}>
                      {t(`statuses.${booking.statusKey}`)}
                    </span>
                  </td>
                  <td>
                    <Link href={`/tours/${booking.tourSlug}`} className="auth-link">
                      {t("view")}
                    </Link>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
