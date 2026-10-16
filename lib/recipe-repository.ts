import { Prisma, type Locale as DatabaseLocale } from "@prisma/client";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { getRecipe, localizeDemoRecipe, recipes, type LocalizedRecipe } from "@/lib/recipes";

const includeRecipe = (locale: DatabaseLocale) => ({
  translations: { where: { locale } },
  steps: { where: { locale }, orderBy: { position: "asc" as const } },
  ingredients: {
    orderBy: { position: "asc" as const },
    include: { ingredient: { include: { translations: { where: { locale } } } } },
  },
  images: { orderBy: { position: "asc" as const } },
  categories: { include: { category: { include: { translations: { where: { locale } } } } } },
});

type DatabaseRecipe = Prisma.RecipeGetPayload<{ include: ReturnType<typeof includeRecipe> }>;

function databaseLocale(locale: Locale): DatabaseLocale {
  return locale === "tr" ? "TR" : "EN";
}

function formatIngredient(item: DatabaseRecipe["ingredients"][number]) {
  const translation = item.ingredient.translations[0];
  const amount = item.amount?.toString();
  return [amount, item.unit, translation?.name, item.note].filter(Boolean).join(" ");
}

function mapRecipe(recipe: DatabaseRecipe, locale: Locale): LocalizedRecipe | null {
  const translation = recipe.translations[0];
  if (!translation) return null;
  const category = recipe.categories[0]?.category.translations[0]?.name ?? "";
  const difficulty = locale === "tr"
    ? recipe.difficulty === "MEDIUM" ? "Orta" : "Kolay"
    : recipe.difficulty === "MEDIUM" ? "Medium" : "Easy";
  return {
    slug: recipe.slug,
    image: recipe.images[0]?.url ?? "/images/hero-roasted-vegetables.png",
    prep: recipe.prepMinutes,
    cook: recipe.cookMinutes,
    servings: recipe.servings,
    difficulty,
    featured: true,
    copy: {
      title: translation.title,
      description: translation.description,
      category,
      cuisine: translation.cuisine ?? recipe.cuisine ?? "",
      ingredients: recipe.ingredients.map(formatIngredient),
      steps: recipe.steps.map((step) => step.instruction),
      tip: translation.tips ?? "",
    },
  };
}

export async function getPublishedRecipeLocales(slug: string): Promise<Locale[]> {
  if (!process.env.DATABASE_URL) return getRecipe(slug) ? ["tr", "en"] : [];
  const translations = await prisma.recipeTranslation.findMany({
    where: { recipe: { slug, status: "PUBLISHED" } },
    select: { locale: true },
  });
  return translations.map(({ locale }) => locale === "TR" ? "tr" : "en");
}

export async function getPublishedRecipes(locale: Locale): Promise<LocalizedRecipe[]> {
  if (!process.env.DATABASE_URL) return recipes.map((recipe) => localizeDemoRecipe(recipe, locale));
  const records = await prisma.recipe.findMany({
    where: { status: "PUBLISHED", translations: { some: { locale: databaseLocale(locale) } } },
    include: includeRecipe(databaseLocale(locale)),
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  return records.map((recipe) => mapRecipe(recipe, locale)).filter((recipe): recipe is LocalizedRecipe => recipe !== null);
}

export async function getPublishedRecipe(slug: string, locale: Locale): Promise<LocalizedRecipe | null> {
  if (!process.env.DATABASE_URL) {
    const recipe = getRecipe(slug);
    return recipe ? localizeDemoRecipe(recipe, locale) : null;
  }
  const recipe = await prisma.recipe.findFirst({
    where: { slug, status: "PUBLISHED", translations: { some: { locale: databaseLocale(locale) } } },
    include: includeRecipe(databaseLocale(locale)),
  });
  return recipe ? mapRecipe(recipe, locale) : null;
}
