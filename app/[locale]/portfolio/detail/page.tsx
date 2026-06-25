import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PortfolioDetailRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/portfolio/harbor-heaven`);
}
