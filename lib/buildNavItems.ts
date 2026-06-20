import type { NavDropdownItem } from "@/components/layout/NavDropdown";

export function buildNavItems(
  switchLocale: () => void,
  pathname: string
): NavDropdownItem[] {
  const isHome1 = pathname === "/";
  const isHome2 = pathname === "/home-2";

  return [
    {
      key: "home",
      children: [
        { key: "homeMarine", href: "/", active: isHome1 },
        { key: "homeYacht", href: "/home-2", active: isHome2 },
        { key: "rtlVersion", onClick: switchLocale, showArrow: true },
      ],
    },
    {
      key: "pages",
      children: [
        { key: "about", href: "/about" },
        { key: "howItWorks", href: "/how-it-works" },
        { key: "safety", href: "/safety" },
        { key: "listBoat", href: "/list-your-boat" },
        { key: "terms", href: "/terms" },
        { key: "privacy", href: "/privacy" },
      ],
    },
    { key: "locations", href: "/map" },
    {
      key: "tour",
      children: [
        { key: "boats", href: "/boats" },
        { key: "howItWorks", href: "/how-it-works" },
      ],
    },
    {
      key: "blogs",
      children: [{ key: "faq", href: "/faq" }],
    },
    { key: "contactUs", href: "/contact" },
  ];
}
