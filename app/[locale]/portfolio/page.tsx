import type { Metadata } from "next";
import { generateSimplePageMetadata, SimpleContentPage } from "@/components/pages/SimpleContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSimplePageMetadata({ params }, "portfolio");
}

export default function PortfolioPage({ params }: Props) {
  return <SimpleContentPage params={params} pageKey="portfolio" />;
}
