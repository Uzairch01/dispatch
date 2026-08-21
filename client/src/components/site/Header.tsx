import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Truck Types", href: "/truck-types" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 18);
    listener();
    window.addEventListener("scroll", listener, { passive: true });
    return () => window.removeEventListener("scroll", listener);
  }, []);

  const goToSetup = () => {
    setOpen(false);
    if (window.location.pathname === "/") {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/#lead-form");
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-[#07111f]/82 py-3 backdrop-blur-xl" : "py-5"}`}>
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Haulage home">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-[#d8ff40] font-display text-sm font-black text-[#06101d] shadow-[0_0_28px_rgba(216,255,64,.25)]">H</span>
          <span className="font-display text-lg font-bold tracking-[0.12em] text-white sm:text-xl">HAULAGE</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300 transition hover:text-[#d8ff40]">{item.label}</Link>)}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/contact"><Button variant="ghost" size="sm" className="h-10 gap-2 rounded-full border border-white/15 px-4 text-xs font-bold uppercase tracking-[.12em] text-white hover:bg-white/10 hover:text-white"><Phone className="h-3.5 w-3.5" />Call Now</Button></Link>
          <Button onClick={goToSetup} size="sm" className="h-10 rounded-full bg-[#d8ff40] px-5 text-xs font-black uppercase tracking-[.12em] text-[#06101d] hover:bg-[#ecff85]">Get Free Setup</Button>
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {open && <div className="container mt-3 lg:hidden"><div className="rounded-2xl border border-white/10 bg-[#0a1728]/98 p-5 shadow-2xl backdrop-blur-xl"><nav className="grid gap-1" aria-label="Mobile navigation">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/5">{item.label}</Link>)}</nav><div className="mt-4 grid grid-cols-2 gap-2"><Link href="/contact" onClick={() => setOpen(false)}><Button variant="outline" className="w-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"><Phone className="mr-2 h-4 w-4" />Call Now</Button></Link><Button onClick={goToSetup} className="bg-[#d8ff40] font-bold text-[#06101d] hover:bg-[#ecff85]">Free Setup</Button></div></div></div>}
    </header>
  );
}
