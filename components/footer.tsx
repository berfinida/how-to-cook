import { ChefHat } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Footer() { const t = await getTranslations("footer"); return <footer><div className="shell footer-grid"><div><div className="brand light"><ChefHat size={20}/> HOW TO <em>COOK</em></div><p>{t("tagline")}</p></div><p>© {new Date().getFullYear()} How to Cook. {t("rights")}</p></div></footer>; }
