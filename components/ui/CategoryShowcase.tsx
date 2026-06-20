"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";

const CATEGORY_ROWS = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9],
] as const;

const CATEGORIES = [
  {
    key: "categorySailBoat",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-2.jpg",
    href: "/boats",
  },
  {
    key: "categoryMotorBoat",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-1.jpg",
    href: "/boats",
  },
  {
    key: "categoryCruise",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-8.jpg",
    href: "/boats",
  },
  {
    key: "categoryBowrider",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-11.jpg",
    href: "/boats",
  },
  {
    key: "categoryDeckBoat",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-5.jpg",
    href: "/boats",
  },
  {
    key: "categoryPilotHouse",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-7.jpg",
    href: "/boats",
  },
  {
    key: "categoryLuxuryBarge",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-9.jpg",
    href: "/boats",
  },
  {
    key: "categoryCuddyCabins",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-12.jpg",
    href: "/boats",
  },
  {
    key: "categoryCabinCruiser",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-6.jpg",
    href: "/boats",
  },
  {
    key: "categoryGameBoat",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-hover-image-14.jpg",
    href: "/boats",
  },
] as const;

export function CategoryShowcase() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="category-showcase relative overflow-hidden py-20 lg:py-28">
      <div className="category-showcase-bg" aria-hidden dir="ltr" />
      <div className="category-showcase-overlay" aria-hidden />
      <div className="container-luxury relative z-10">
        <div className="mb-14 text-center lg:mb-16">
          <p className={cn(bodyFontClass(locale), "mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80")}>
            {t("categoryEyebrow")}
          </p>
          <h2 className={cn(displayFontClass(locale), "text-4xl font-normal uppercase tracking-[0.06em] text-white sm:text-5xl lg:text-[3.25rem]")}>
            {t("categoryTitle")}
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl px-2 sm:px-4 lg:px-8">
          <div className="space-y-3">
            {CATEGORY_ROWS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center gap-3"
              >
                {row.map((categoryIndex) => {
                  const category = CATEGORIES[categoryIndex];

                  return (
                    <div key={category.key} className="group relative">
                      {/* Image tied to this item — appears at hover position */}
                      <div className="category-showcase-hover-image pointer-events-none absolute z-30 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-within:opacity-100">
                        <div className="relative h-[200px] w-[300px] overflow-hidden shadow-2xl sm:h-[220px] sm:w-[340px] lg:h-[240px] lg:w-[380px]">
                          <Image
                            src={category.image}
                            alt={t(category.key)}
                            fill
                            className="object-cover"
                            sizes="380px"
                            quality={IMAGE_QUALITY}
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <Link
                        href={category.href}
                        className="category-showcase-item relative z-10"
                      >
                        <span className="category-showcase-num">
                          {categoryIndex + 1}.
                        </span>
                        <span>{t(category.key)}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
