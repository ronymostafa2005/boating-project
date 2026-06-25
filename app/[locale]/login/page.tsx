import type { Metadata } from "next";
import { generateSimplePageMetadata, SimpleContentPage } from "@/components/pages/SimpleContentPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSimplePageMetadata({ params }, "login");
}

export default function LoginPage({ params }: Props) {
  return <SimpleContentPage params={params} pageKey="login" />;
}
