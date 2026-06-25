"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BackToTopAnchorIcon } from "@/components/ui/BackToTopAnchorIcon";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
  const t = useTranslations("footer");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-neera-gold transition-all duration-300 hover:bg-neera-gold-dark",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
      aria-label={t("scrollTop")}
      title={t("scrollTop")}
    >
      <BackToTopAnchorIcon className="h-8 w-8" />
    </button>
  );
}
