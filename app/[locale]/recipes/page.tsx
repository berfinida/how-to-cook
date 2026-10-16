import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { RecipeSearch } from "@/components/recipe-search";
import { getPublishedRecipes } from "@/lib/recipe-repository";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; const title = locale === "tr" ? "Tüm Tarifler" : "All Recipes"; return { title, alternates: { canonical: `/${locale}/recipes`, languages: { tr: "/tr/recipes", en: "/en/recipes" } } }; }
export default async function RecipesPage({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; const [t, recipes] = await Promise.all([getTranslations("recipes"), getPublishedRecipes(locale)]); return <main><div className="page-hero"><div className="shell"><span className="eyebrow">How to Cook collection</span><h1>{t("title")}</h1><p>{t("body")}</p></div></div><section className="shell section" style={{paddingTop:0}}><RecipeSearch locale={locale} recipes={recipes} labels={{ search:t("search"), all:t("all"), empty:t("empty") }}/></section></main>; }
