import { Cormorant_Garamond, Jost } from "next/font/google";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import { NotFoundContent } from "@/components/404/NotFoundContent";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jost",
  display: "swap",
});

const marcellus = localFont({
  src: "./fonts/Marcellus-Regular.ttf",
  variable: "--font-marcellus",
  display: "swap",
  weight: "400",
});

export default function RootNotFound() {
  const isArabic = routing.defaultLocale === "ar";

  return (
    <html lang={routing.defaultLocale} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`${cormorant.variable} ${jost.variable} ${marcellus.variable} font-bodyEn font-displayEn bg-[#021526] text-white antialiased`}
      >
        <NotFoundContent
          locale={routing.defaultLocale}
          code="404"
          heading={
            isArabic ? "عذراً! الصفحة غير موجودة." : "Oops ! The Page Not Found."
          }
          description={
            isArabic
              ? "الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها."
              : "Proin non eros elementum, sagittis diam at, feugiat nunc. Ut velit arcu, posuere at neque quis, vestibulum vehicula dui. Praesent at felis ante. Cras sed ultricies risus. Nullam porta fermentum egestas. Praesent quis mauris ultrices."
          }
          backToHome={isArabic ? "العودة للرئيسية" : "Back To Home"}
          fullScreen
        />
      </body>
    </html>
  );
}
