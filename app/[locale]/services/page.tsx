import type { Metadata } from "next";
import { generateSimplePageMetadata, SimpleContentPage } from "@/components/pages/SimpleContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSimplePageMetadata({ params }, "services");
}

export default function ServicesPage({ params }: Props) {
  return <SimpleContentPage params={params} pageKey="services" />;
}
