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

const title = `${site.name} — ${site.owner} · ${site.roles.join(", ")}`;
const description = `${site.owner} is a freelance ${site.roles.join(", ")}. ${site.name} portfolio coming soon — get in touch at ${site.email}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.owner, url: site.url }],
  creator: site.owner,
  publisher: site.name,
  keywords: [
    site.name,
    site.owner,
    ...site.roles,
    "freelance software engineer",
    "freelance AI engineer",
    "freelance DevOps",
    "LLM",
    "cloud infrastructure",
    "France",
    "Italy",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "it_IT"],
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0B0D0B",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.owner,
      url: site.url,
      email: `mailto:${site.email}`,
      telephone: site.phones.map((p) => p.href.replace("tel:", "")),
      jobTitle: site.roles.join(" · "),
      image: `${site.url}/brand/colostack-icon-dark-512.png`,
      worksFor: { "@id": `${site.url}/#org` },
      knowsAbout: [...site.roles, "LLM applications", "Cloud infrastructure", "CI/CD"],
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/colostack-icon-dark-512.png`,
      email: site.email,
      founder: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#org` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
