import type { Locale } from "@/i18n/routing";

const imageCredits = [
  ["barbunya.jpg", "Alpha from Melbourne, Australia", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Vegetarian_Dish_-_Long_Beans_and_Borlotti_Beans_in_Tomato_Sauce,_Tabbouli,_Potato_Salad_-_Pinarbasi_(2914368696).jpg"],
  ["imam-bayildi.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Imam_bay%C4%B1ld%C4%B1.jpg"],
  ["yayla-soup.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Yayla_soup_(Turkish_cuisine).jpg"],
  ["tomato-basil-pasta.jpg", "Abi Porter", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Tomato_and_basil_pasta_(4925750112).jpg"],
  ["lemon-baked-salmon.jpg", "MOs810", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Baked_salmon_with_dill_and_lemon.jpg"],
  ["firin-sutlac.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:F%C4%B1r%C4%B1n_s%C3%BCtla%C3%A7.jpg"],
  ["islak-kek.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Chocolate_cake_in_Ankara.jpg"],
  ["banana-pancakes.jpg", "sunny mama", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Banana_egg_pancakes_(17048779432).jpg"],
  ["hummus.jpg", "Paul Goyette", "CC BY-SA 2.0", "https://commons.wikimedia.org/wiki/File:Hummus_from_The_Nile.jpg"],
  ["turkish-kofte.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Turkish_k%C3%B6fte_and_fries.jpg"],
  ["mercimek-koftesi.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Mercimek_k%C3%B6ftesi.jpg"],
  ["kisir.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kisir_(small_portion).jpg"],
  ["kuru-fasulye.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Kuru_fasulye_(without_meat).jpg"],
  ["mucver.jpg", "Andy Li", "CC0", "https://commons.wikimedia.org/wiki/File:M%C3%BCcver_-_Etci_Kitchen_2025-09-22.jpg"],
  ["manti.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Turkish_mant%C4%B1_in_a_bowl.jpg"],
  ["cacik.jpg", "Chitrapa", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Turkish_Cac%C4%B1k_with_fresh_Dill_-_Close_Up.jpg"],
  ["sigara-boregi.jpg", "Garrett Ziegler", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Sigara_B%C3%B6rek.jpg"],
  ["revani.jpg", "E4024", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Revani_with_lemon_zest.jpg"],
  ["patates-salatasi.jpg", "Basak", "CC0", "https://commons.wikimedia.org/wiki/File:Patates_Salatas%C4%B1.jpg"],
] as const;

export default async function CreditsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isTurkish = locale === "tr";
  return <main><div className="page-hero"><div className="shell"><span className="eyebrow">How to Cook</span><h1>{isTurkish ? "Görsel kaynakları" : "Image credits"}</h1><p>{isTurkish ? "Tarif fotoğraflarında kullanılan açık lisanslı görseller ve atıf bilgileri." : "Openly licensed recipe photos used on the site, with attribution details."}</p></div></div><section className="shell section"><div className="credits-list">{imageCredits.map(([file, artist, license, source]) => <article className="credit-item" key={file}><strong>{file}</strong><span>{artist} · {license}</span><a href={source} target="_blank" rel="noreferrer">Wikimedia Commons</a></article>)}</div></section></main>;
}
