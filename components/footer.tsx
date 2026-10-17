import { ChefHat } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function Footer() { const t = await getTranslations("footer"); return <footer><div className="shell footer-grid"><div><div className="brand light"><ChefHat size={20}/> HOW TO <em>COOK</em></div><p>{t("tagline")}</p></div><div className="footer-meta"><Link href="/credits">{t("credits")}</Link><p>© {new Date().getFullYear()} How to Cook. {t("rights")}</p></div></div></footer>; }
