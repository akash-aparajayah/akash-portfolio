import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PointerGlow from "@/components/PointerGlow";
import ScrollProgress from "@/components/ScrollProgress";
import CursorTrail from "@/components/CursorTrail";
import { site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.intro,
    type: "website",
    url: site.url,
    locale: "en_IN",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.intro,
  },
  icons: {
    icon: "/icon",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e6eaf4" },
    { media: "(prefers-color-scheme: dark)", color: "#05070e" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${publicSans.variable}`}
    >
      <body suppressHydrationWarning>
        <Script id="strip-cursor-refs" strategy="beforeInteractive">
          {`(function(){function s(){document.querySelectorAll("[data-cursor-ref]").forEach(function(n){n.removeAttribute("data-cursor-ref")})}s();try{new MutationObserver(s).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["data-cursor-ref"]})}catch(e){}})();`}
        </Script>
        <div aria-hidden className="bg-orbs" />
        <div aria-hidden className="bg-grid" />
        <div aria-hidden className="bg-grain" />
        <PointerGlow />
        <CursorTrail />
        <ScrollProgress />
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
