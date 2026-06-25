import type { Metadata } from "next";
import { generateSimplePageMetadata, SimpleContentPage } from "@/components/pages/SimpleContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSimplePageMetadata({ params }, "page404");
}

export default function NotFoundDemoPage({ params }: Props) {
  return <SimpleContentPage params={params} pageKey="page404" />;
}
