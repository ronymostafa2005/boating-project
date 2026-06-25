"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function RegisterSection() {
  const t = useTranslations("register");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <AuthPageShell labelledBy="register-form-title">
      <div className="auth-register">
        <div className="auth-register__heading">
          <h1
            id="register-form-title"
            className={cn("auth-register__title", displayFontClass(locale), !isRtl && "uppercase")}
          >
            <span className="auth-register__title-line" aria-hidden />
            <span className="auth-register__title-text">
              <span className="auth-register__title-register">{t("formTitleRegister")}</span>
              <span className="auth-register__title-form">{t("formTitleForm")}</span>
            </span>
            <span className="auth-register__title-line" aria-hidden />
          </h1>
        </div>

        <p className={cn("auth-register__prompt", bodyFontClass(locale))}>
          <strong>{t("noAccountPrompt")}</strong>
        </p>

        <form className="auth-register__form" onSubmit={(e) => e.preventDefault()}>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              placeholder={t("firstName")}
            />
          </label>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="text"
              name="lastName"
              autoComplete="family-name"
              placeholder={t("lastName")}
            />
          </label>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="text"
              name="username"
              required
              autoComplete="username"
              placeholder={t("username")}
            />
          </label>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t("email")}
            />
          </label>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="password"
              name="password"
              required
              autoComplete="new-password"
              placeholder={t("password")}
            />
          </label>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              placeholder={t("confirmPassword")}
            />
          </label>

          <button type="submit" className={cn("auth-submit", bodyFontClass(locale))}>
            {t("submit")}
          </button>
        </form>

        <p className={cn("auth-register__footer", bodyFontClass(locale))}>
          {t("alreadyHaveAccount")}{" "}
          <Link href="/login" className="auth-link">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
