import { Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";

export default function ContactForm() {
  const [message, setMessage] = useState<string | null>(null);
  const mutation = trpc.haulage.contact.submit.useMutation({ onSuccess: () => setMessage("Thanks — we received your message and will follow up."), onError: () => setMessage("We could not send your message. Please review the form and try again.") });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutation.mutate({ name: String(data.get("Name") ?? ""), company: String(data.get("Company") ?? "") || undefined, email: String(data.get("Email") ?? ""), phone: String(data.get("Phone") ?? "") || undefined, subject: String(data.get("Subject") ?? ""), message: String(data.get("Message") ?? "") });
  };
  if (message) return <div className="grid min-h-[340px] place-items-center rounded-2xl border border-[#d8ff40]/30 bg-[#0d2030] p-8 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#d8ff40] text-[#06101d]"><Send className="h-5 w-5" /></span><h3 className="mt-5 font-display text-2xl font-bold text-white">{message}</h3><Button onClick={() => setMessage(null)} variant="outline" className="mt-6 border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">Send another message</Button></div></div>;
  return <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2"><Field label="Name" required /><Field label="Company" /><Field label="Email" type="email" required /><Field label="Phone" type="tel" /><label className="grid gap-2 text-sm font-medium text-slate-200 sm:col-span-2"><span>Subject</span><Input name="Subject" required className="h-11 border-white/10 bg-[#0a1728] text-white focus-visible:ring-[#d8ff40]" /></label><label className="grid gap-2 text-sm font-medium text-slate-200 sm:col-span-2"><span>Message</span><Textarea name="Message" required className="min-h-28 border-white/10 bg-[#0a1728] text-white focus-visible:ring-[#d8ff40]" /></label><div className="sm:col-span-2"><Button type="submit" disabled={mutation.isPending} className="h-12 w-full bg-[#d8ff40] font-bold text-[#06101d] hover:bg-[#ecff85]">{mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending</> : "Send Message"}</Button></div></form>;
}

function Field({ label, ...props }: React.ComponentProps<typeof Input> & { label: string }) { return <label className="grid gap-2 text-sm font-medium text-slate-200"><span>{label}</span><Input name={label} {...props} className="h-11 border-white/10 bg-[#0a1728] text-white focus-visible:ring-[#d8ff40]" /></label>; }
