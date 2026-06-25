"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import {
  SHOP_MAX_PRICE,
  SHOP_MIN_PRICE,
  SHOP_PER_PAGE,
  SHOP_PRODUCTS,
} from "@/data/shop";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-4 w-4 shrink-0", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 21s-7-4.6-9.2-8.8C1.1 9.2 3.2 5.5 7 5.5c2 0 3.2 1.1 4 2.2.8-1.1 2-2.2 4-2.2 3.8 0 5.9 3.7 4.2 6.7C19 16.4 12 21 12 21z" strokeLinejoin="round" />
    </svg>
  );
}

export function ShopListingSection() {
  const t = useTranslations("shop");
  const locale = useLocale() as Locale;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(SHOP_MAX_PRICE);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let items = SHOP_PRODUCTS.filter((product) => product.priceMin <= maxPrice);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter((product) => t(product.nameKey).toLowerCase().includes(q));
    }

    if (sort === "price-asc") {
      items = [...items].sort((a, b) => a.priceMin - b.priceMin);
    } else if (sort === "price-desc") {
      items = [...items].sort((a, b) => b.priceMin - a.priceMin);
    }

    return items;
  }, [search, maxPrice, sort, t]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / SHOP_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * SHOP_PER_PAGE;
  const pageItems = filtered.slice(start, start + SHOP_PER_PAGE);
  const end = Math.min(start + SHOP_PER_PAGE, filtered.length);

  return (
    <section className="shop-listing-section bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="shop-listing-layout">
          <div className="shop-listing-main">
            <div className="shop-listing-toolbar">
              <p className={cn(bodyFontClass(locale), "shop-listing-results")}>
                {t("showingResults", { start: filtered.length ? start + 1 : 0, end, total: filtered.length })}
              </p>
              <label className={cn(bodyFontClass(locale), "shop-listing-sort")}>
                <span className="sr-only">{t("sortLabel")}</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  className="shop-listing-sort-select"
                >
                  <option value="default">{t("sortDefault")}</option>
                  <option value="price-asc">{t("sortPriceAsc")}</option>
                  <option value="price-desc">{t("sortPriceDesc")}</option>
                </select>
              </label>
            </div>

            <div className="shop-product-grid">
              {pageItems.map((product) => (
                <article key={product.id} className="shop-product-card group">
                  <div className="shop-product-card__media">
                    <Link href={`/shop/${product.slug}`} className="shop-product-card__image-link">
                      <Image
                        src={product.image}
                        alt={t(product.nameKey)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                        quality={IMAGE_QUALITY}
                      />
                    </Link>

                    <div className="shop-product-card__overlay">
                      <div className="shop-product-card__quick-actions">
                        <button
                          type="button"
                          className="shop-product-card__icon-btn"
                          aria-label={t("addToWishlist")}
                        >
                          <HeartIcon />
                        </button>
                        <Link
                          href={`/shop/${product.slug}`}
                          className="shop-product-card__icon-btn"
                          aria-label={t("quickView")}
                        >
                          <SearchIcon className="text-current" />
                        </Link>
                      </div>
                      <Link
                        href={`/shop/${product.slug}`}
                        className={cn(bodyFontClass(locale), "shop-product-card__select-btn")}
                      >
                        {t("selectOptions")}
                      </Link>
                    </div>
                  </div>
                  <h3 className={cn(displayFontClass(locale), "shop-product-card__title")}>
                    <Link href={`/shop/${product.slug}`}>{t(product.nameKey)}</Link>
                  </h3>
                  <p className={cn(bodyFontClass(locale), "shop-product-card__price")}>
                    {t(product.priceKey)}
                  </p>
                </article>
              ))}
            </div>

            {totalPages > 1 ? (
              <nav className="shop-pagination" aria-label={t("paginationLabel")}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={cn("shop-pagination__btn", currentPage === pageNum && "shop-pagination__btn--active")}
                    onClick={() => setPage(pageNum)}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                ))}
                {currentPage < totalPages ? (
                  <button
                    type="button"
                    className="shop-pagination__next"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    {t("next")}
                    <span aria-hidden>→</span>
                  </button>
                ) : null}
              </nav>
            ) : null}
          </div>

          <ShopSidebar
            interactive
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            maxPrice={maxPrice}
            onMaxPriceChange={(value) => {
              setMaxPrice(value);
              setPage(1);
            }}
          />
        </div>
      </div>
    </section>
  );
}
