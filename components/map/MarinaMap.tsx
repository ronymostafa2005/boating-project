import type { Locale } from "@/types/locale";
import { marinas, getAllMarinasMapUrl } from "@/lib/maps/marinas";
import { getLocalized } from "@/lib/utils";

interface MarinaMapProps {
  locale: Locale;
}

export function MarinaMap({ locale }: MarinaMapProps) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-luxury-slate">
        <iframe
          src={getAllMarinasMapUrl()}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jeddah Marinas Map"
          allowFullScreen
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {marinas.map((marina) => (
          <div key={marina.id} className="card-luxury p-5">
            <h3 className="mb-2 font-semibold text-gold">
              {getLocalized(marina.name, locale)}
            </h3>
            <p className="text-sm text-gray-400">
              {getLocalized(marina.description, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
