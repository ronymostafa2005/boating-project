"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { WISHLIST_ITEMS, type WishlistItem } from "@/data/wishlist";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function RemoveIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="9" cy="20" r="1.25" />
      <circle cx="17" cy="20" r="1.25" />
      <path d="M2 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WishlistSection() {
  const t = useTranslations("wishlist");
  const tShop = useTranslations("shop");
  const locale = useLocale() as Locale;
  const [items, setItems] = useState<WishlistItem[]>(WISHLIST_ITEMS);

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((item) => item.productSlug !== slug));
  };

  return (
    <section className="wishlist-page bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <h2 className={cn("wishlist-page__title", displayFontClass(locale))}>{t("myWishlist")}</h2>

        <div className="wishlist-table-wrap">
          <table className={cn("wishlist-table", bodyFontClass(locale))}>
            <thead>
              <tr>
                <th scope="col" className="wishlist-table__col-remove">
                  <span className="sr-only">{t("removeItem")}</span>
                </th>
                <th scope="col" className="wishlist-table__col-thumb">
                  <span className="sr-only">{t("productImage")}</span>
                </th>
                <th scope="col">{t("productName")}</th>
                <th scope="col">{t("unitPrice")}</th>
                <th scope="col">{t("stockStatus")}</th>
                <th scope="col" className="wishlist-table__col-action">
                  <span className="sr-only">{t("addToCart")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr className="wishlist-table__empty-row">
                  <td colSpan={6}>{t("emptyMessage")}</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.productSlug}>
                    <td>
                      <button
                        type="button"
                        className="wishlist-remove"
                        onClick={() => removeItem(item.productSlug)}
                        aria-label={t("removeItem")}
                      >
                        <RemoveIcon />
                      </button>
                    </td>
                    <td>
                      <Link href={`/shop/${item.productSlug}`} className="wishlist-thumb">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="72px"
                          quality={IMAGE_QUALITY}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link href={`/shop/${item.productSlug}`} className="wishlist-product-name">
                        {tShop(item.nameKey)}
                      </Link>
                    </td>
                    <td className="wishlist-price">{tShop(item.priceKey)}</td>
                    <td>
                      <span
                        className={cn(
                          "wishlist-stock",
                          item.inStock ? "wishlist-stock--in" : "wishlist-stock--out"
                        )}
                      >
                        {item.inStock ? t("inStock") : t("outOfStock")}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="wishlist-add-cart"
                        disabled={!item.inStock}
                        aria-label={t("addToCart")}
                      >
                        <CartIcon />
                        <span>{t("addToCart")}</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
