"use client";

import { usePathname } from "@/lib/i18n/navigation";
import { Home1Header } from "./Home1Header";
import { Home2Header } from "./Home2Header";

export function Header() {
  const pathname = usePathname();
  const isHome2 =
    pathname === "/home-2" || pathname.startsWith("/home-2/");

  if (isHome2) {
    return <Home2Header />;
  }

  return <Home1Header />;
}
