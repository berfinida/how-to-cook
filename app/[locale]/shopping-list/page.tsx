import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ShoppingList } from "@/components/shopping-list";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "tr" ? "Alışveriş Listem" : "My Shopping List", robots: { index: false, follow: false } };
}

export default async function ShoppingListPage() {
  const t = await getTranslations("shoppingList");
  return <main><div className="page-hero"><div className="shell"><span className="eyebrow">How to Cook</span><h1>{t("title")}</h1><p>{t("body")}</p></div></div><section className="shell section"><ShoppingList labels={{ clear: t("clear"), empty: t("empty"), savedLocally: t("savedLocally") }}/></section></main>;
}
