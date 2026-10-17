const aliases: Record<string, string[]> = {
  domates: ["tomato", "tomatoes", "cherry tomato", "cherry tomatoes"],
  patates: ["potato", "potatoes"],
  yumurta: ["egg", "eggs"],
  un: ["flour"],
  sut: ["milk"],
  yogurt: ["yoğurt", "yoghurt"],
  peynir: ["cheese", "white cheese", "parmesan"],
  sogan: ["onion", "onions", "spring onion"],
  sarimsak: ["garlic", "garlic clove", "garlic cloves"],
  mercimek: ["lentil", "lentils", "red lentil", "red lentils"],
  kabak: ["courgette", "courgettes", "zucchini"],
  tavuk: ["chicken", "chicken drumstick", "chicken drumsticks"],
  biber: ["pepper", "peppers", "red pepper", "red peppers", "green pepper", "green peppers"],
  limon: ["lemon", "lemons"],
};

const measurements = /\b\d+(?:[.,/]\d+)?\b|\b(?:g|kg|ml|l|tbsp|tsp|cup|cups|bunch|bunches|clove|cloves|slice|slices|sheets|handful|su bardagi|yemek kasigi|cay kasigi|demet|dis|adet|orta boy|kucuk|buyuk|for|the|sauce|icin)\b/gu;

export function normalizeIngredient(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replace(/ı/gu, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/[^a-z0-9\s]/gu, " ")
    .replace(measurements, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function canonicalIngredient(value: string) {
  const normalizedValue = normalizeIngredient(value);
  for (const [canonicalName, alternativeNames] of Object.entries(aliases)) {
    if ([canonicalName, ...alternativeNames].some((name) => normalizedValue.includes(normalizeIngredient(name)))) {
      return canonicalName;
    }
  }
  return normalizedValue.replace(/s$/u, "").trim();
}

export function parsePantry(value: string) {
  return new Set(
    value
      .split(/[\n,]/u)
      .map(canonicalIngredient)
      .filter(Boolean),
  );
}

export function findIngredientMatches(ingredients: string[], pantryValue: string) {
  const pantry = parsePantry(pantryValue);
  const matched = ingredients.filter((ingredient) => pantry.has(canonicalIngredient(ingredient)));
  return { matched, missing: ingredients.filter((ingredient) => !matched.includes(ingredient)) };
}
