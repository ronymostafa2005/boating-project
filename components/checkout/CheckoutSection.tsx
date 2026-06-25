"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  CHECKOUT_COUNTRIES,
  CHECKOUT_DEMO_ITEMS,
  CHECKOUT_PAYMENT_METHODS,
  formatCheckoutPrice,
  getCheckoutSubtotal,
} from "@/data/checkout";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function CheckoutSection() {
  const t = useTranslations("checkout");
  const tShop = useTranslations("shop");
  const locale = useLocale() as Locale;
  const [paymentMethod, setPaymentMethod] = useState<string>(CHECKOUT_PAYMENT_METHODS[0].id);

  const items = CHECKOUT_DEMO_ITEMS;
  const subtotal = useMemo(() => getCheckoutSubtotal(items), [items]);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <section className="checkout-page bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <form className="checkout-layout" onSubmit={(e) => e.preventDefault()}>
          <div className="checkout-billing">
            <h2 className={cn("checkout-section-title", displayFontClass(locale))}>{t("billingTitle")}</h2>

            <div className="checkout-fields">
              <div className="checkout-field-row">
                <label className={cn("checkout-field checkout-field--half", bodyFontClass(locale))}>
                  <span className="checkout-field__label">
                    {t("firstName")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="text" name="firstName" required autoComplete="given-name" />
                </label>
                <label className={cn("checkout-field checkout-field--half", bodyFontClass(locale))}>
                  <span className="checkout-field__label">
                    {t("lastName")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="text" name="lastName" required autoComplete="family-name" />
                </label>
              </div>

              <label className={cn("checkout-field", bodyFontClass(locale))}>
                <span className="checkout-field__label">{t("company")}</span>
                <input type="text" name="company" autoComplete="organization" />
              </label>

              <label className={cn("checkout-field", bodyFontClass(locale))}>
                <span className="checkout-field__label">
                  {t("country")} <abbr title={t("required")}>*</abbr>
                </span>
                <select name="country" required defaultValue="BE">
                  {CHECKOUT_COUNTRIES.map((country) => (
                    <option key={country.value} value={country.value}>
                      {t(country.labelKey)}
                    </option>
                  ))}
                </select>
              </label>

              <label className={cn("checkout-field", bodyFontClass(locale))}>
                <span className="checkout-field__label">
                  {t("address")} <abbr title={t("required")}>*</abbr>
                </span>
                <input type="text" name="address" required autoComplete="street-address" />
              </label>

              <label className={cn("checkout-field", bodyFontClass(locale))}>
                <span className="checkout-field__label">{t("apartment")}</span>
                <input type="text" name="apartment" autoComplete="address-line2" />
              </label>

              <div className="checkout-field-row">
                <label className={cn("checkout-field checkout-field--half", bodyFontClass(locale))}>
                  <span className="checkout-field__label">
                    {t("city")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="text" name="city" required autoComplete="address-level2" />
                </label>
                <label className={cn("checkout-field checkout-field--half", bodyFontClass(locale))}>
                  <span className="checkout-field__label">
                    {t("state")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="text" name="state" required autoComplete="address-level1" />
                </label>
              </div>

              <label className={cn("checkout-field checkout-field--half", bodyFontClass(locale))}>
                <span className="checkout-field__label">
                  {t("postcode")} <abbr title={t("required")}>*</abbr>
                </span>
                <input type="text" name="postcode" required autoComplete="postal-code" />
              </label>

              <div className="checkout-field-row">
                <label className={cn("checkout-field checkout-field--half", bodyFontClass(locale))}>
                  <span className="checkout-field__label">
                    {t("phone")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="tel" name="phone" required autoComplete="tel" />
                </label>
                <label className={cn("checkout-field checkout-field--half", bodyFontClass(locale))}>
                  <span className="checkout-field__label">
                    {t("email")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
              </div>
            </div>

            <h3 className={cn("checkout-section-subtitle", displayFontClass(locale))}>
              {t("additionalInfo")}
            </h3>
            <label className={cn("checkout-field", bodyFontClass(locale))}>
              <span className="checkout-field__label">{t("orderNotes")}</span>
              <textarea name="orderNotes" rows={4} placeholder={t("orderNotesPlaceholder")} />
            </label>
          </div>

          <aside className="checkout-order">
            <h2 className={cn("checkout-section-title", displayFontClass(locale))}>{t("yourOrder")}</h2>

            <div className="checkout-order-table-wrap">
              <table className={cn("checkout-order-table", bodyFontClass(locale))}>
                <thead>
                  <tr>
                    <th scope="col">{t("productColumn")}</th>
                    <th scope="col">{t("subtotalColumn")}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.productSlug}>
                      <td>
                        <div className="checkout-order-product">
                          <div className="checkout-order-product__thumb">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="56px"
                              quality={IMAGE_QUALITY}
                            />
                          </div>
                          <span>
                            {tShop(item.nameKey)} <strong>× {item.quantity}</strong>
                          </span>
                        </div>
                      </td>
                      <td>{formatCheckoutPrice(item.unitPrice * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">{t("subtotal")}</th>
                    <td>{formatCheckoutPrice(subtotal)}</td>
                  </tr>
                  <tr>
                    <th scope="row">{t("shipping")}</th>
                    <td>{shipping === 0 ? t("freeShipping") : formatCheckoutPrice(shipping)}</td>
                  </tr>
                  <tr className="checkout-order-total">
                    <th scope="row">{t("total")}</th>
                    <td>{formatCheckoutPrice(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <fieldset className="checkout-payment">
              <legend className={cn("checkout-payment__legend", bodyFontClass(locale))}>
                {t("paymentMethods")}
              </legend>
              {CHECKOUT_PAYMENT_METHODS.map((method) => (
                <label key={method.id} className={cn("checkout-payment__option", bodyFontClass(locale))}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <span>{t(method.labelKey)}</span>
                </label>
              ))}
            </fieldset>

            <p className={cn("checkout-privacy", bodyFontClass(locale))}>{t("privacyNotice")}</p>

            <button type="submit" className={cn("checkout-place-order", bodyFontClass(locale))}>
              {t("placeOrder")}
            </button>
          </aside>
        </form>
      </div>
    </section>
  );
}
