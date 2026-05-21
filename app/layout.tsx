import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elgonedge.com"),
  title: {
    default: "Elgon Edge Consulting Limited | Data, AI and Digital Solutions",
    template: "%s | Elgon Edge Consulting Limited"
  },
  description:
    "Premium data, AI, automation, governance, and digital transformation consulting from strategy to implementation.",
  keywords: [
    "Elgon Edge Consulting Limited",
    "data consulting",
    "AI governance",
    "digital transformation",
    "business intelligence",
    "intelligent automation",
    "ElgonOS"
  ],
  applicationName: "Elgon Edge Consulting Limited",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "1024x1024" }
    ],
    shortcut: [{ url: "/favicon.png", type: "image/png", sizes: "1024x1024" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "1024x1024" }]
  },
  openGraph: {
    title: "Elgon Edge Consulting Limited",
    description:
      "Premium data, AI, automation, governance, and digital platform consulting from strategy to implementation.",
    url: "https://www.elgonedge.com",
    siteName: "Elgon Edge Consulting Limited",
    images: [
      {
        url: "/elgon-edge-consulting-logo.png",
        width: 2048,
        height: 669,
        alt: "Elgon Edge Consulting Limited"
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "/"
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
