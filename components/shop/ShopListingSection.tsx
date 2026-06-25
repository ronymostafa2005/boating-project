"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import {
  SHOP_CATEGORIES,
  SHOP_INSTAGRAM,
  SHOP_MAX_PRICE,
  SHOP_MIN_PRICE,
  SHOP_PER_PAGE,
  SHOP_PRODUCTS,
  SHOP_PROMO_BANNER,
  SHOP_TAGS,
} from "@/data/shop";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function CategoryIcon() {
  return (
    <svg className="shop-category-icon" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M93.5,44.5L93.5,44.5h-9.9c-0.9-5.3-2.9-10.2-6-14.4l7-7c1-1,1.6-2.4,1.6-3.9c0-1.5-0.6-2.8-1.6-3.9c-2.1-2.1-5.6-2.1-7.8,0 l-7,7c-4.2-3-9.1-5.1-14.4-6V6.5C55.5,3.5,53,1,50,1c-3,0-5.5,2.5-5.5,5.5v9.9c-5.3,0.9-10.2,2.9-14.4,6l-7-7c-1-1-2.4-1.6-3.9-1.6 c-1.5,0-2.8,0.6-3.9,1.6c-2.1,2.1-2.1,5.6,0,7.8l7,7c-3,4.2-5.1,9.1-6,14.4H6.5C3.5,44.5,1,47,1,50c0,3,2.5,5.5,5.5,5.5h9.9 c0.2,0.9,0.3,1.8,0.6,2.7c0.2,0.8,1,1.2,1.7,1c0.8-0.2,1.2-1,1-1.7c-0.6-2.4-0.9-5-0.9-7.5c0-17.2,14-31.1,31.1-31.1 s31.1,14,31.1,31.1S67.2,81.2,50,81.2c-11.1,0-21.5-6-27-15.7c-0.4-0.7-1.3-0.9-2-0.5c-0.7,0.4-0.9,1.3-0.5,2c0.6,1,1.2,2,1.9,2.9 l-7,7c-1,1-1.6,2.4-1.6,3.9c0,1.5,0.6,2.8,1.6,3.9c1,1,2.5,1.6,3.9,1.6c1.4,0,2.8-0.5,3.9-1.6l7-7c0.8,0.6,1.7,1.2,2.6,1.7 c3.6,2.2,7.6,3.6,11.8,4.3v9.9c0,3,2.5,5.5,5.5,5.5c3,0,5.5-2.5,5.5-5.5v-9.9c5.3-0.9,10.2-2.9,14.4-6l7,7c1,1,2.4,1.6,3.9,1.6 c1.5,0,2.8-0.6,3.9-1.6c2.1-2.1,2.1-5.6,0-7.8l-7-7c3-4.2,5.1-9.1,6-14.4h9.9c3,0,5.5-2.5,5.5-5.5C99,47,96.5,44.5,93.5,44.5z" />
      <path d="M50,75.9c14.3,0,25.9-11.6,25.9-25.9c0-14.3-11.6-25.9-25.9-25.9c-14.3,0-25.9,11.6-25.9,25.9C24.1,64.3,35.7,75.9,50,75.9z M50,27c12.7,0,23,10.3,23,23S62.7,73,50,73c-12.7,0-23-10.3-23-23S37.3,27,50,27z" />
    </svg>
  );
}

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
                    <Link href="/shop/detail" className="shop-product-card__image-link">
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
                          href="/shop/detail"
                          className="shop-product-card__icon-btn"
                          aria-label={t("quickView")}
                        >
                          <SearchIcon className="text-current" />
                        </Link>
                      </div>
                      <Link
                        href="/shop/detail"
                        className={cn(bodyFontClass(locale), "shop-product-card__select-btn")}
                      >
                        {t("selectOptions")}
                      </Link>
                    </div>
                  </div>
                  <h3 className={cn(displayFontClass(locale), "shop-product-card__title")}>
                    <Link href="/shop/detail">{t(product.nameKey)}</Link>
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

          <aside className="shop-sidebar">
            <form
              className="shop-sidebar__block shop-sidebar__search"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="shop-sidebar-search-field">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder={t("searchPlaceholder")}
                  className={cn(bodyFontClass(locale), "shop-sidebar-search-input")}
                />
                <SearchIcon className="text-[#1a1a1a]/45" />
              </div>
            </form>

            <div className="shop-sidebar__block">
              <h4 className={cn(displayFontClass(locale), "shop-sidebar__title")}>{t("filterByPrice")}</h4>
              <input
                type="range"
                min={SHOP_MIN_PRICE}
                max={SHOP_MAX_PRICE}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="shop-price-range"
              />
              <p className={cn(bodyFontClass(locale), "shop-price-range-label")}>
                {t("priceRange", { min: SHOP_MIN_PRICE, max: maxPrice })}
              </p>
              <button type="button" className={cn(bodyFontClass(locale), "shop-filter-btn")}>
                {t("filter")}
              </button>
            </div>

            <div className="shop-sidebar__block">
              <h4 className={cn(displayFontClass(locale), "shop-sidebar__title")}>{t("categories")}</h4>
              <ul className="shop-category-list">
                {SHOP_CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <Link href="/shop" className={cn(bodyFontClass(locale), "shop-category-link")}>
                      <CategoryIcon />
                      <span>{t(category.nameKey)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shop-sidebar__block">
              <h4 className={cn(displayFontClass(locale), "shop-sidebar__title")}>{t("tags")}</h4>
              <div className="shop-tag-list">
                {SHOP_TAGS.map((tag) => (
                  <Link key={tag.id} href="/shop" className={cn(bodyFontClass(locale), "shop-tag")}>
                    {t(tag.nameKey)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="shop-sidebar__block">
              <h4 className={cn(displayFontClass(locale), "shop-sidebar__title")}>{t("instagram")}</h4>
              <div className="shop-instagram-grid">
                {SHOP_INSTAGRAM.map((src) => (
                  <a
                    key={src}
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-instagram-item"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                      quality={IMAGE_QUALITY}
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="shop-sidebar__banner">
              <Image
                src={SHOP_PROMO_BANNER}
                alt={t("promoAlt")}
                fill
                className="object-cover"
                sizes="320px"
                quality={IMAGE_QUALITY}
              />
              <div className="shop-sidebar__banner-overlay">
                <p className={cn(displayFontClass(locale), "shop-sidebar__banner-title")}>
                  {t("promoTitle")}
                </p>
                <p className={cn(displayFontClass(locale), "shop-sidebar__banner-script")}>
                  {t("promoScript")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
