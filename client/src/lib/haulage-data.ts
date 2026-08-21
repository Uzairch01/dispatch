import {
  BadgeCheck,
  ClipboardCheck,
  FileText,
  Handshake,
  MapPinned,
  Route,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

export const SERVICE_NAMES = [
  "Truck Dispatching",
  "Rate Negotiation",
  "Load Planning",
  "Document Management",
  "Billing Support",
  "Compliance Support",
] as const;

export const TRUCK_TYPES = [
  "Dry Van",
  "Reefer",
  "Flatbed",
  "Step Deck",
  "Hotshot",
  "Box Truck",
  "Power Only",
  "Conestoga",
] as const;

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Follow-up",
  "Converted",
  "Not Qualified",
  "Closed",
] as const;

export type ServiceName = (typeof SERVICE_NAMES)[number];
export type TruckType = (typeof TRUCK_TYPES)[number];

export const services = [
  {
    name: "Truck Dispatching",
    slug: "truck-dispatching",
    icon: Route,
    eyebrow: "THE CORE WORKFLOW",
    description: "A dependable dispatch workflow built around your equipment, preferred lanes, and operating schedule.",
    benefits: ["Load sourcing and booking", "Broker communication", "Pickup and delivery coordination"],
  },
  {
    name: "Rate Negotiation",
    slug: "rate-negotiation",
    icon: Handshake,
    eyebrow: "THE RATE CONVERSATION",
    description: "More structured broker conversations, supported by market context and the details of the load.",
    benefits: ["Market-rate context", "Rate confirmation review", "Accessorial documentation support"],
  },
  {
    name: "Load Planning",
    slug: "load-planning",
    icon: MapPinned,
    eyebrow: "THE NEXT MOVE",
    description: "Coordinate lanes and timing with fewer moving parts left for you to manage on the road.",
    benefits: ["Lane planning", "Deadhead awareness", "Multi-load coordination"],
  },
  {
    name: "Document Management",
    slug: "document-management",
    icon: FileText,
    eyebrow: "THE PAPER TRAIL",
    description: "Keep rate confirmations, BOLs, PODs, and supporting documents more organized from pickup through delivery.",
    benefits: ["Rate confirmations", "BOL and POD tracking", "Invoice-ready documentation"],
  },
  {
    name: "Billing Support",
    slug: "billing-support",
    icon: WalletCards,
    eyebrow: "THE BACK OFFICE",
    description: "Help organize the information your business needs for invoices, detention, and lumper documentation.",
    benefits: ["Document organization", "Invoice preparation support", "Accessorial documentation"],
  },
  {
    name: "Compliance Support",
    slug: "compliance-support",
    icon: ShieldCheck,
    eyebrow: "THE DETAILS",
    description: "Practical organization support for carrier paperwork and recurring compliance-related reminders.",
    benefits: ["Carrier paperwork", "Document organization", "Reminder workflows"],
  },
] as const;

export const truckTypes = [
  { name: "Dry Van", freight: "General consumer goods and boxed freight", benefit: "Keep common lanes and shipment details organized around your dry-van operation." },
  { name: "Reefer", freight: "Temperature-sensitive and perishable freight", benefit: "Coordinate timing-sensitive details with a dispatch workflow tailored to reefer equipment." },
  { name: "Flatbed", freight: "Construction materials, machinery, and open-deck freight", benefit: "Plan around specialized pickup requirements and flatbed load considerations." },
  { name: "Step Deck", freight: "Tall or specialized equipment", benefit: "Support freight searches that account for the capabilities of step-deck equipment." },
  { name: "Hotshot", freight: "Expedited and smaller time-sensitive loads", benefit: "Maintain a clear view of lane preferences and fast-moving opportunities." },
  { name: "Box Truck", freight: "Local and regional commercial deliveries", benefit: "Organize dispatch needs around the pace and constraints of box-truck work." },
  { name: "Power Only", freight: "Trailer moves and drop-and-hook opportunities", benefit: "Coordinate trailer, appointment, and route details in one working flow." },
  { name: "Conestoga", freight: "Weather-protected open-deck freight", benefit: "Match planning conversations to the flexibility of a Conestoga setup." },
] as const;

export const faqs = [
  { question: "What is truck dispatching?", answer: "Truck dispatching helps carriers coordinate load searches, booking conversations, schedules, broker communication, and related paperwork. The exact scope is defined in your service agreement." },
  { question: "Who does Haulage support?", answer: "Haulage is designed for owner-operators, carriers, and growing fleets looking for a more organized dispatch workflow." },
  { question: "Do I choose which loads to accept?", answer: "You retain control of the loads you accept. Dispatch support is intended to make the information and coordination easier, not to replace your business decisions." },
  { question: "What equipment do you support?", answer: "Haulage supports Dry Van, Reefer, Flatbed, Step Deck, Hotshot, Box Truck, Power Only, and Conestoga operations." },
  { question: "How does pricing work?", answer: "Pricing is discussed based on the service scope and agreed terms. Request a conversation for a clear, written explanation before you begin." },
  { question: "How do I get started?", answer: "Use the free setup form to share your operation details. Haulage can then explain the next steps and whether the service is a fit." },
] as const;

export const differentiators = [
  { icon: BadgeCheck, title: "A consistent working relationship", description: "Build your dispatch process around clear handoffs, recurring preferences, and direct communication." },
  { icon: ClipboardCheck, title: "Carrier-led decisions", description: "You stay in control of the freight decisions that affect your truck, lane, and schedule." },
  { icon: Route, title: "More visible planning", description: "Bring load details, lane preferences, and timing considerations into a more organized daily workflow." },
  { icon: FileText, title: "A clearer paper trail", description: "Keep the operational documentation needed for dispatch conversations easier to track." },
] as const;
