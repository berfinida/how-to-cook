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
    slug: "mercimek-corbasi", image: "/images/red-lentil-soup.png", prep: 10, cook: 30, servings: 6, difficulty: "Kolay", featured: true,
    copy: {
      tr: { title: "İpeksi Mercimek Çorbası", description: "Limon ve kimyonla tamamlanan, pürüzsüz dokulu ev klasiği.", category: "Çorba", cuisine: "Türk", ingredients: ["1 su bardağı kırmızı mercimek", "1 soğan", "1 havuç", "5 su bardağı su", "1 çay kaşığı kimyon"], steps: ["Soğan ve havucu kısa süre kavurun.", "Mercimek ve suyu ekleyip 25 dakika pişirin.", "Pürüzsüz olana kadar çekip baharatlandırın."], tip: "Servisten hemen önce eklenen limon çorbanın lezzetini canlandırır." },
      en: { title: "Silky Red Lentil Soup", description: "A smooth Turkish classic finished with lemon and cumin.", category: "Soup", cuisine: "Turkish", ingredients: ["1 cup red lentils", "1 onion", "1 carrot", "5 cups water", "1 tsp cumin"], steps: ["Gently sauté the onion and carrot.", "Add lentils and water, then simmer for 25 minutes.", "Blend until smooth and season."], tip: "A squeeze of lemon just before serving brightens the entire bowl." }
    }
  },
  {
    slug: "limonlu-kek", image: "/images/lemon-cake.png", prep: 20, cook: 45, servings: 8, difficulty: "Orta", featured: true,
    copy: {
      tr: { title: "Zeytinyağlı Limonlu Kek", description: "Nemli dokulu, yoğun limon kokulu ve hafif zeytinyağlı zarif bir kek.", category: "Tatlı", cuisine: "Akdeniz", ingredients: ["3 yumurta", "1 su bardağı şeker", "2 limon", "120 ml zeytinyağı", "2 su bardağı un"], steps: ["Yumurta ve şekeri açık renk olana kadar çırpın.", "Sıvıları ve limon kabuğunu ekleyin.", "Unu katlayıp 175°C'de 45 dakika pişirin."], tip: "Limon kabuğunu yalnızca sarı kısmından rendeleyin; beyaz kısım acıdır." },
      en: { title: "Lemon Olive Oil Cake", description: "An elegant, moist cake with vivid lemon and mellow olive oil.", category: "Dessert", cuisine: "Mediterranean", ingredients: ["3 eggs", "1 cup sugar", "2 lemons", "120 ml olive oil", "2 cups flour"], steps: ["Whisk eggs and sugar until pale.", "Add liquids and lemon zest.", "Fold in flour and bake at 175°C for 45 minutes."], tip: "Zest only the yellow skin; the white pith tastes bitter." }
    }
  },
  {
    slug: "menemen", image: "/images/turkish-breakfast.png", prep: 10, cook: 15, servings: 2, difficulty: "Kolay", featured: true,
    copy: {
      tr: { title: "Klasik Menemen", description: "Sulu domates, yeşil biber ve yumuşak yumurtayla hazırlanan hızlı kahvaltı klasiği.", category: "Kahvaltı", cuisine: "Türk", ingredients: ["3 olgun domates", "3 sivri biber", "3 yumurta", "1 yemek kaşığı tereyağı", "1/2 çay kaşığı tuz"], steps: ["Domatesleri rendeleyin, biberleri ince doğrayın.", "Tereyağında biberleri 3 dakika yumuşatın.", "Domatesi ekleyip suyunu hafif çekene kadar pişirin.", "Yumurtaları kırıp çok kurutmadan karıştırarak pişirin."], tip: "Yumurtayı ekledikten sonra kısık ateş kullanın; menemen dinlenirken de pişmeye devam eder." },
      en: { title: "Classic Turkish Menemen", description: "A quick breakfast classic of juicy tomatoes, green peppers and softly set eggs.", category: "Breakfast", cuisine: "Turkish", ingredients: ["3 ripe tomatoes", "3 green peppers", "3 eggs", "1 tbsp butter", "1/2 tsp salt"], steps: ["Grate the tomatoes and finely slice the peppers.", "Soften the peppers in butter for 3 minutes.", "Add tomatoes and cook until slightly reduced.", "Add eggs and stir gently over low heat until just set."], tip: "Take the pan off the heat while the eggs still look soft; they continue cooking as they rest." }
    }
  },
  {
    slug: "firinda-sebzeli-tavuk", image: "/images/chicken-casserole.png", prep: 20, cook: 50, servings: 4, difficulty: "Kolay", featured: true,
    copy: {
      tr: { title: "Fırında Sebzeli Tavuk", description: "Tek tepside kızaran tavuk, patates ve renkli biberlerle doyurucu aile yemeği.", category: "Ana yemek", cuisine: "Türk", ingredients: ["6 tavuk baget", "3 patates", "2 kapya biber", "2 domates", "3 yemek kaşığı zeytinyağı", "1 tatlı kaşığı kekik"], steps: ["Fırını 200°C'ye ısıtın.", "Sebzeleri iri doğrayıp yağ ve baharatla karıştırın.", "Tavukları tepsiye yerleştirip sebzeleri çevresine yayın.", "Tavuk iç sıcaklığı 74°C olana kadar yaklaşık 50 dakika pişirin."], tip: "Tavuğu fırına vermeden önce kurulamak derisinin daha iyi kızarmasını sağlar." },
      en: { title: "Tray-Baked Chicken & Vegetables", description: "A satisfying family meal of golden chicken, potatoes and peppers cooked on one tray.", category: "Main", cuisine: "Turkish", ingredients: ["6 chicken drumsticks", "3 potatoes", "2 red peppers", "2 tomatoes", "3 tbsp olive oil", "1 tsp oregano"], steps: ["Heat the oven to 200°C.", "Cut vegetables into large pieces and toss with oil and seasoning.", "Arrange chicken on the tray and spread vegetables around it.", "Roast for about 50 minutes, until chicken reaches 74°C internally."], tip: "Patting the chicken dry before seasoning helps the skin turn golden." }
    }
  },
  {
    slug: "zeytinyagli-barbunya", image: "/images/barbunya.jpg", prep: 20, cook: 40, servings: 6, difficulty: "Kolay", featured: false,
    copy: {
      tr: { title: "Zeytinyağlı Barbunya", description: "Havuç, patates ve zeytinyağıyla ağır ağır pişen klasik soğuk başlangıç.", category: "Zeytinyağlı", cuisine: "Türk", ingredients: ["500 g haşlanmış barbunya", "1 soğan", "1 havuç", "1 patates", "2 domates", "80 ml zeytinyağı"], steps: ["Soğanı zeytinyağında şeffaflaşana kadar çevirin.", "Küp doğranmış havuç ve patatesi ekleyin.", "Domates, barbunya ve 1 su bardağı sıcak su ekleyin.", "Sebzeler yumuşayana kadar kısık ateşte pişirip tencerede soğutun."], tip: "Bir gece dinlenen barbunya zeytinyağını ve aromaları daha iyi çeker." },
      en: { title: "Braised Borlotti Beans", description: "A classic Turkish olive-oil dish slowly cooked with carrot, potato and tomato.", category: "Olive Oil Dishes", cuisine: "Turkish", ingredients: ["500 g cooked borlotti beans", "1 onion", "1 carrot", "1 potato", "2 tomatoes", "80 ml olive oil"], steps: ["Soften the onion gently in olive oil.", "Add diced carrot and potato.", "Add tomatoes, beans and 1 cup hot water.", "Simmer until tender, then cool in the cooking pot."], tip: "The flavour improves after resting overnight in the refrigerator." }
    }
  },
  {
    slug: "imam-bayildi", image: "/images/imam-bayildi.jpg", prep: 25, cook: 50, servings: 4, difficulty: "Orta", featured: false,
    copy: {
      tr: { title: "İmam Bayıldı", description: "Karamelize soğan ve domatesle doldurulmuş, zeytinyağlı patlıcan klasiği.", category: "Zeytinyağlı", cuisine: "Türk", ingredients: ["4 küçük patlıcan", "3 soğan", "3 domates", "4 diş sarımsak", "100 ml zeytinyağı", "1 çay kaşığı şeker"], steps: ["Patlıcanları alacalı soyup tuzlu suda 20 dakika bekletin.", "Kurulayıp az yağda her yüzünü yumuşatın.", "Soğan, sarımsak ve domatesi ayrı tavada pişirin.", "Patlıcanları doldurup 180°C fırında 30 dakika pişirin."], tip: "Soğanı acele etmeden yumuşatmak dolgunun doğal tatlılığını ortaya çıkarır." },
      en: { title: "İmam Bayıldı", description: "A Turkish classic of aubergines filled with caramelised onion, garlic and tomato.", category: "Olive Oil Dishes", cuisine: "Turkish", ingredients: ["4 small aubergines", "3 onions", "3 tomatoes", "4 garlic cloves", "100 ml olive oil", "1 tsp sugar"], steps: ["Peel aubergines in stripes and soak in salted water for 20 minutes.", "Dry and soften each side in a little oil.", "Cook onion, garlic and tomato separately.", "Fill the aubergines and bake at 180°C for 30 minutes."], tip: "Slowly softening the onions develops the filling's natural sweetness." }
    }
  },
  {
    slug: "yayla-corbasi", image: "/images/yayla-soup.jpg", prep: 10, cook: 30, servings: 6, difficulty: "Orta", featured: false,
    copy: {
      tr: { title: "Yayla Çorbası", description: "Yoğurt, pirinç ve kuru nane ile hazırlanan ferah, ipeksi Anadolu çorbası.", category: "Çorba", cuisine: "Türk", ingredients: ["1/2 su bardağı pirinç", "1,5 su bardağı yoğurt", "1 yumurta sarısı", "1 yemek kaşığı un", "6 su bardağı su", "1 yemek kaşığı kuru nane"], steps: ["Pirinci suda yumuşayana kadar haşlayın.", "Yoğurt, yumurta sarısı ve unu pürüzsüz çırpın.", "Sıcak sudan azar azar ekleyerek terbiyeyi ılıştırın.", "Tencereye ekleyip kaynatmadan ısıtın; naneli yağla tamamlayın."], tip: "Yoğurdun kesilmemesi için terbiyeyi ılıştırın ve çorbayı harlı kaynatmayın." },
      en: { title: "Turkish Yogurt & Rice Soup", description: "A bright, silky Anatolian soup made with yogurt, rice and dried mint.", category: "Soup", cuisine: "Turkish", ingredients: ["1/2 cup rice", "1 1/2 cups yogurt", "1 egg yolk", "1 tbsp flour", "6 cups water", "1 tbsp dried mint"], steps: ["Cook rice in water until tender.", "Whisk yogurt, egg yolk and flour until smooth.", "Temper with ladles of hot cooking water.", "Stir into the pot without boiling and finish with mint butter."], tip: "Temper the yogurt mixture and avoid a hard boil to prevent curdling." }
    }
  },
  {
    slug: "domatesli-feslegenli-makarna", image: "/images/tomato-basil-pasta.jpg", prep: 10, cook: 20, servings: 4, difficulty: "Kolay", featured: false,
    copy: {
      tr: { title: "Domatesli Fesleğenli Makarna", description: "Sarımsak, domates ve taze fesleğenle 30 dakikada hazırlanan canlı bir makarna.", category: "Makarna", cuisine: "İtalyan", ingredients: ["400 g spagetti", "500 g rendelenmiş domates", "3 diş sarımsak", "3 yemek kaşığı zeytinyağı", "1 avuç fesleğen", "50 g parmesan"], steps: ["Makarnayı bol tuzlu suda diri kalacak şekilde haşlayın.", "Sarımsağı yağda kısa süre çevirip domatesi ekleyin.", "Sosu 12 dakika koyulaştırın.", "Makarna ve bir kepçe haşlama suyunu sosa ekleyip fesleğenle karıştırın."], tip: "Nişastalı makarna suyu sosun makarnaya parlak biçimde tutunmasını sağlar." },
      en: { title: "Tomato Basil Pasta", description: "A vibrant 30-minute pasta with garlic, ripe tomatoes and fresh basil.", category: "Pasta", cuisine: "Italian", ingredients: ["400 g spaghetti", "500 g grated tomatoes", "3 garlic cloves", "3 tbsp olive oil", "1 handful basil", "50 g parmesan"], steps: ["Cook pasta in well-salted water until al dente.", "Briefly cook garlic in oil and add tomatoes.", "Simmer the sauce for 12 minutes.", "Toss with pasta, a ladle of cooking water and fresh basil."], tip: "Starchy pasta water helps the sauce cling with a glossy finish." }
    }
  },
  {
    slug: "firinda-somon", image: "/images/lemon-baked-salmon.jpg", prep: 10, cook: 18, servings: 4, difficulty: "Kolay", featured: false,
    copy: {
      tr: { title: "Limonlu Fırın Somon", description: "Limon, sarımsak ve dereotuyla kurumadan pişen pratik somon fileto.", category: "Ana yemek", cuisine: "Akdeniz", ingredients: ["4 somon fileto", "1 limon", "2 diş sarımsak", "2 yemek kaşığı zeytinyağı", "1/2 demet dereotu", "1/2 çay kaşığı tuz"], steps: ["Fırını 190°C'ye ısıtın.", "Somonları yağ, sarımsak, limon kabuğu ve tuzla ovun.", "Yağlı kâğıt serili tepsiye dizin.", "Kalınlığa göre 14-18 dakika, içi yeni opaklaşana kadar pişirin."], tip: "Somonu tamamen sertleşmeden fırından alın; dinlenirken merkez sıcaklığı yükselir." },
      en: { title: "Lemon Baked Salmon", description: "Practical salmon fillets baked gently with lemon, garlic and dill.", category: "Main", cuisine: "Mediterranean", ingredients: ["4 salmon fillets", "1 lemon", "2 garlic cloves", "2 tbsp olive oil", "1/2 bunch dill", "1/2 tsp salt"], steps: ["Heat the oven to 190°C.", "Rub salmon with oil, garlic, lemon zest and salt.", "Arrange on a lined baking tray.", "Bake for 14-18 minutes, until the centre is just opaque."], tip: "Remove salmon before it feels firm; carryover heat finishes the centre." }
    }
  },
  {
    slug: "firin-sutlac", image: "/images/firin-sutlac.jpg", prep: 15, cook: 50, servings: 6, difficulty: "Orta", featured: false,
    copy: {
      tr: { title: "Fırın Sütlaç", description: "Üzeri benek benek kızarmış, içi kremsi geleneksel pirinç tatlısı.", category: "Tatlı", cuisine: "Türk", ingredients: ["1 litre süt", "1/2 su bardağı pirinç", "1 su bardağı şeker", "2 yemek kaşığı nişasta", "1 paket vanilya", "2 su bardağı su"], steps: ["Pirinci suyla tamamen yumuşayana kadar pişirin.", "Süt ve şekeri ekleyip 10 dakika kaynatın.", "Nişastayı soğuk suyla açıp tencereye karıştırın.", "Kaselere paylaştırıp su dolu tepside üstleri kızarana kadar fırınlayın."], tip: "Fırının yalnızca üst ızgarasını son dakikalarda kullanmak kontrollü kızarma sağlar." },
      en: { title: "Baked Turkish Rice Pudding", description: "Traditional creamy rice pudding with a beautifully blistered baked top.", category: "Dessert", cuisine: "Turkish", ingredients: ["1 litre milk", "1/2 cup rice", "1 cup sugar", "2 tbsp starch", "1 tsp vanilla", "2 cups water"], steps: ["Cook rice in water until completely tender.", "Add milk and sugar and simmer for 10 minutes.", "Mix starch with cold water and stir into the pot.", "Divide into bowls and bake in a water bath until browned on top."], tip: "Use the top grill only at the end for controlled, even browning." }
    }
  },
  {
    slug: "islak-kek", image: "/images/islak-kek.jpg", prep: 20, cook: 30, servings: 10, difficulty: "Kolay", featured: false,
    copy: {
      tr: { title: "Kakaolu Islak Kek", description: "Yoğun kakaolu sosu içine çeken, yumuşak ve nemli ev keki.", category: "Tatlı", cuisine: "Türk", ingredients: ["3 yumurta", "1 su bardağı şeker", "1 su bardağı süt", "3/4 su bardağı sıvı yağ", "3 yemek kaşığı kakao", "2 su bardağı un"], steps: ["Yumurta ve şekeri 4 dakika çırpın.", "Süt, yağ ve kakaoyu ekleyip karışımdan 1 su bardağı ayırın.", "Un ve kabartma tozunu katıp 175°C'de 30 dakika pişirin.", "Ilık keki dilimleyip ayırdığınız sosu üzerine dökün."], tip: "Kek ılık, sos oda sıcaklığında olursa sos dengeli biçimde emilir." },
      en: { title: "Turkish Chocolate Wet Cake", description: "A soft cocoa cake soaked with its own rich chocolate sauce.", category: "Dessert", cuisine: "Turkish", ingredients: ["3 eggs", "1 cup sugar", "1 cup milk", "3/4 cup neutral oil", "3 tbsp cocoa", "2 cups flour"], steps: ["Whisk eggs and sugar for 4 minutes.", "Add milk, oil and cocoa; reserve 1 cup of the mixture.", "Fold in flour and baking powder, then bake at 175°C for 30 minutes.", "Slice the warm cake and pour over the reserved sauce."], tip: "Warm cake and room-temperature sauce produce an even soak." }
    }
  },
  {
    slug: "muzlu-yulaf-pankek", image: "/images/banana-pancakes.jpg", prep: 10, cook: 12, servings: 2, difficulty: "Kolay", featured: false,
    copy: {
      tr: { title: "Muzlu Yulaf Pankek", description: "Rafine şekersiz, yumuşak dokulu ve hafta içi için hızlı pankekler.", category: "Kahvaltı", cuisine: "Modern", ingredients: ["1 olgun muz", "2 yumurta", "1 su bardağı yulaf ezmesi", "1/2 su bardağı süt", "1 çay kaşığı kabartma tozu", "1/2 çay kaşığı tarçın"], steps: ["Tüm malzemeleri blenderdan pürüzsüz geçirin.", "Karışımı 5 dakika dinlendirin.", "Yapışmaz tavayı orta-kısık ateşte ısıtın.", "Küçük kepçeler döküp her yüzünü 1-2 dakika pişirin."], tip: "Küçük pankekler yulaflı hamurda daha kolay çevrilir ve eşit pişer." },
      en: { title: "Banana Oat Pancakes", description: "Soft, naturally sweet pancakes made quickly without refined sugar.", category: "Breakfast", cuisine: "Modern", ingredients: ["1 ripe banana", "2 eggs", "1 cup rolled oats", "1/2 cup milk", "1 tsp baking powder", "1/2 tsp cinnamon"], steps: ["Blend all ingredients until smooth.", "Rest the batter for 5 minutes.", "Heat a non-stick pan over medium-low heat.", "Cook small ladlefuls for 1-2 minutes per side."], tip: "Smaller pancakes are easier to turn and cook more evenly with oat batter." }
    }
  },
  {
    slug: "humus", image: "/images/hummus.jpg", prep: 15, cook: 0, servings: 6, difficulty: "Kolay", featured: false,
    copy: {
      tr: { title: "Kremsi Humus", description: "Tahin, limon ve sarımsakla pürüzsüz kıvamlı klasik nohut ezmesi.", category: "Meze", cuisine: "Levant", ingredients: ["2 su bardağı haşlanmış nohut", "1/2 su bardağı tahin", "1 limonun suyu", "1 diş sarımsak", "1/2 çay kaşığı kimyon", "4 yemek kaşığı buzlu su"], steps: ["Nohut, tahin, limon ve sarımsağı robota alın.", "Pürüzsüzleşene kadar 2 dakika çekin.", "Makine çalışırken buzlu suyu azar azar ekleyin.", "Tuz ve kimyonla ayarlayıp zeytinyağıyla servis edin."], tip: "Buzlu su tahinin rengini açar ve humusa daha hafif bir doku verir." },
      en: { title: "Creamy Hummus", description: "Classic silky chickpea dip with tahini, lemon and garlic.", category: "Meze", cuisine: "Levantine", ingredients: ["2 cups cooked chickpeas", "1/2 cup tahini", "juice of 1 lemon", "1 garlic clove", "1/2 tsp cumin", "4 tbsp ice water"], steps: ["Add chickpeas, tahini, lemon and garlic to a processor.", "Blend for 2 minutes until smooth.", "Drizzle in ice water while the machine runs.", "Season with salt and cumin and serve with olive oil."], tip: "Ice water lightens the tahini and gives hummus an airier texture." }
    }
  }
];

export function getRecipe(slug: string) { return recipes.find((recipe) => recipe.slug === slug); }
export function localizeDemoRecipe(recipe: Recipe, locale: Locale): LocalizedRecipe {
  return { ...recipe, copy: recipe.copy[locale], difficulty: locale === "tr" ? recipe.difficulty : recipe.difficulty === "Kolay" ? "Easy" : "Medium" };
}
