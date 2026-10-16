import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function generateStaticParams() { return routing.locales.map((locale) => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) { const { locale } = await params; if (!hasLocale(routing.locales, locale)) notFound(); const messages = await getMessages(); return <html lang={locale} data-scroll-behavior="smooth"><body><NextIntlClientProvider messages={messages}><Header/>{children}<Footer/></NextIntlClientProvider></body></html>; }
