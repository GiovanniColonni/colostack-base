import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — coming soon`,
  description: `${site.owner} · ${site.roles.join(" · ")} · ${site.badge}. Portfolio coming soon.`,
  openGraph: {
    title: `${site.name} — coming soon`,
    description: `${site.owner} · ${site.roles.join(" · ")}`,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/colostack-icon-email.png", width: 512, height: 512 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
