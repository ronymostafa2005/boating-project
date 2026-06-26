import type { NavDropdownItem } from "@/components/layout/NavDropdown";

export function buildNavItems(): NavDropdownItem[] {
  return [
    { key: "home", href: "/" },
    {
      key: "pages",
      children: [
        { key: "aboutUs", href: "/about" },
        { key: "faq", href: "/faq" },
        { key: "ourCrew", href: "/our-crew" },
        { key: "pricingPlans", href: "/pricing-plans" },
        {
          key: "shop",
          href: "/shop",
          showArrow: true,
          children: [
            { key: "shopListing", href: "/shop" },
            { key: "shopDetail", href: "/shop/direction-compass" },
            { key: "myAccount", href: "/my-account" },
            { key: "cart", href: "/cart" },
            { key: "wishlist", href: "/wishlist" },
            { key: "checkout", href: "/checkout" },
          ],
        },
        {
          key: "portfolio",
          href: "/portfolio",
          showArrow: true,
          children: [
            { key: "portfolioListing", href: "/portfolio" },
            { key: "portfolioDetail", href: "/portfolio/harbor-heaven" },
          ],
        },
        {
          key: "services",
          href: "/services",
          showArrow: true,
          children: [
            { key: "serviceListing", href: "/services" },
            { key: "serviceDetail", href: "/services/deck-boats" },
          ],
        },
        { key: "login", href: "/login" },
        { key: "register", href: "/register" },
        { key: "comingSoon", href: "/coming-soon" },
        { key: "page404", href: "/404" },
        { key: "tourDetail", href: "/tours/magical-yacht" },
        { key: "bookingDetail", href: "/booking-details" },
      ],
    },
    { key: "locations", href: "/map" },
    {
      key: "tour",
      children: [
        { key: "tourListing", href: "/tours" },
        { key: "boats", href: "/boats" },
        { key: "howItWorks", href: "/how-it-works" },
      ],
    },
    {
      key: "booking",
      children: [
        { key: "bookNow", href: "/tours" },
        { key: "roomAvailability", href: "/room-availability" },
        { key: "myBookings", href: "/booking-lists" },
      ],
    },
    {
      key: "blogs",
      children: [{ key: "faq", href: "/faq" }],
    },
    { key: "contactUs", href: "/contact" },
  ];
}
