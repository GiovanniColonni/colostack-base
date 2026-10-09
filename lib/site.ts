/**
 * Single source of truth for everything shown on the landing page.
 * Edit here; the UI reads from this file.
 */
export const site = {
  name: "Colostack",
  domain: "colostack.dev",
  url: "https://colostack.dev",
  owner: "Giovanni Colonni",
  roles: ["Software Engineer", "AI Engineer", "DevOps"],
  badge: "Freelance",
  tagline: "Building things. Site coming soon.",
  copyrightYear: 2026,
  email: "giovanni@colostack.dev",
  phones: [
    { label: "FR", display: "+33 7 45 00 78 04", href: "tel:+33745007804" },
    { label: "IT", display: "+39 331 415 8926", href: "tel:+393314158926" },
  ],
} as const;
