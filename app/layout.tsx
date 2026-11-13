import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { person, summary } from "@/lib/content/profile";
import { ServiceWorkerRegistrar } from "@/components/chrome/service-worker-registrar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const description = `${person.headline}. ${summary.lead}`;

export const metadata: Metadata = {
  metadataBase: new URL(person.siteUrl),
  title: `${person.name} | ${person.headline}`,
  description,
  keywords: [
    "Abdul Aziz Setiawan",
    "Customer Experience",
    "CRM",
    "Systems Analyst",
    "AI Application Developer",
    "Skor Technologies",
    "Teman Kereta",
  ],
  authors: [{ name: person.name }],
  openGraph: {
    title: person.name,
    description,
    url: person.siteUrl,
    siteName: person.name,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: person.name,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.headline,
  worksFor: { "@type": "Organization", name: "Skor Technologies" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogor",
    addressCountry: "ID",
  },
  email: person.email,
  url: person.siteUrl,
  sameAs: [person.linkedin],
};

// Runs before first paint so the saved (or system) theme never flashes.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={poppins.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JavaScript the scroll reveals never run, so show everything as-is. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body id="top" className="min-h-screen bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServiceWorkerRegistrar />
        {children}
      </body>
    </html>
  );
}
