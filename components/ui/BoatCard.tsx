"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { getLocalized, formatPrice } from "@/lib/utils";
import { FALLBACK_BOAT_IMAGE } from "@/lib/imageDefaults";
import type { Boat } from "@/types/boat";
import type { Locale } from "@/types/locale";

interface BoatCardProps {
  boat: Boat;
  locale: Locale;
}

export function BoatCard({ boat, locale }: BoatCardProps) {
  const t = useTranslations("boats");
  const name = getLocalized(boat.name, locale);
  const image = boat.images[0] || FALLBACK_BOAT_IMAGE;

  return (
    <Link
      href={`/boats/${boat.slug}`}
      className="group card-luxury overflow-hidden transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {boat.featured && (
          <span className="absolute top-3 start-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-luxury-black">
            ★
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-gold">
            {t(boat.type)}
          </span>
          <span className="text-xs text-gray-400">
            {t("capacity", { count: boat.capacity })}
          </span>
        </div>
        <h3 className="mb-2 font-displayAr text-xl font-semibold group-hover:text-gold transition-colors">
          {name}
        </h3>
        {boat.priceFrom && (
          <p className="text-sm text-gray-400">
            {t("from")}{" "}
            <span className="font-semibold text-gold">
              {formatPrice(boat.priceFrom, locale)}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
