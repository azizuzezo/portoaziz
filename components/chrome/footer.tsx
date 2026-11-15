"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { person } from "@/lib/content/profile";
import { navLinks } from "@/components/chrome/navbar";

function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? "--:--"} WIB</span>;
}

// Shared on every page. The three-colour line is the route-map legend, closing the page like a terminus.
export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-paper/85 backdrop-blur-[2px]">
      <div aria-hidden className="flex h-1.5">
        <span className="flex-1 bg-l-navy" />
        <span className="flex-1 bg-l-steel" />
        <span className="flex-1 bg-l-green" />
      </div>
      <div className="shell grid grid-cols-2 gap-10 py-14 text-sm md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <p className="text-2xl font-semibold tracking-tight">
            {person.name}{" "}
            <span lang="zh-Hans" className="font-medium text-muted">
              {person.chineseName}
            </span>
          </p>
          <p className="mt-2 max-w-xs text-muted">{person.focus}.</p>
          <p className="mt-4 text-muted">
            Bogor, Indonesia · <LocalTime />
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-semibold">Pages</p>
          <ul className="mt-3 space-y-1.5 text-muted">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2">
          <p className="font-semibold">Elsewhere</p>
          <ul className="mt-3 space-y-1.5 text-muted">
            <li>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${person.email}`} className="hover:text-ink">
                Email
              </a>
            </li>
            <li>
              <a href={person.cvUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-start md:col-span-2 md:justify-end">
          <a href="#top" className="group inline-flex min-h-11 items-center gap-2 font-semibold">
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-transform group-hover:-translate-y-1">
              <ArrowUp className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </div>
      <p className="shell pb-8 text-xs text-muted">
        Original design by{" "}
        <a href="https://aulianza.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-ink hover:decoration-accent">
          aulianza.com
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        , customized and built by Aziz using AI-assisted development.
      </p>
    </footer>
  );
}
