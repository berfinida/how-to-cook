import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("status");
  return <main className="empty-page"><span className="eyebrow">404</span><h1>{t("notFoundTitle")}</h1><p>{t("notFoundBody")}</p><Link className="button primary" href="/">{t("home")}</Link></main>;
}
