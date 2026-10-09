import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import CopyBlock from "@/components/CopyBlock";

export const metadata: Metadata = {
  title: "Brand assets",
  description: `Official ${site.name} logo files, colours and an embeddable "Built by ${site.name}" badge.`,
  alternates: { canonical: "/brand" },
};

const assets = [
  { file: "colostack-icon-dark.svg", label: "Icon · dark · SVG" },
  { file: "colostack-icon-dark-1024.png", label: "Icon · dark · PNG 1024" },
  { file: "colostack-icon-dark-512.png", label: "Icon · dark · PNG 512" },
  { file: "colostack-icon-light.svg", label: "Icon · light · SVG" },
  { file: "colostack-icon-light-512.png", label: "Icon · light · PNG 512" },
  { file: "colostack-icon-transparent.svg", label: "Icon · transparent · SVG" },
  { file: "colostack-icon-transparent-512.png", label: "Icon · transparent · PNG 512" },
  { file: "badge-built-by-colostack.svg", label: "Badge · Built by Colostack · SVG" },
  { file: "colostack-og-source.svg", label: "Social card · source SVG" },
];

const colors = [
  { name: "Brand orange", hex: "#F2771A" },
  { name: "Ink", hex: "#0B0D0B" },
  { name: "Paper", hex: "#F2F5EE" },
];

const badgeHtml = `<a href="${site.url}" title="${site.name} — ${site.owner}" target="_blank" rel="noopener">
  <img src="${site.url}/brand/badge-built-by-colostack.svg" alt="Built by ${site.name}" width="200" height="36" />
</a>`;

const badgeMd = `[![Built by ${site.name}](${site.url}/brand/badge-built-by-colostack.svg)](${site.url})`;

export default function BrandPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 font-mono sm:px-8">
      <Link href="/" className="text-xs text-paper/50 transition-colors hover:text-brand">
        <span className="text-brand">~</span>/{site.domain}
      </Link>

      <h1 className="mt-6 text-3xl font-bold uppercase tracking-tight">Brand assets</h1>
      <p className="mt-3 max-w-xl text-sm text-paper/60">
        Official {site.name} mark, colours and an embeddable badge. Use them to reference or
        link to {site.domain}; please don&apos;t alter the proportions or recolour the mark.
      </p>

      {/* Preview */}
      <section className="mt-10 grid grid-cols-3 gap-3">
        {[
          { src: "/brand/colostack-icon-dark.svg", bg: "bg-ink" },
          { src: "/brand/colostack-icon-light.svg", bg: "bg-paper" },
          { src: "/brand/colostack-icon-transparent.svg", bg: "bg-[#2a2d2a]" },
        ].map((p) => (
          <div
            key={p.src}
            className={`flex aspect-square items-center justify-center rounded-sm border border-paper/15 ${p.bg}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" className="h-3/4 w-3/4" />
          </div>
        ))}
      </section>

      {/* Downloads */}
      <section className="mt-10">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-brand">Download</h2>
        <ul className="mt-3 divide-y divide-paper/10 border-y border-paper/10 text-sm">
          {assets.map((a) => (
            <li key={a.file} className="flex items-center justify-between py-2.5">
              <span className="text-paper/80">{a.label}</span>
              <a
                href={`/brand/${a.file}`}
                download
                className="text-paper/50 transition-colors hover:text-brand"
              >
                {a.file} ↓
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Colours */}
      <section className="mt-10">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-brand">Colours</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {colors.map((c) => (
            <div key={c.hex} className="rounded-sm border border-paper/15 p-3 text-sm">
              <div className="h-12 w-full rounded-sm border border-paper/10" style={{ background: c.hex }} />
              <div className="mt-2 text-paper/80">{c.name}</div>
              <div className="text-paper/50">{c.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Badge */}
      <section className="mt-10">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-brand">Link back</h2>
        <p className="mt-2 text-sm text-paper/60">
          Built something with me? Drop this badge in your README or footer.
        </p>
        <a href={site.url} className="mt-4 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/badge-built-by-colostack.svg"
            alt={`Built by ${site.name}`}
            width={200}
            height={36}
          />
        </a>
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4">
          <CopyBlock label="HTML" code={badgeHtml} />
          <CopyBlock label="Markdown" code={badgeMd} />
        </div>
      </section>

      <footer className="mt-14 text-[10px] uppercase tracking-[0.2em] text-paper/35">
        © {site.copyrightYear} {site.name} · {site.owner}
      </footer>
    </main>
  );
}
