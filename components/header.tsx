import { ChefHat, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";

export async function Header() {
  const t = await getTranslations("nav");
  return <header className="site-header"><div className="shell header-inner"><Link href="/" className="brand"><span className="brand-mark"><ChefHat size={20}/></span><span>HOW TO <em>COOK</em></span></Link><nav aria-label="Main navigation"><Link href="/recipes">{t("recipes")}</Link><a href="#featured">{t("popular")}</a><a href="#featured">{t("new")}</a></nav><div className="header-actions"><Link href="/recipes" aria-label="Search"><Search size={19}/></Link><LanguageSwitcher/><Link href="/login" className="login-link">{t("login")}</Link></div></div></header>;
}
