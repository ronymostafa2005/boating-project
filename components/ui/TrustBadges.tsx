"use client";

import { useTranslations } from "next-intl";

const badges = [
  { key: "licensed", icon: "⚓" },
  { key: "verified", icon: "✓" },
  { key: "insured", icon: "🛡" },
  { key: "support", icon: "📞" },
] as const;

export function TrustBadges() {
  const t = useTranslations("trust");

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map(({ key, icon }) => (
        <div
          key={key}
          className="card-luxury flex flex-col items-center p-6 text-center"
        >
          <span className="mb-3 text-3xl">{icon}</span>
          <span className="text-sm font-medium text-gold">{t(key)}</span>
        </div>
      ))}
    </div>
  );
}
