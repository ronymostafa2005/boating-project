"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { type ShopProduct } from "@/data/shop";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

type Props = {
  products: ShopProduct[];
};

export function ShopRelatedProductsSection({ products }: Props) {
  const t = useTranslations("shop");
  const locale = useLocale() as Locale;
  const [page, setPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const currentPage = Math.min(page, totalPages - 1);
  const visible = products.slice(currentPage * perPage, currentPage * perPage + perPage);

  return (
    <section className="shop-related-section bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="shop-related-header">
          <p className={cn("shop-related-eyebrow", bodyFontClass(locale))}>{t("relatedEyebrow")}</p>
          <h2 className={cn("shop-related-title", displayFontClass(locale))}>{t("relatedTitle")}</h2>
        </div>

        <div className="shop-related-grid">
          {visible.map((product) => (
            <article key={product.id} className="shop-related-card">
              <Link href={`/shop/${product.slug}`} className="shop-related-card__image">
                <Image
                  src={product.image}
                  alt={t(product.nameKey)}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={IMAGE_QUALITY}
                />
              </Link>
              <h3 className={cn("shop-related-card__title", displayFontClass(locale))}>
                <Link href={`/shop/${product.slug}`}>{t(product.nameKey)}</Link>
              </h3>
              <p className={cn("shop-related-card__price", bodyFontClass(locale))}>
                {t(product.priceKey)}
              </p>
            </article>
          ))}
        </div>

        <div className={cn("shop-related-nav", bodyFontClass(locale))}>
          <button
            type="button"
            className="shop-related-nav__btn"
            disabled={currentPage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            <span aria-hidden>←</span> {t("prev")}
          </button>
          <button
            type="button"
            className="shop-related-nav__btn"
            disabled={currentPage >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            {t("next")} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
