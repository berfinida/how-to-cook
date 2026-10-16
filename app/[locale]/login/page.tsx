import type { Locale } from "@/i18n/routing";
import { signIn } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LoginPage({ params }: { params: Promise<{locale:Locale}> }) { const {locale}=await params; async function authenticate(formData: FormData) { "use server"; await signIn("credentials", { email:formData.get("email"), password:formData.get("password"), redirectTo:`/${locale}/admin/recipes/new` }); } return <main className="auth-card"><span className="eyebrow">How to Cook account</span><h1>{locale === "tr" ? "Tekrar hoş geldin" : "Welcome back"}</h1><p>{locale === "tr" ? "Tariflerini yönetmek için hesabına giriş yap." : "Sign in to manage your recipes."}</p><form className="form-grid" action={authenticate}><label>E-mail<input type="email" name="email" required autoComplete="email"/></label><label>{locale === "tr" ? "Şifre" : "Password"}<input type="password" name="password" required autoComplete="current-password"/></label><button className="button primary" type="submit">{locale === "tr" ? "Giriş yap" : "Sign in"}</button></form></main>; }
