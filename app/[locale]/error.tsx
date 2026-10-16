"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations("status");
  return <main className="empty-page"><span className="eyebrow">Error</span><h1>{t("errorTitle")}</h1><p>{t("errorBody")}</p><button className="button primary" onClick={reset}>{t("retry")}</button></main>;
}
