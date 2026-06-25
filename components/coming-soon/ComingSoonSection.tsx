import { getTranslations } from "next-intl/server";
import { ComingSoonContent } from "@/components/coming-soon/ComingSoonContent";

type Props = {
  locale: string;
  fullScreen?: boolean;
};

export async function ComingSoonSection({ locale, fullScreen = true }: Props) {
  const t = await getTranslations("comingSoon");

  return (
    <ComingSoonContent
      locale={locale}
      title={t("title")}
      description={t("description")}
      backToHome={t("backToHome")}
      daysLabel={t("days")}
      hoursLabel={t("hours")}
      minutesLabel={t("minutes")}
      secondsLabel={t("seconds")}
      fullScreen={fullScreen}
    />
  );
}
