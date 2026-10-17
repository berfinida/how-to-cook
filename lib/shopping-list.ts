export type ShoppingListItem = { recipeSlug: string; ingredient: string; title: string };

export function readShoppingList(value: string | null): ShoppingListItem[] {
  if (!value) return [];
  try {
    const parsedValue: unknown = JSON.parse(value);
    if (!Array.isArray(parsedValue)) return [];
    return parsedValue.filter((item): item is ShoppingListItem => typeof item === "object" && item !== null && "recipeSlug" in item && "ingredient" in item && "title" in item && typeof item.recipeSlug === "string" && typeof item.ingredient === "string" && typeof item.title === "string");
  } catch {
    return [];
  }
}
