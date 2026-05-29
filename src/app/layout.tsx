import type { Metadata } from "next";
import { Chakra_Petch, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OEM Part Manager | Internal Technical Database",
  description: "High-performance internal OEM parts catalog, JSON importer, and secure API control center.",
  applicationName: "OEM Part Manager",
  authors: [{ name: "Monster-ZeroX" }],
  generator: "Next.js",
  keywords: ["OEM", "Part Manager", "Automotive Parts", "Technical Database"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "OEM Part Manager | Internal Technical Database",
    description: "High-performance internal OEM parts catalog, JSON importer, and secure API control center.",
    type: "website",
    locale: "en_US",
    siteName: "OEM Part Manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "OEM Part Manager | Internal Technical Database",
    description: "High-performance internal OEM parts catalog, JSON importer, and secure API control center.",
  },
};

export const viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${sora.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-black text-zinc-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-400">
        {children}
      </body>
    </html>
  );
}
