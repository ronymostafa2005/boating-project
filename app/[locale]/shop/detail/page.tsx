import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function ShopDetailRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/shop/direction-compass`);
}
