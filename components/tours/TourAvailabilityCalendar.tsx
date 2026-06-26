"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn, bodyFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

type Props = {
  monthOffset?: number;
  compact?: boolean;
};

function buildMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [];
  for (let i = 0; i < firstDay; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  return cells;
}

export function TourAvailabilityCalendar({ monthOffset = 0, compact = false }: Props) {
  const t = useTranslations("tours");
  const locale = useLocale() as Locale;
  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const monthLabel = viewDate.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    month: "long",
    year: "numeric",
  });

  const cells = useMemo(() => buildMonthDays(year, month), [year, month]);

  const isAvailable = (day: number) => (day + month + year) % 5 !== 0 && (day + month) % 4 !== 0;

  return (
    <div className={cn("tour-availability-calendar", compact && "tour-availability-calendar--compact")}>
      <div className="tour-availability-calendar__header">
        <button type="button" className="tour-availability-calendar__nav" aria-label={t("prevMonth")}>
          ‹
        </button>
        <h3 className={cn("tour-availability-calendar__month", bodyFontClass(locale))}>{monthLabel}</h3>
        <button type="button" className="tour-availability-calendar__nav" aria-label={t("nextMonth")}>
          ›
        </button>
      </div>

      <div className="tour-availability-calendar__weekdays">
        {t.raw("weekdays").map((label: string) => (
          <span key={label} className={cn("tour-availability-calendar__weekday", bodyFontClass(locale))}>
            {label}
          </span>
        ))}
      </div>

      <div className="tour-availability-calendar__grid">
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} className="tour-availability-calendar__cell is-empty" />;
          const available = isAvailable(day);
          return (
            <button
              key={day}
              type="button"
              disabled={!available}
              className={cn(
                "tour-availability-calendar__cell",
                available && "is-available",
                selectedDay === day && "is-selected"
              )}
              onClick={() => available && setSelectedDay(day)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className={cn("tour-availability-calendar__legend", bodyFontClass(locale))}>
        <span>
          <i className="is-available" /> {t("available")}
        </span>
        <span>
          <i className="is-unavailable" /> {t("unavailable")}
        </span>
      </div>
    </div>
  );
}
