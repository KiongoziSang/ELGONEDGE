import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WebsiteChatAssistant } from "@/components/WebsiteChatAssistant";
import { defaultSeoDescription, defaultSeoTitle, JsonLd, organizationJsonLd, seoKeywords, siteName, siteUrl, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSeoTitle,
    template: `%s | ${siteName}`
  },
  description: defaultSeoDescription,
  keywords: seoKeywords,
  applicationName: siteName,
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "1024x1024" }
    ],
    shortcut: [{ url: "/favicon.png", type: "image/png", sizes: "1024x1024" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "1024x1024" }]
  },
  openGraph: {
    title: siteName,
    description: defaultSeoDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/elgon-edge-consulting-logo.png",
        width: 2048,
        height: 669,
        alt: "Elgon Edge Consulting Limited logo"
      }
    ],
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    images: ["/elgon-edge-consulting-logo.png"]
  },
  alternates: {
    canonical: siteUrl
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <Navbar />
        {children}
        <Footer />
        <WebsiteChatAssistant />
      </body>
    </html>
  );
}
