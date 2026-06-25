"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getShopProductGallery, type ShopProduct } from "@/data/shop";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function CartIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="9" cy="20" r="1.25" />
      <circle cx="17" cy="20" r="1.25" />
      <path d="M2 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="shop-detail-stars" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={cn("shop-detail-star", i < rating && "shop-detail-star--filled")} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

type Props = {
  product: ShopProduct;
};

export function ShopProductDetailSection({ product }: Props) {
  const t = useTranslations("shop");
  const locale = useLocale() as Locale;
  const gallery = getShopProductGallery(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="shop-detail-product bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="shop-detail-product__layout">
          <div className="shop-detail-media">
            {gallery.length > 1 ? (
              <div className="shop-detail-thumbs">
                {gallery.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className={cn("shop-detail-thumb", activeIndex === index && "shop-detail-thumb--active")}
                    onClick={() => setActiveIndex(index)}
                    aria-label={t("galleryThumb", { index: index + 1 })}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="88px" quality={IMAGE_QUALITY} />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="shop-detail-gallery">
              <div className="shop-detail-gallery__main">
                <Image
                  src={gallery[activeIndex]}
                  alt={t(product.nameKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  quality={IMAGE_QUALITY}
                />
              </div>
            </div>
          </div>

          <div className="shop-detail-summary">
            <h2 className={cn("shop-detail-summary__title", displayFontClass(locale))}>
              {t(product.nameKey)}
            </h2>
            <p className={cn("shop-detail-summary__price", bodyFontClass(locale))}>{t(product.priceKey)}</p>

            <StarRating rating={product.rating} />

            <p className={cn("shop-detail-summary__short", bodyFontClass(locale))}>
              {t(product.shortDescKey)}
            </p>

            <div className="shop-detail-purchase">
              <div className={cn("shop-detail-qty", bodyFontClass(locale))}>
                <button
                  type="button"
                  className="shop-detail-qty__btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label={t("decreaseQty")}
                >
                  −
                </button>
                <span className="shop-detail-qty__value">{quantity}</span>
                <button
                  type="button"
                  className="shop-detail-qty__btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label={t("increaseQty")}
                >
                  +
                </button>
              </div>

              <button type="button" className={cn("shop-detail-add-cart", bodyFontClass(locale))}>
                <CartIcon />
                {t("addToCart")}
              </button>
            </div>

            <div className={cn("shop-detail-shipping", bodyFontClass(locale))}>
              <p>{t("shippingNote")}</p>
              <button type="button" className="shop-detail-shipping__link">
                {t("shippingReturn")}
              </button>
            </div>

            <dl className={cn("shop-detail-meta", bodyFontClass(locale))}>
              <div className="shop-detail-meta__row">
                <dt>{t("categoryLabel")}</dt>
                <dd>{t(product.categoryKey)}</dd>
              </div>
              <div className="shop-detail-meta__row">
                <dt>{t("tagLabel")}</dt>
                <dd>{t(product.tagKey)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
