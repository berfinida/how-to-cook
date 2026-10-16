import type { MetadataRoute } from "next";
import { getPublishedRecipes } from "@/lib/recipe-repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; const pages = ["", "/recipes"]; const locales = ["tr","en"] as const; const entries = await Promise.all(locales.map(async (locale) => {const recipes=await getPublishedRecipes(locale);return [...pages.map((path) => ({url:`${base}/${locale}${path}`, lastModified:new Date(), changeFrequency:"weekly" as const, priority:path ? .8 : 1})), ...recipes.map((recipe) => ({url:`${base}/${locale}/recipes/${recipe.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.7}))]})); return entries.flat(); }
