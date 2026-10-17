import { describe, expect, it } from "vitest";
import { findIngredientMatches, normalizeIngredient, parsePantry } from "@/lib/ingredient-matcher";

describe("ingredient matcher", () => {
  it("normalizes Turkish characters and common measurements", () => {
    expect(normalizeIngredient("2 yemek kaşığı Zeytinyağı")).toBe("zeytinyagi");
  });

  it("matches Turkish pantry names with English recipe ingredients", () => {
    const result = findIngredientMatches(["2 tomatoes", "3 eggs", "1 onion"], "domates, yumurta");
    expect(result.matched).toEqual(["2 tomatoes", "3 eggs"]);
    expect(result.missing).toEqual(["1 onion"]);
  });

  it("deduplicates equivalent pantry aliases", () => {
    expect([...parsePantry("kabak, courgettes, zucchini")]).toEqual(["kabak"]);
  });
});
