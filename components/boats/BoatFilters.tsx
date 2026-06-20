"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Boat, BoatType } from "@/types/boat";
import type { Locale } from "@/types/locale";
import { BoatGrid } from "./BoatGrid";

interface BoatFiltersProps {
  boats: Boat[];
  locale: Locale;
}

const boatTypes: (BoatType | "all")[] = [
  "all",
  "yacht",
  "boat",
  "speedboat",
  "catamaran",
];

const capacityRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "1-6", min: 1, max: 6 },
  { label: "7-12", min: 7, max: 12 },
  { label: "13-20", min: 13, max: 20 },
  { label: "20+", min: 20, max: Infinity },
];

export function BoatFilters({ boats, locale }: BoatFiltersProps) {
  const t = useTranslations("boats");
  const [typeFilter, setTypeFilter] = useState<BoatType | "all">("all");
  const [capacityFilter, setCapacityFilter] = useState(0);

  const filtered = useMemo(() => {
    const range = capacityRanges[capacityFilter];
    return boats.filter((boat) => {
      const typeMatch = typeFilter === "all" || boat.type === typeFilter;
      const capacityMatch =
        boat.capacity >= range.min && boat.capacity <= range.max;
      return typeMatch && capacityMatch;
    });
  }, [boats, typeFilter, capacityFilter]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-400">
            {t("filterType")}
          </label>
          <div className="flex flex-wrap gap-2">
            {boatTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  typeFilter === type
                    ? "bg-gold text-luxury-black"
                    : "border border-gray-300 text-gray-600 hover:border-gold"
                }`}
              >
                {type === "all" ? t("allTypes") : t(type)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-400">
            {t("filterCapacity")}
          </label>
          <div className="flex flex-wrap gap-2">
            {capacityRanges.map((range, i) => (
              <button
                key={range.label}
                type="button"
                onClick={() => setCapacityFilter(i)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  capacityFilter === i
                    ? "bg-gold text-luxury-black"
                    : "border border-gray-300 text-gray-600 hover:border-gold"
                }`}
              >
                {range.label === "All"
                  ? locale === "ar"
                    ? "الكل"
                    : "All"
                  : range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-400">{t("noResults")}</p>
      ) : (
        <BoatGrid boats={filtered} locale={locale} />
      )}
    </div>
  );
}
