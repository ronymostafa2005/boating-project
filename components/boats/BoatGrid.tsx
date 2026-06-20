import type { Boat } from "@/types/boat";
import type { Locale } from "@/types/locale";
import { BoatCard } from "@/components/ui/BoatCard";

interface BoatGridProps {
  boats: Boat[];
  locale: Locale;
}

export function BoatGrid({ boats, locale }: BoatGridProps) {
  if (boats.length === 0) {
    return (
      <p className="py-12 text-center text-gray-400">
        {locale === "ar" ? "لا توجد نتائج" : "No results found"}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {boats.map((boat) => (
        <BoatCard key={boat._id} boat={boat} locale={locale} />
      ))}
    </div>
  );
}
