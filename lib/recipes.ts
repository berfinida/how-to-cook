import type { Locale } from "@/i18n/routing";

export type RecipeCopy = { title: string; description: string; category: string; cuisine: string; ingredients: string[]; steps: string[]; tip: string };
export type Recipe = { slug: string; image: string; prep: number; cook: number; servings: number; difficulty: "Kolay" | "Orta"; featured: boolean; copy: Record<Locale, RecipeCopy> };
export type LocalizedRecipe = Omit<Recipe, "copy" | "difficulty"> & { copy: RecipeCopy; difficulty: string };

export const recipes: Recipe[] = [
  {
    slug: "firinda-akdeniz-sebzeleri", image: "/images/hero-roasted-vegetables.png", prep: 15, cook: 35, servings: 4, difficulty: "Kolay", featured: true,
    copy: {
      tr: { title: "Fırında Akdeniz Sebzeleri", description: "Taze otlar, zeytinyağı ve mevsim sebzeleriyle zahmetsiz bir sofra klasiği.", category: "Ana yemek", cuisine: "Akdeniz", ingredients: ["2 kabak", "1 patlıcan", "2 kırmızı biber", "250 g çeri domates", "3 yemek kaşığı zeytinyağı", "1 tatlı kaşığı kekik"], steps: ["Fırını 210°C'ye ısıtın.", "Sebzeleri eşit büyüklükte doğrayıp zeytinyağı ve baharatlarla harmanlayın.", "Tek kat halinde tepsiye yayın ve kenarları kızarana kadar 35 dakika pişirin."], tip: "Sebzeleri tepside sıkıştırmazsanız buharlaşmak yerine güzelce kızarırlar." },
      en: { title: "Mediterranean Roasted Vegetables", description: "An effortless table classic with fresh herbs, olive oil and seasonal vegetables.", category: "Main", cuisine: "Mediterranean", ingredients: ["2 courgettes", "1 aubergine", "2 red peppers", "250 g cherry tomatoes", "3 tbsp olive oil", "1 tsp oregano"], steps: ["Heat the oven to 210°C.", "Cut the vegetables evenly and toss with oil and seasoning.", "Spread in one layer and roast for 35 minutes until caramelised at the edges."], tip: "Give the vegetables room on the tray so they roast rather than steam." }
    }
  },
  {
    slug: "mercimek-corbasi", image: "/images/hero-roasted-vegetables.png", prep: 10, cook: 30, servings: 6, difficulty: "Kolay", featured: true,
    copy: {
      tr: { title: "İpeksi Mercimek Çorbası", description: "Limon ve kimyonla tamamlanan, pürüzsüz dokulu ev klasiği.", category: "Çorba", cuisine: "Türk", ingredients: ["1 su bardağı kırmızı mercimek", "1 soğan", "1 havuç", "5 su bardağı su", "1 çay kaşığı kimyon"], steps: ["Soğan ve havucu kısa süre kavurun.", "Mercimek ve suyu ekleyip 25 dakika pişirin.", "Pürüzsüz olana kadar çekip baharatlandırın."], tip: "Servisten hemen önce eklenen limon çorbanın lezzetini canlandırır." },
      en: { title: "Silky Red Lentil Soup", description: "A smooth Turkish classic finished with lemon and cumin.", category: "Soup", cuisine: "Turkish", ingredients: ["1 cup red lentils", "1 onion", "1 carrot", "5 cups water", "1 tsp cumin"], steps: ["Gently sauté the onion and carrot.", "Add lentils and water, then simmer for 25 minutes.", "Blend until smooth and season."], tip: "A squeeze of lemon just before serving brightens the entire bowl." }
    }
  },
  {
    slug: "limonlu-kek", image: "/images/hero-roasted-vegetables.png", prep: 20, cook: 45, servings: 8, difficulty: "Orta", featured: true,
    copy: {
      tr: { title: "Zeytinyağlı Limonlu Kek", description: "Nemli dokulu, yoğun limon kokulu ve hafif zeytinyağlı zarif bir kek.", category: "Tatlı", cuisine: "Akdeniz", ingredients: ["3 yumurta", "1 su bardağı şeker", "2 limon", "120 ml zeytinyağı", "2 su bardağı un"], steps: ["Yumurta ve şekeri açık renk olana kadar çırpın.", "Sıvıları ve limon kabuğunu ekleyin.", "Unu katlayıp 175°C'de 45 dakika pişirin."], tip: "Limon kabuğunu yalnızca sarı kısmından rendeleyin; beyaz kısım acıdır." },
      en: { title: "Lemon Olive Oil Cake", description: "An elegant, moist cake with vivid lemon and mellow olive oil.", category: "Dessert", cuisine: "Mediterranean", ingredients: ["3 eggs", "1 cup sugar", "2 lemons", "120 ml olive oil", "2 cups flour"], steps: ["Whisk eggs and sugar until pale.", "Add liquids and lemon zest.", "Fold in flour and bake at 175°C for 45 minutes."], tip: "Zest only the yellow skin; the white pith tastes bitter." }
    }
  }
];

export function getRecipe(slug: string) { return recipes.find((recipe) => recipe.slug === slug); }
export function localizeDemoRecipe(recipe: Recipe, locale: Locale): LocalizedRecipe {
  return { ...recipe, copy: recipe.copy[locale], difficulty: locale === "tr" ? recipe.difficulty : recipe.difficulty === "Kolay" ? "Easy" : "Medium" };
}
