import { routing } from "@/i18n/routing";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen items-center justify-center bg-white text-foreground">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-gold">404</h1>
          <p className="mb-8 text-gray-400">الصفحة غير موجودة / Page not found</p>
          <a
            href={`/${routing.defaultLocale}`}
            className="btn-primary inline-block"
          >
            {routing.defaultLocale === "ar" ? "العودة للرئيسية" : "Back Home"}
          </a>
        </div>
      </body>
    </html>
  );
}
