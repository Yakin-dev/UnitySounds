import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { submitContactMessage } from "@/lib/contact.functions";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Phone, Mail, MapPin, MessageCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Unity Sounds" },
      { name: "description", content: "Book Unity Sounds for your event. Get a quote for sound rental, DJ, music production or live audio." },
    ],
  }),
  component: () => <SiteLayout><Contact /></SiteLayout>,
});

const WHATSAPP_NUMBER = "0790305483"; // replace with real number
const PHONE = "+250790305483"; // replace with real number
const EMAIL = "unitysounds@gmail.com";
const LOCATION = "Your City";

function Contact() {
  const submit = useServerFn(submitContactMessage);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      event_type: String(fd.get("event_type") || ""),
      event_date: String(fd.get("event_date") || ""),
      message: String(fd.get("message") || ""),
    };
    setLoading(true);
    try {
      await submit({ data: payload });
      toast.success("Message sent! We'll get back to you shortly.");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Could not send. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-md bg-background border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm";

  return (
    <>
      <section className="bg-hero">
        <div className="max-w-7xl mx-auto px-5 py-24">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Contact</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display max-w-3xl">
            Let's make it <span className="text-gradient-gold">sound great</span>.
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Tell us about your event. We'll respond with availability and a quote.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5 p-8 rounded-2xl border border-border bg-card">
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
              <input name="name" required maxLength={120} className={`mt-2 ${inputCls}`} />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input name="email" type="email" required maxLength={255} className={`mt-2 ${inputCls}`} />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone</label>
              <input name="phone" maxLength={40} className={`mt-2 ${inputCls}`} />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Event Type</label>
              <input name="event_type" placeholder="Fashion show, concert, party…" maxLength={80} className={`mt-2 ${inputCls}`} />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Event Date</label>
              <input name="event_date" type="date" className={`mt-2 ${inputCls}`} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea name="message" required rows={5} maxLength={2000} className={`mt-2 ${inputCls} resize-y`} />
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-3 items-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold text-gold-foreground font-semibold shadow-gold hover:opacity-90 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Send Message
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground transition font-medium"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </form>
        </div>

        <aside className="space-y-4">
          {[
            { icon: Phone, label: "Phone", value: PHONE },
            { icon: Mail, label: "Email", value: EMAIL },
            { icon: MapPin, label: "Location", value: LOCATION },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-gold/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="mt-0.5">{value}</p>
                </div>
              </div>
            </div>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="block p-6 rounded-xl border border-gold/30 bg-gold/5 hover:bg-gold/10 transition"
          >
            <MessageCircle className="h-6 w-6 text-gold" />
            <p className="mt-3 font-display text-lg">WhatsApp Us</p>
            <p className="text-sm text-muted-foreground">Fastest way to reach our booking team.</p>
          </a>
        </aside>
      </section>
    </>
  );
}
