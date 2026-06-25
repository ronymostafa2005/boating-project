"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { NavbarLogo } from "@/components/layout/NavbarLogo";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import type { Locale } from "@/types/locale";

function FacebookIcon() {
  return (
    <svg className="auth-login__social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 3h3.5L16 7.5h-2.5V10c0 .7.2 1.2 1.2 1.2H16v3.4h-2.1c-2 0-2.9-1.2-2.9-3.1V10H9V7.5h2V4.8C11 2.9 12.2 1.5 14 3z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="auth-login__social-icon" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5c-.2 1.2-1 2.2-2.1 2.9v2.4h3.4c2-1.8 3-4.5 3-7.1z" />
      <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.4c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.1v2.5C3.8 19.8 7.6 22 12 22z" />
      <path fill="#FBBC05" d="M6.2 13.8c-.2-.6-.4-1.2-.4-1.8s.1-1.2.4-1.8V7.7H2.1C1.3 9.3 1 11.1 1 12s.3 2.7 1.1 4.3l3.1-2.5z" />
      <path fill="#EA4335" d="M12 5.4c1.5 0 2.8.5 3.9 1.5l2.9-2.9C17.2 2.3 14.8 1 12 1 7.6 1 3.8 3.2 2.1 7.7l4.1 2.5c.8-2.5 3.1-4.3 5.8-4.3z" />
    </svg>
  );
}

export function LoginSection() {
  const t = useTranslations("loginPage");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <AuthPageShell labelledBy="login-form-title">
      <div className="auth-login">
        <h1
          id="login-form-title"
          className={cn(
            "auth-login__title",
            displayFontClass(locale),
            !isRtl && "uppercase tracking-[0.04em]"
          )}
        >
          {t("formTitle")}
        </h1>

        <p className={cn("auth-login__subtitle", bodyFontClass(locale))}>{t("formSubtitle")}</p>

        <div className="auth-login__logo-wrap">
          <Link href="/" className="inline-flex justify-center">
            <NavbarLogo
              locale={locale}
              textClassName="text-deep-sea"
              descriptorClassName="text-deep-sea/65"
            />
          </Link>
        </div>

        <form className="auth-login__form" onSubmit={(e) => e.preventDefault()}>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input type="text" name="username" required autoComplete="username" placeholder={t("username")} />
          </label>
          <label className={cn("auth-field", bodyFontClass(locale))}>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder={t("password")}
            />
          </label>

          <label className={cn("auth-login__remember", bodyFontClass(locale))}>
            <input type="checkbox" name="remember" />
            <span>{t("rememberMe")}</span>
          </label>

          <button type="submit" className={cn("auth-submit", bodyFontClass(locale))}>
            {t("signIn")}
          </button>
        </form>

        <Link href="/forgot-password" className={cn("auth-login__forgot", bodyFontClass(locale))}>
          {t("forgotPassword")}
        </Link>

        <p className={cn("auth-login__social-label", bodyFontClass(locale))}>{t("orLoginWith")}</p>

        <div className="auth-login__socials">
          <button type="button" className={cn("auth-login__social-btn", bodyFontClass(locale))}>
            <FacebookIcon />
            <span>{t("facebook")}</span>
          </button>
          <button type="button" className={cn("auth-login__social-btn", bodyFontClass(locale))}>
            <GoogleIcon />
            <span>{t("google")}</span>
          </button>
        </div>

        <p className={cn("auth-login__footer", bodyFontClass(locale))}>
          {t("noAccount")}{" "}
          <Link href="/register" className="auth-link">
            {t("registerLink")}
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
