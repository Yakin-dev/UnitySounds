import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Speaker, Headphones, Settings2, Music, Shirt, Sliders } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Unity Sounds" },
      { name: "description", content: "Sound rental, DJ booking, event sound setup, music production, fashion show audio and live mixing." },
    ],
  }),
  component: () => <SiteLayout><Services /></SiteLayout>,
});

const services = [
  { icon: Speaker, title: "Sound System Rental", desc: "Full PA systems, line arrays, subwoofers and stage monitors — sized to your venue." },
  { icon: Headphones, title: "DJ Equipment & DJ Booking", desc: "Pro DJ controllers, decks and experienced DJs for any vibe or genre." },
  { icon: Settings2, title: "Event Sound Setup & Technicians", desc: "Setup, soundcheck and on-site engineers from doors open to last song." },
  { icon: Music, title: "Music Production & Soundtracks", desc: "Custom music, edits and soundtracks produced for your show or brand." },
  { icon: Shirt, title: "Runway & Fashion Show Audio", desc: "Tight musical cues, transitions and audio direction built for the catwalk." },
  { icon: Sliders, title: "Live Mixing & Sound Engineering", desc: "FOH and monitor mixing by engineers who make every act sound their best." },
];

function Services() {
  return (
    <>
      <section className="bg-hero">
        <div className="max-w-7xl mx-auto px-5 py-24">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Services</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display max-w-3xl">
            Complete sound for every <span className="text-gradient-gold">moment</span>.
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            From a single DJ booth to a full festival rig, we build the audio experience your event deserves.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="group p-8 rounded-2xl border border-border bg-card hover:border-gold transition">
              <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h2 className="mt-6 text-xl font-display">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center px-6 py-3 rounded-md bg-gold text-gold-foreground font-semibold shadow-gold hover:opacity-90">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
