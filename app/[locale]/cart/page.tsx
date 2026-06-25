import type { Metadata } from "next";
import { generateSimplePageMetadata, SimpleContentPage } from "@/components/pages/SimpleContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSimplePageMetadata({ params }, "cart");
}

export default function CartPage({ params }: Props) {
  return <SimpleContentPage params={params} pageKey="cart" />;
}
