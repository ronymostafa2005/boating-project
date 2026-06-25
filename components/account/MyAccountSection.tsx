"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { ACCOUNT_NAV_ITEMS, type AccountNavId } from "@/data/account";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function MyAccountSection() {
  const t = useTranslations("myAccount");
  const locale = useLocale() as Locale;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNav, setActiveNav] = useState<AccountNavId>("dashboard");
  const [displayName, setDisplayName] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = String(data.get("username") ?? "").trim() || "User";
    setDisplayName(username);
    setIsLoggedIn(true);
    setActiveNav("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDisplayName("");
    setActiveNav("dashboard");
  };

  const handleNavClick = (id: AccountNavId) => {
    if (id === "logout") {
      handleLogout();
      return;
    }
    setActiveNav(id);
  };

  if (!isLoggedIn) {
    return (
      <section className="account-page bg-white py-12 sm:py-14 lg:py-16">
        <div className="container-luxury">
          <div className="account-auth">
            <div className="account-auth-panel">
              <h2 className={cn("account-panel-title", displayFontClass(locale))}>{t("loginTitle")}</h2>
              <form className="account-form" onSubmit={handleLogin}>
                <label className={cn("account-field", bodyFontClass(locale))}>
                  <span className="account-field__label">{t("usernameOrEmail")}</span>
                  <input type="text" name="username" required autoComplete="username" />
                </label>
                <label className={cn("account-field", bodyFontClass(locale))}>
                  <span className="account-field__label">{t("password")}</span>
                  <input type="password" name="password" required autoComplete="current-password" />
                </label>
                <label className={cn("account-remember", bodyFontClass(locale))}>
                  <input type="checkbox" name="remember" />
                  <span>{t("rememberMe")}</span>
                </label>
                <button type="submit" className={cn("account-submit-btn", bodyFontClass(locale))}>
                  {t("logIn")}
                </button>
                <Link href="/forgot-password" className={cn("account-lost-password", bodyFontClass(locale))}>
                  {t("lostPassword")}
                </Link>
              </form>
            </div>

            <div className="account-auth-panel">
              <h2 className={cn("account-panel-title", displayFontClass(locale))}>{t("registerTitle")}</h2>
              <p className={cn("account-register-note", bodyFontClass(locale))}>{t("registerNote")}</p>
              <form className="account-form" onSubmit={(e) => e.preventDefault()}>
                <label className={cn("account-field", bodyFontClass(locale))}>
                  <span className="account-field__label">
                    {t("email")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <label className={cn("account-field", bodyFontClass(locale))}>
                  <span className="account-field__label">
                    {t("password")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="password" name="registerPassword" required autoComplete="new-password" />
                </label>
                <button type="submit" className={cn("account-submit-btn", bodyFontClass(locale))}>
                  {t("register")}
                </button>
                <Link href="/register" className={cn("account-lost-password", bodyFontClass(locale))}>
                  {t("registerFullPage")}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="account-page bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="account-dashboard-layout">
          <nav className={cn("account-nav", bodyFontClass(locale))} aria-label={t("title")}>
            <ul className="account-nav__list">
              {ACCOUNT_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={cn(
                      "account-nav__link",
                      item.id !== "logout" && activeNav === item.id && "account-nav__link--active"
                    )}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {t(item.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="account-dashboard-content">
            {activeNav === "dashboard" && (
              <div className={cn("account-content-block", bodyFontClass(locale))}>
                <p className="account-greeting">
                  {t("dashboardGreeting", { name: displayName })}
                </p>
                <p className="account-intro">{t("dashboardIntro")}</p>
              </div>
            )}

            {activeNav === "orders" && (
              <div className={cn("account-content-block", bodyFontClass(locale))}>
                <p className="account-empty">{t("ordersEmpty")}</p>
                <Link href="/shop" className={cn("account-link-btn", bodyFontClass(locale))}>
                  {t("browseProducts")}
                </Link>
              </div>
            )}

            {activeNav === "downloads" && (
              <div className={cn("account-content-block", bodyFontClass(locale))}>
                <p className="account-empty">{t("downloadsEmpty")}</p>
              </div>
            )}

            {activeNav === "addresses" && (
              <div className={cn("account-content-block", bodyFontClass(locale))}>
                <p className={cn("account-section-label", displayFontClass(locale))}>{t("billingAddress")}</p>
                <p className="account-empty">{t("addressesEmpty")}</p>
                <button type="button" className={cn("account-link-btn account-link-btn--inline", bodyFontClass(locale))}>
                  {t("addBillingAddress")}
                </button>
                <p className={cn("account-section-label account-section-label--spaced", displayFontClass(locale))}>
                  {t("shippingAddress")}
                </p>
                <p className="account-empty">{t("addressesEmpty")}</p>
                <button type="button" className={cn("account-link-btn account-link-btn--inline", bodyFontClass(locale))}>
                  {t("addShippingAddress")}
                </button>
              </div>
            )}

            {activeNav === "account-details" && (
              <form className="account-form account-form--details" onSubmit={(e) => e.preventDefault()}>
                <div className="account-field-row">
                  <label className={cn("account-field account-field--half", bodyFontClass(locale))}>
                    <span className="account-field__label">
                      {t("firstName")} <abbr title={t("required")}>*</abbr>
                    </span>
                    <input type="text" name="firstName" defaultValue={displayName} required autoComplete="given-name" />
                  </label>
                  <label className={cn("account-field account-field--half", bodyFontClass(locale))}>
                    <span className="account-field__label">
                      {t("lastName")} <abbr title={t("required")}>*</abbr>
                    </span>
                    <input type="text" name="lastName" required autoComplete="family-name" />
                  </label>
                </div>
                <label className={cn("account-field", bodyFontClass(locale))}>
                  <span className="account-field__label">
                    {t("displayName")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="text" name="displayName" defaultValue={displayName} required />
                </label>
                <label className={cn("account-field", bodyFontClass(locale))}>
                  <span className="account-field__label">
                    {t("email")} <abbr title={t("required")}>*</abbr>
                  </span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <fieldset className="account-password-fieldset">
                  <legend className={cn("account-section-label", displayFontClass(locale))}>
                    {t("passwordChange")}
                  </legend>
                  <label className={cn("account-field", bodyFontClass(locale))}>
                    <span className="account-field__label">{t("currentPassword")}</span>
                    <input type="password" name="currentPassword" autoComplete="current-password" />
                  </label>
                  <label className={cn("account-field", bodyFontClass(locale))}>
                    <span className="account-field__label">{t("newPassword")}</span>
                    <input type="password" name="newPassword" autoComplete="new-password" />
                  </label>
                  <label className={cn("account-field", bodyFontClass(locale))}>
                    <span className="account-field__label">{t("confirmPassword")}</span>
                    <input type="password" name="confirmPassword" autoComplete="new-password" />
                  </label>
                </fieldset>
                <button type="submit" className={cn("account-submit-btn", bodyFontClass(locale))}>
                  {t("saveChanges")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
