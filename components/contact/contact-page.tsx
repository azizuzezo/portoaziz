"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content/profile";
import { GridBackdrop } from "@/components/motion/grid-backdrop";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
// Decorative barcode widths (1-4 px), fixed so server and client render the same.
const BARS = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1, 4, 1, 2, 3, 1, 2, 1, 4, 1, 3, 1, 2, 2, 1, 3, 1, 4, 2, 1, 1, 3, 2, 1, 4, 1, 2];
// Why someone is writing. Each one becomes the start of the email subject.
const PURPOSES = [
  { id: "hire", label: "Hire me (full-time role)", subject: "Job opportunity" },
  { id: "services", label: "Use my services", subject: "Project enquiry" },
  { id: "question", label: "Ask a question", subject: "Question" },
  { id: "collab", label: "Collaborate", subject: "Collaboration" },
  { id: "other", label: "Something else", subject: "Hello" },
] as const;
type PurposeId = (typeof PURPOSES)[number]["id"];

function useWib() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return now ?? "--:--";
}

/**
 * Contact page. Left: a short message form that hands off to the visitor's email app (no
 * server, so nothing is stored). Right: a Commuter Line ticket that fills in as they type and
 * gets punched when they send. The ticket stub holds the address, LinkedIn and CV.
 */
export function ContactPageBody() {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState<PurposeId>("hire");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const time = useWib();
  const ticketRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [cut, setCut] = useState(320);
  useEffect(() => {
    const top = topRef.current;
    if (!top) return;
    const measure = () => setCut(top.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(top);
    return () => ro.disconnect();
  }, []);

  const p = PURPOSES.find((x) => x.id === purpose)!;
  const subject = [p.subject, org.trim(), name.trim() && `from ${name.trim()}`].filter(Boolean).join(", ");
  const body = [message.trim(), "", name.trim(), org.trim()].filter((l, i) => i < 2 || l).join("\n").trim();
  const to = person.email;
  const q = (s: string) => encodeURIComponent(s);
  const mailto = `mailto:${to}?subject=${q(subject)}&body=${q(body)}`;
  // Same compose links as the CS Portal's fee waiver dialog. Zoho opens its composer from a
  // mailto: URL (comp.do?ct=); it doesn't always carry every field, so the message is also copied.
  const targets = [
    { id: "gmail", label: "Gmail", href: `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${q(to)}&su=${q(subject)}&body=${q(body)}`, web: true, copyFirst: false },
    { id: "outlook", label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${q(to)}&subject=${q(subject)}&body=${q(body)}`, web: true, copyFirst: false },
    { id: "zoho", label: "Zoho Mail", href: `https://mail.zoho.com/zm/comp.do?ct=${q(mailto)}`, web: true, copyFirst: true },
    { id: "app", label: "Email app", href: mailto, web: false, copyFirst: false },
  ];

  const go = async (e: React.MouseEvent, t: (typeof targets)[number]) => {
    if (!message.trim()) {
      e.preventDefault();
      setError(true);
      document.getElementById("c-msg")?.focus();
      return;
    }
    setError(false);
    if (t.copyFirst) {
      try {
        await navigator.clipboard.writeText(body);
      } catch {
        // clipboard blocked: the note below still tells them what to do
      }
    }
    setSent(t.id);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
    setTimeout(() => setCopy("idle"), 2500);
  };

  const field =
    "w-full rounded-2xl border border-on-board/15 bg-paper px-4 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <section className="relative isolate overflow-hidden bg-board/80 text-on-board">
      <GridBackdrop />
      <div className="shell grid grid-cols-1 gap-14 pt-36 pb-24 md:pt-44 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="display text-[clamp(3rem,8vw,7rem)]"
          >
            Write to me<span className="text-accent">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-6 max-w-xl text-xl leading-relaxed text-on-board/75"
          >
            If your customers keep raising the same problem, I&apos;d like to help fix it at the source.
          </motion.p>

          <motion.form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-10 max-w-2xl space-y-6"
          >
            <fieldset>
              <legend className="text-sm font-semibold">I&apos;m writing to</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {PURPOSES.map((x) => (
                  <label
                    key={x.id}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent",
                      purpose === x.id ? "border-accent bg-accent text-accent-ink" : "border-on-board/15 bg-paper text-ink hover:border-accent"
                    )}
                  >
                    <input type="radio" name="purpose" value={x.id} checked={purpose === x.id} onChange={() => setPurpose(x.id)} className="sr-only" />
                    {x.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-sm font-semibold">
                  Your name <span className="font-normal text-on-board/60">(optional)</span>
                </label>
                <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={cn(field, "mt-2")} />
              </div>
              <div>
                <label htmlFor="c-org" className="text-sm font-semibold">
                  {purpose === "hire" ? "Company and role" : "Company or project"} <span className="font-normal text-on-board/60">(optional)</span>
                </label>
                <input id="c-org" value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" className={cn(field, "mt-2")} />
              </div>
            </div>

            <div>
              <label htmlFor="c-msg" className="text-sm font-semibold">
                Message
              </label>
              <textarea
                id="c-msg"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError(false);
                }}
                aria-invalid={error}
                aria-describedby={error ? "c-msg-error" : undefined}
                className={cn(field, "mt-2 resize-y", error && "border-red-600")}
              />
              {error && (
                <p id="c-msg-error" className="mt-2 text-sm font-medium text-red-700 dark:text-red-400">
                  Write a line or two first, so I know where to start.
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold">Send it with</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {targets.map((t, k) => (
                  <a
                    key={t.id}
                    href={t.href}
                    onClick={(e) => go(e, t)}
                    {...(t.web ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-semibold transition-transform hover:-translate-y-0.5",
                      k === 0 ? "bg-accent text-accent-ink" : "border border-on-board/15 bg-paper text-ink hover:border-accent"
                    )}
                  >
                    {t.label}
                    {t.web && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ))}
              </div>
              <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-on-board/70">
                {sent === "zoho" &&
                  "Zoho Mail opened in a new tab. Your message is also on your clipboard, in case the body comes up empty."}
                {sent && sent !== "zoho" && `A new email to ${person.email} should be open with your message filled in.`}
              </p>
            </div>
          </motion.form>
        </div>

        {/* The ticket */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ type: "spring", stiffness: 70, damping: 13, delay: 0.35 }}
          className="lg:col-span-5 lg:pt-6"
        >
          {/* One piece of paper: the notches are cut out of the ticket itself at the height of the
              tear line (--cut, measured), so the halves can't drift apart when it tilts. */}
          <div
            ref={ticketRef}
            className="relative mx-auto max-w-md overflow-hidden rounded-[1.75rem] bg-white text-[#2c3a55] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)]"
            style={{
              ["--cut" as string]: `${cut}px`,
              WebkitMask:
                "radial-gradient(circle 16px at 0 var(--cut), #0000 97%, #000) left / 51% 100% no-repeat, radial-gradient(circle 16px at 100% var(--cut), #0000 97%, #000) right / 51% 100% no-repeat",
              mask: "radial-gradient(circle 16px at 0 var(--cut), #0000 97%, #000) left / 51% 100% no-repeat, radial-gradient(circle 16px at 100% var(--cut), #0000 97%, #000) right / 51% 100% no-repeat",
            }}
          >
            <div ref={topRef}>
              <div className="flex items-center justify-between bg-[#1f5fd6] px-7 py-4 text-white">
                <span className="text-xs font-bold tracking-[0.16em]">ONE-WAY TICKET</span>
                <span className="text-xs font-semibold tabular-nums text-white/85">Departs {time} WIB</span>
              </div>
              <div className="px-7 pt-6 pb-7">
                <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
                  <div>
                    <p className="text-xs text-zinc-500">From</p>
                    <p className="mt-1 text-base leading-snug font-semibold">A problem that keeps coming back</p>
                  </div>
                  {/* Route: origin ring, a small train, destination dot. */}
                  <span aria-hidden className="mt-6 flex items-center gap-1 text-[#1f5fd6]">
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-current" />
                    <span className="h-0.5 w-4 bg-current" />
                    <span className="flex h-4 w-7 items-center justify-center gap-0.5 rounded-[5px] bg-current">
                      <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />
                      <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />
                    </span>
                    <span className="h-0.5 w-4 bg-current" />
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">To</p>
                    <p className="mt-1 text-base leading-snug font-semibold">Fixed at the source</p>
                  </div>
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 rounded-2xl bg-zinc-50 p-4 text-sm">
                  <div className="min-w-0">
                    <dt className="text-xs text-zinc-500">Passenger</dt>
                    <dd className="mt-0.5 truncate font-semibold">{name.trim() || "You"}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs text-zinc-500">Purpose</dt>
                    <dd className="mt-0.5 font-semibold">{p.label}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs text-zinc-500">Conductor</dt>
                    <dd className="mt-0.5 font-semibold">{person.name}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs text-zinc-500">Based in</dt>
                    <dd className="mt-0.5 font-semibold">Bogor, Indonesia</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Tear line, sitting exactly on the notches. */}
            <div aria-hidden className="mx-7 border-t-2 border-dashed border-zinc-300" />

            <div className="relative px-7 pt-6 pb-7">
              <p className="text-xs text-zinc-500">Email</p>
              <a href={`mailto:${person.email}`} className="mt-1 block text-lg font-semibold break-all underline decoration-zinc-300 underline-offset-4 hover:decoration-[#1f5fd6]">
                {person.email}
              </a>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="min-h-11 rounded-full border border-zinc-300 px-4 text-sm font-semibold transition-colors hover:border-[#2c3a55]"
                >
                  Copy address
                </button>
                <span role="status" aria-live="polite" className="text-sm text-zinc-600">
                  {copy === "copied" && "Copied."}
                  {copy === "failed" && "Couldn't copy, select it above."}
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-[#1f5fd6] text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a
                  href={person.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-full border border-zinc-300 text-sm font-semibold transition-colors hover:border-[#2c3a55]"
                >
                  CV (PDF)
                </a>
              </div>
              {/* Decorative barcode at the foot of the stub. */}
              <div aria-hidden className="mt-6 flex h-8 items-stretch justify-center gap-[2px] opacity-80">
                {BARS.map((w, k) => (
                  <span key={k} className="bg-[#2c3a55]" style={{ width: w }} />
                ))}
              </div>

              <AnimatePresence>
                {sent !== null && (
                  <motion.span
                    aria-hidden
                    initial={{ scale: 2.2, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: -14 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="absolute top-2 right-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#12804a] bg-white/80 text-center text-xs leading-tight font-bold tracking-wider text-[#12804a]"
                  >
                    PUNCHED
                    <br />
                    {time}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
