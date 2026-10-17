import { describe, expect, it } from "vitest";
import { getPublishedRecipe, getPublishedRecipeLocales, getPublishedRecipes } from "@/lib/recipe-repository";
import { recipes as seedRecipes } from "@/lib/recipes";

const databaseIsAvailable = Boolean(process.env.DATABASE_URL);

describe.runIf(databaseIsAvailable)("recipe repository with PostgreSQL", () => {
  it("loads seeded published recipes in Turkish", async () => {
    const recipes = await getPublishedRecipes("tr");
    expect(recipes).toHaveLength(seedRecipes.length);
    expect(recipes[0].copy.title).toBeTruthy();
    expect(recipes.every((recipe) => recipe.copy.ingredients.length > 0)).toBe(true);
  });

  it("loads the independent English translation", async () => {
    const recipe = await getPublishedRecipe("firinda-akdeniz-sebzeleri", "en");
    expect(recipe?.copy.title).toBe("Mediterranean Roasted Vegetables");
    expect(recipe?.copy.cuisine).toBe("Mediterranean");
    expect(recipe?.difficulty).toBe("Easy");
  });

  it("reports only existing translation locales", async () => {
    await expect(getPublishedRecipeLocales("firinda-akdeniz-sebzeleri")).resolves.toEqual(expect.arrayContaining(["tr", "en"]));
    await expect(getPublishedRecipeLocales("missing-recipe")).resolves.toEqual([]);
  });
});
