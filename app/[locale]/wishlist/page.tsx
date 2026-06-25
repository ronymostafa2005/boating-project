import type { Metadata } from "next";
import { generateSimplePageMetadata, SimpleContentPage } from "@/components/pages/SimpleContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSimplePageMetadata({ params }, "wishlist");
}

export default function WishlistPage({ params }: Props) {
  return <SimpleContentPage params={params} pageKey="wishlist" />;
}
