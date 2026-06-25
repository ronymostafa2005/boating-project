"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { CART_ITEMS, formatCartPrice, getCartSubtotal, type CartItem } from "@/data/cart";
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

export function CartSection() {
  const t = useTranslations("cart");
  const tShop = useTranslations("shop");
  const locale = useLocale() as Locale;
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);

  const updateQuantity = (slug: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.productSlug === slug
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((item) => item.productSlug !== slug));
  };

  if (items.length === 0) {
    return (
      <section className="cart-page bg-white py-12 sm:py-14 lg:py-16">
        <div className="container-luxury">
          <div className={cn("cart-empty-notice", bodyFontClass(locale))}>{t("emptyMessage")}</div>
          <Link href="/shop" className={cn("cart-return-btn", bodyFontClass(locale))}>
            {t("returnToShop")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="cart-layout">
          <div className="cart-table-wrap">
            <table className={cn("cart-table", bodyFontClass(locale))}>
              <thead>
                <tr>
                  <th scope="col" className="cart-table__col-remove">
                    <span className="sr-only">{t("removeItem")}</span>
                  </th>
                  <th scope="col" className="cart-table__col-thumb">
                    <span className="sr-only">{t("productImage")}</span>
                  </th>
                  <th scope="col">{t("productColumn")}</th>
                  <th scope="col">{t("priceColumn")}</th>
                  <th scope="col">{t("quantityColumn")}</th>
                  <th scope="col">{t("subtotalColumn")}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.productSlug}>
                    <td>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeItem(item.productSlug)}
                        aria-label={t("removeItem")}
                      >
                        <RemoveIcon />
                      </button>
                    </td>
                    <td>
                      <Link href={`/shop/${item.productSlug}`} className="cart-thumb">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                          quality={IMAGE_QUALITY}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link href={`/shop/${item.productSlug}`} className="cart-product-name">
                        {tShop(item.nameKey)}
                      </Link>
                    </td>
                    <td className="cart-price">{formatCartPrice(item.unitPrice)}</td>
                    <td>
                      <div className="cart-qty">
                        <button
                          type="button"
                          className="cart-qty__btn"
                          onClick={() => updateQuantity(item.productSlug, -1)}
                          aria-label={tShop("decreaseQty")}
                        >
                          −
                        </button>
                        <span className="cart-qty__value">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty__btn"
                          onClick={() => updateQuantity(item.productSlug, 1)}
                          aria-label={tShop("increaseQty")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="cart-price">{formatCartPrice(item.unitPrice * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-actions">
              <Link href="/shop" className={cn("cart-return-btn cart-return-btn--inline", bodyFontClass(locale))}>
                {t("returnToShop")}
              </Link>
              <button type="button" className={cn("cart-update-btn", bodyFontClass(locale))}>
                {t("updateCart")}
              </button>
            </div>
          </div>

          <aside className="cart-totals">
            <h2 className={cn("cart-totals__title", displayFontClass(locale))}>{t("cartTotals")}</h2>
            <table className={cn("cart-totals-table", bodyFontClass(locale))}>
              <tbody>
                <tr>
                  <th scope="row">{t("subtotal")}</th>
                  <td>{formatCartPrice(subtotal)}</td>
                </tr>
                <tr className="cart-totals-total">
                  <th scope="row">{t("total")}</th>
                  <td>{formatCartPrice(subtotal)}</td>
                </tr>
              </tbody>
            </table>
            <Link href="/checkout" className={cn("cart-checkout-btn", bodyFontClass(locale))}>
              {t("proceedToCheckout")}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
