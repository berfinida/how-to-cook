"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const targetLocale = locale === "tr" ? "EN" : "TR";
  return <button className="language" onClick={() => router.replace(pathname, { locale: locale === "tr" ? "en" : "tr" })} aria-label={`Change language to ${targetLocale}`}>{targetLocale}</button>;
}
