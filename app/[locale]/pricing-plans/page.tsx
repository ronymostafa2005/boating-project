import type { Metadata } from "next";
import { generateSimplePageMetadata, SimpleContentPage } from "@/components/pages/SimpleContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSimplePageMetadata({ params }, "pricingPlans");
}

export default function PricingPlansPage({ params }: Props) {
  return <SimpleContentPage params={params} pageKey="pricingPlans" />;
}
