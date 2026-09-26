import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { SiteLayoutShell } from "@/components/layout/site-layout-shell";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { siteConfig } from "@/config/site";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONP | Home",
  description: `${siteConfig.name} — ${siteConfig.description}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-primary selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteLayoutShell>{children}</SiteLayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
