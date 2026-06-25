import { getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/404/NotFoundContent";

type Props = {
  locale: string;
  fullScreen?: boolean;
};

export async function NotFoundSection({ locale, fullScreen = true }: Props) {
  const t = await getTranslations("page404");

  return (
    <NotFoundContent
      locale={locale}
      code={t("code")}
      heading={t("heading")}
      description={t("description")}
      backToHome={t("backToHome")}
      fullScreen={fullScreen}
    />
  );
}
