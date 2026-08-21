import { useEffect } from "react";
import { useLocation } from "wouter";
import Footer from "./Footer";
import Header from "./Header";
import { services } from "@/lib/haulage-data";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 100);
  }, [location]);
  usePageMetadata(location);
  const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "Haulage", description: "Professional dispatch support for owner-operators and fleets." };
  return <div className="min-h-screen overflow-x-hidden bg-[#f7f8f5] text-[#081525]"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /><Header /><main>{children}</main><Footer /></div>;
}

const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": { title: "Haulage | Dispatch support built around the road", description: "Haulage helps owner-operators and fleets organize dispatch, broker communication, load planning, and paperwork." },
  "/services": { title: "Truck Dispatch Services | Haulage", description: "Explore Haulage dispatching, rate negotiation, load planning, document management, billing support, and compliance support." },
  "/truck-types": { title: "Truck Types We Support | Haulage", description: "Dispatch support for Dry Van, Reefer, Flatbed, Step Deck, Hotshot, Box Truck, Power Only, and Conestoga equipment." },
  "/how-it-works": { title: "How Haulage Dispatch Works", description: "Learn how Haulage helps carriers establish a clear dispatch workflow from free setup to load coordination." },
  "/about": { title: "About Haulage", description: "Learn about Haulage and its modern, carrier-led approach to professional dispatch support." },
  "/drivers": { title: "Owner-Operator & Carrier Dispatch Support | Haulage", description: "Haulage provides dispatch support designed around owner-operators, carriers, and growing fleets." },
  "/resources": { title: "Trucking Dispatch Resources | Haulage", description: "Practical Haulage resources for dispatch planning, owner-operator workflow, documentation, and freight conversations." },
  "/faq": { title: "Haulage Dispatch FAQ", description: "Answers to common questions about Haulage dispatch support, equipment coverage, pricing, and getting started." },
  "/contact": { title: "Contact Haulage", description: "Start a conversation with Haulage about dispatching support for your owner-operator or fleet operation." },
};

function usePageMetadata(location: string) {
  useEffect(() => {
    const service = location.startsWith("/services/") ? services.find((item) => item.slug === location.split("/").pop()) : undefined;
    const metadata = routeMetadata[location] ?? (service ? { title: `${service.name} | Haulage`, description: service.description } : { title: "Haulage", description: "Professional dispatch support for owner-operators and fleets." });
    document.title = metadata.title;
    const setMeta = (selector: string, attribute: "name" | "property", key: string, value: string) => { let tag = document.head.querySelector<HTMLMetaElement>(selector); if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attribute, key); document.head.appendChild(tag); } tag.content = value; };
    setMeta('meta[name="description"]', "name", "description", metadata.description);
    setMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    setMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${window.location.origin}${location}`;
  }, [location]);
}
