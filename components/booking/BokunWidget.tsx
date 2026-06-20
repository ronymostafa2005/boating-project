"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { cn } from "@/lib/utils";
import { BOKUN_LOADER_URL, getBokunLocale } from "@/lib/bokun/config";
import type { BokunWidgetProps } from "@/lib/bokun/types";

export function BokunWidget({
  productId,
  widgetType = "booking",
  locale,
  className,
}: BokunWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bokunLocale = getBokunLocale(locale as "ar" | "en");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "bokunWidget";
    widgetDiv.setAttribute("data-src", productId);
    widgetDiv.setAttribute("data-type", widgetType);
    widgetDiv.setAttribute("data-lang", bokunLocale);
    container.appendChild(widgetDiv);

    if (window.BokunWidgetsLoader) {
      window.BokunWidgetsLoader.load({});
    }
  }, [productId, widgetType, bokunLocale]);

  return (
    <>
      <Script
        src={BOKUN_LOADER_URL}
        strategy="lazyOnload"
        onLoad={() => {
          if (window.BokunWidgetsLoader) {
            window.BokunWidgetsLoader.load({});
          }
        }}
      />
      <div
        ref={containerRef}
        className={cn("bokun-widget-container min-h-[400px]", className)}
        data-bokun-widget
        data-product-id={productId}
        data-widget-type={widgetType}
        data-locale={bokunLocale}
      />
    </>
  );
}
