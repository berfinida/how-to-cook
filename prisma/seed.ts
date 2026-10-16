import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { recipes } from "../lib/recipes";

const prisma = new PrismaClient();

function categorySlug(name: string) {
  if (name === "Çorba") return "soup";
  if (name === "Tatlı") return "dessert";
  return "main";
}

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required for seeding");
  const admin = await prisma.user.upsert({ where: { email: email.toLowerCase() }, update: { role: Role.ADMIN }, create: { email: email.toLowerCase(), name: "How to Cook Editor", role: Role.ADMIN, passwordHash: await hash(password, 12) } });
  if (process.env.TEST_USER_EMAIL && process.env.TEST_USER_PASSWORD) {
    await prisma.user.upsert({
      where: { email: process.env.TEST_USER_EMAIL.toLowerCase() },
      update: { role: Role.USER, passwordHash: await hash(process.env.TEST_USER_PASSWORD, 12) },
      create: { email: process.env.TEST_USER_EMAIL.toLowerCase(), name: "Test User", role: Role.USER, passwordHash: await hash(process.env.TEST_USER_PASSWORD, 12) },
    });
  }

  for (const demo of recipes) {
    const category = await prisma.category.upsert({ where: { slug: categorySlug(demo.copy.tr.category) }, update: {}, create: { slug: categorySlug(demo.copy.tr.category) } });
    await Promise.all([
      prisma.categoryTranslation.upsert({ where: { categoryId_locale: { categoryId: category.id, locale: "TR" } }, update: { name: demo.copy.tr.category }, create: { categoryId: category.id, locale: "TR", name: demo.copy.tr.category } }),
      prisma.categoryTranslation.upsert({ where: { categoryId_locale: { categoryId: category.id, locale: "EN" } }, update: { name: demo.copy.en.category }, create: { categoryId: category.id, locale: "EN", name: demo.copy.en.category } }),
    ]);
    const recipe = await prisma.recipe.upsert({ where: { slug: demo.slug }, update: { authorId: admin.id, status: "PUBLISHED", servings: demo.servings, prepMinutes: demo.prep, cookMinutes: demo.cook, difficulty: demo.difficulty === "Orta" ? "MEDIUM" : "EASY", cuisine: demo.copy.tr.cuisine, publishedAt: new Date("2026-10-01T09:00:00Z") }, create: { slug: demo.slug, authorId: admin.id, status: "PUBLISHED", servings: demo.servings, prepMinutes: demo.prep, cookMinutes: demo.cook, difficulty: demo.difficulty === "Orta" ? "MEDIUM" : "EASY", cuisine: demo.copy.tr.cuisine, publishedAt: new Date("2026-10-01T09:00:00Z") } });
    await prisma.$transaction([
      prisma.recipeTranslation.upsert({ where: { recipeId_locale: { recipeId: recipe.id, locale: "TR" } }, update: { title: demo.copy.tr.title, description: demo.copy.tr.description, cuisine: demo.copy.tr.cuisine, tips: demo.copy.tr.tip }, create: { recipeId: recipe.id, locale: "TR", title: demo.copy.tr.title, description: demo.copy.tr.description, cuisine: demo.copy.tr.cuisine, tips: demo.copy.tr.tip } }),
      prisma.recipeTranslation.upsert({ where: { recipeId_locale: { recipeId: recipe.id, locale: "EN" } }, update: { title: demo.copy.en.title, description: demo.copy.en.description, cuisine: demo.copy.en.cuisine, tips: demo.copy.en.tip }, create: { recipeId: recipe.id, locale: "EN", title: demo.copy.en.title, description: demo.copy.en.description, cuisine: demo.copy.en.cuisine, tips: demo.copy.en.tip } }),
      prisma.recipeStep.deleteMany({ where: { recipeId: recipe.id } }),
      prisma.recipeIngredient.deleteMany({ where: { recipeId: recipe.id } }),
      prisma.recipeImage.deleteMany({ where: { recipeId: recipe.id } }),
      prisma.recipeCategory.deleteMany({ where: { recipeId: recipe.id } }),
    ]);
    await prisma.recipeStep.createMany({ data: [...demo.copy.tr.steps.map((instruction, position) => ({ recipeId: recipe.id, locale: "TR" as const, position, instruction })), ...demo.copy.en.steps.map((instruction, position) => ({ recipeId: recipe.id, locale: "EN" as const, position, instruction }))] });
    await prisma.recipeImage.create({ data: { recipeId: recipe.id, url: demo.image, alt: demo.copy.tr.title, position: 0 } });
    await prisma.recipeCategory.create({ data: { recipeId: recipe.id, categoryId: category.id } });
    for (let position = 0; position < demo.copy.tr.ingredients.length; position += 1) {
      const ingredient = await prisma.ingredient.upsert({ where: { canonicalKey: `${demo.slug}-${position}` }, update: {}, create: { canonicalKey: `${demo.slug}-${position}` } });
      await Promise.all([
        prisma.ingredientTranslation.upsert({ where: { ingredientId_locale: { ingredientId: ingredient.id, locale: "TR" } }, update: { name: demo.copy.tr.ingredients[position] }, create: { ingredientId: ingredient.id, locale: "TR", name: demo.copy.tr.ingredients[position], aliases: [] } }),
        prisma.ingredientTranslation.upsert({ where: { ingredientId_locale: { ingredientId: ingredient.id, locale: "EN" } }, update: { name: demo.copy.en.ingredients[position] }, create: { ingredientId: ingredient.id, locale: "EN", name: demo.copy.en.ingredients[position], aliases: [] } }),
      ]);
      await prisma.recipeIngredient.create({ data: { recipeId: recipe.id, ingredientId: ingredient.id, position } });
    }
  }
}

main().finally(() => prisma.$disconnect());
