import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";
import { SERVICE_NAMES, TRUCK_TYPES } from "@/lib/haulage-data";

export default function Footer() {
  const [, navigate] = useLocation();

  const handleNavigate = (href: string) => {
    if (typeof window === "undefined") return;

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    navigate(href);
  };

  return (
    <footer className="border-t border-white/10 bg-[#06101d] text-white">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#d8ff40] font-display text-sm font-black text-[#06101d]">H</span>
              <span className="font-display text-lg font-bold tracking-[.12em]">HAULAGE</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Dispatch support for owner-operators and fleets that want more time for the road and a more organized operating workflow.
            </p>
            <Link
              href="/#lead-form"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate("/#lead-form");
              }}
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#d8ff40] hover:text-[#ecff85]"
            >
              Start your free setup <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <FooterColumn
            title="Company"
            links={[
              ["About", "/about"],
              ["Contact", "mailto:?subject=Haulage%20Dispatch%20Inquiry&body=Hi%20Haulage%2C%0A%0AI%27d%20like%20to%20learn%20more%20about%20your%20dispatch%20support."],
              ["Drivers", "/drivers"],
              ["How It Works", "/how-it-works"],
              ["FAQ", "/faq"],
            ]}
          />
          <FooterColumn
            title="Services"
            links={SERVICE_NAMES.map((name) => [name, `/services/${name.toLowerCase().replace(/ /g, "-")}`])}
          />
          <FooterColumn title="Equipment" links={TRUCK_TYPES.map((name) => [name, "/truck-types"])} />
        </div>

        <div className="mt-16 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />Nationwide service scope</span>
            <span className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5" />Contact details available on request</span>
          </div>

          <div className="flex gap-5">
            <Link href="/privacy-policy" onClick={(event) => { event.preventDefault(); handleNavigate("/privacy-policy"); }} className="hover:text-white">Privacy</Link>
            <Link href="/terms-of-service" onClick={(event) => { event.preventDefault(); handleNavigate("/terms-of-service"); }} className="hover:text-white">Terms</Link>
            <Link href="/cookie-policy" onClick={(event) => { event.preventDefault(); handleNavigate("/cookie-policy"); }} className="hover:text-white">Cookies</Link>
          </div>
        </div>

        <p className="mt-5 text-xs text-slate-600">© {new Date().getFullYear()} Haulage Dispatch</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  const [, navigate] = useLocation();

  const handleNavigate = (href: string) => {
    if (typeof window === "undefined") return;

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    navigate(href);
  };

  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[.16em] text-slate-300">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {links.map(([label, href]) => {
          const isExternalLink = href.startsWith("mailto:") || href.startsWith("http://") || href.startsWith("https://");

          return (
            <li key={label}>
              {isExternalLink ? (
                <a href={href} className="text-sm text-slate-500 transition hover:text-[#d8ff40]">
                  {label}
                </a>
              ) : (
                <Link
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(href);
                  }}
                  className="text-sm text-slate-500 transition hover:text-[#d8ff40]"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
