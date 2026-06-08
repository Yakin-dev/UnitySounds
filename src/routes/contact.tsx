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

const WHATSAPP_NUMBER = "250737833088"; // replace with real number
const PHONE = "+250 737 833 088"; 
const EMAIL = "unitysounds@gmail.com";
const LOCATION = "Kigali, Rwanda";

function Contact() {
  const submit = useServerFn(submitContactMessage);
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("Concert / Music Festival");
  const [submitted, setSubmitted] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState<any>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    
    let chosenEventType = eventType;
    if (eventType === "Other") {
      chosenEventType = String(fd.get("event_type_other") || "").trim();
      if (!chosenEventType) {
        chosenEventType = "Other";
      }
    }

    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      event_type: chosenEventType,
      event_date: String(fd.get("event_date") || ""),
      message: String(fd.get("message") || ""),
    };

    setLoading(true);
    try {
      const res = await submit({ data: payload });
      if (res && res.ok) {
        toast.success("Request saved! You can now continue on WhatsApp.");
        setSubmittedPayload(payload);
        setSubmitted(true);
        form.reset();
        setEventType("Concert / Music Festival");
      } else {
        toast.error("Could not save request. Please try again or WhatsApp us directly.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not save request. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  }

  function handleWhatsAppClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const name = (document.getElementsByName("name")[0] as HTMLInputElement)?.value || "";
    const email = (document.getElementsByName("email")[0] as HTMLInputElement)?.value || "";
    const phone = (document.getElementsByName("phone")[0] as HTMLInputElement)?.value || "";
    
    let chosenEventType = eventType;
    if (eventType === "Other") {
      const otherInput = document.getElementsByName("event_type_other")[0] as HTMLInputElement;
      chosenEventType = otherInput?.value?.trim() || "Other";
    }

    const eventDate = (document.getElementsByName("event_date")[0] as HTMLInputElement)?.value || "";
    const msg = (document.getElementsByName("message")[0] as HTMLTextAreaElement)?.value || "";

    if (msg || name) {
      e.preventDefault();
      const whatsappMessage = `Hello Unity Sounds, I want to request sound service.

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Event Type: ${chosenEventType || "N/A"}
Event Date: ${eventDate || "N/A"}
Message: ${msg}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-md bg-background border border-border focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-sm transition duration-300";

  return (
    <>
      <section className="bg-hero relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-5 py-24 relative">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Contact</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-display max-w-3xl leading-[1.1]">
            Let's make it <span className="text-gradient-gold">sound great</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Tell us about your event. We'll respond with availability and a quote.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-24 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="p-8 rounded-2xl border border-border bg-card premium-glow-card text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto border border-gold/30">
                <MessageCircle className="h-8 w-8 text-gold" />
              </div>
              <h2 className="text-3xl font-display text-glow">Request Saved</h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                Thank you. Your request has been saved. You can also continue on WhatsApp for faster response.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Unity Sounds, I want to request sound service.\n\nName: ${submittedPayload?.name}\nEmail: ${submittedPayload?.email}\nPhone: ${submittedPayload?.phone || "N/A"}\nEvent Type: ${submittedPayload?.event_type || "N/A"}\nEvent Date: ${submittedPayload?.event_date || "N/A"}\nMessage: ${submittedPayload?.message}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmittedPayload(null);
                  }}
                  className="btn-outline cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-6 p-8 rounded-2xl border border-border bg-card premium-glow-card">
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
                <select 
                  name="event_type" 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={`mt-2 ${inputCls}`}
                >
                  <option value="Concert / Music Festival">Concert / Music Festival</option>
                  <option value="Corporate Event / Seminar">Corporate Event / Seminar</option>
                  <option value="Wedding / Private Reception">Wedding / Private Reception</option>
                  <option value="Private Party / Birthday">Private Party / Birthday</option>
                  <option value="Product Launch / Exhibition">Product Launch / Exhibition</option>
                  <option value="Other">Other (Please specify)</option>
                </select>
                {eventType === "Other" && (
                  <input 
                    name="event_type_other" 
                    required
                    placeholder="Please specify event type..." 
                    maxLength={80} 
                    className={`mt-2 ${inputCls}`} 
                  />
                )}
              </div>
              <div className="sm:col-span-1">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Event Date</label>
                <input name="event_date" type="date" className={`mt-2 ${inputCls}`} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea name="message" required rows={5} maxLength={2000} className={`mt-2 ${inputCls} resize-y`} />
              </div>
              <div className="sm:col-span-2 flex flex-wrap gap-4 items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold disabled:opacity-60 cursor-pointer"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Send Message
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          {[
            { icon: Phone, label: "Phone", value: PHONE },
            { icon: Mail, label: "Email", value: EMAIL },
            { icon: MapPin, label: "Location", value: LOCATION },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-6 rounded-xl border border-border bg-card premium-glow-card">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-md bg-gold/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              </div>
            </div>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="block p-6 rounded-xl border border-gold/30 bg-gold/5 hover:bg-gold/10 transition duration-300 shadow-sm"
            onClick={handleWhatsAppClick}
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
