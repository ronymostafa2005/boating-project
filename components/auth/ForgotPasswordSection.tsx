"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export function ForgotPasswordSection() {
  const t = useTranslations("forgotPasswordPage");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <AuthPageShell labelledBy="forgot-password-form-title">
      <div className="auth-register">
        <div className="auth-register__heading">
          <h1
            id="forgot-password-form-title"
            className={cn("auth-register__title", displayFontClass(locale), !isRtl && "uppercase")}
          >
            <span className="auth-register__title-line" aria-hidden />
            <span className="auth-register__title-text">
              <span className="auth-register__title-register">{t("formTitleForgot")}</span>
              <span className="auth-register__title-form">{t("formTitlePassword")}</span>
            </span>
            <span className="auth-register__title-line" aria-hidden />
          </h1>
        </div>

        <p className={cn("auth-register__prompt", bodyFontClass(locale))}>
          <strong>{t("prompt")}</strong>
        </p>

        <form className="auth-register__form" onSubmit={(e) => e.preventDefault()}>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="text"
              name="userLogin"
              required
              autoComplete="username"
              placeholder={t("usernameOrEmail")}
            />
          </label>

          <button type="submit" className={cn("auth-submit", bodyFontClass(locale))}>
            {t("submit")}
          </button>
        </form>

        <p className={cn("auth-register__footer", bodyFontClass(locale))}>
          {t("rememberPassword")}{" "}
          <Link href="/login" className="auth-link">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
