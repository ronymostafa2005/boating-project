import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import {
  Reem_Kufi,
  IBM_Plex_Sans_Arabic,
  Cormorant_Garamond,
  Great_Vibes,
  Jost,
  Tajawal,
} from "next/font/google";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "../globals.css";

const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem-kufi",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const marcellus = localFont({
  src: "../fonts/Marcellus-Regular.ttf",
  variable: "--font-marcellus",
  display: "swap",
  weight: "400",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isArabic = locale === "ar";

  const fontClasses = isArabic
    ? `${reemKufi.variable} ${ibmPlexArabic.variable} font-bodyAr`
    : `${cormorant.variable} ${jost.variable} font-bodyEn`;

  const displayFont = isArabic ? "font-displayAr" : "font-displayEn";

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <body
        className={`${reemKufi.variable} ${ibmPlexArabic.variable} ${cormorant.variable} ${greatVibes.variable} ${jost.variable} ${tajawal.variable} ${marcellus.variable} ${fontClasses} ${displayFont} bg-white text-foreground antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen overflow-x-hidden">{children}</main>
          <Footer />
          <ScrollToTopButton />
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
