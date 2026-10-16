import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"), title: { default: "How to Cook", template: "%s | How to Cook" }, description: "Güvenilir, ayrıntılı ve iki dilli yemek tarifleri." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
