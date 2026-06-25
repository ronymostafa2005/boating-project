export const ACCOUNT_NAV_ITEMS = [
  { id: "dashboard", labelKey: "navDashboard" },
  { id: "orders", labelKey: "navOrders" },
  { id: "downloads", labelKey: "navDownloads" },
  { id: "addresses", labelKey: "navAddresses" },
  { id: "account-details", labelKey: "navAccountDetails" },
  { id: "logout", labelKey: "navLogout" },
] as const;

export type AccountNavId = (typeof ACCOUNT_NAV_ITEMS)[number]["id"];
