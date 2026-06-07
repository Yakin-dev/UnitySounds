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
  { 
    icon: Speaker, 
    title: "Sound System Rental", 
    desc: "Full PA systems, line arrays, subwoofers and stage monitors — sized to your venue.",
    img: "/products/line_array.jpg"
  },
  { 
    icon: Headphones, 
    title: "DJ Equipment & Booking", 
    desc: "Pro DJ controllers, decks, and experienced DJs for any vibe or event genre.",
    img: "/products/dj_controller.jpg"
  },
  { 
    icon: Settings2, 
    title: "Event Setup & Crew", 
    desc: "Setup, soundcheck, and on-site engineers from doors open to the last song.",
    img: "/slides/slide3.jpg"
  },
  { 
    icon: Music, 
    title: "Music Production & Soundtracks", 
    desc: "Custom music, edits, and soundtracks produced for your runway show or brand.",
    img: "/products/mixers.jpg"
  },
  { 
    icon: Sliders, 
    title: "Live Sound Engineering", 
    desc: "FOH and monitor mixing by expert engineers who make every act sound their best.",
    img: "/products/outdoor_pa.jpg"
  },
];

function Services() {
  return (
    <>
      <section className="bg-hero relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-5 py-28 relative">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Services</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-display max-w-3xl leading-[1.1]">
            Complete sound for every <span className="text-gradient-gold">moment</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            From a single DJ booth to a full festival rig, we build the audio experience your event deserves.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc, img }) => (
            <article 
              key={title} 
              className="group rounded-2xl border border-border bg-card overflow-hidden premium-glow-card transition flex flex-col"
            >
              <div className="aspect-[16/10] bg-muted overflow-hidden relative">
                <img 
                  src={img} 
                  alt={title} 
                  loading="lazy" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center border border-border/50">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-2xl font-display text-glow">{title}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center px-4 py-2.5 rounded-md border border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground transition duration-300 text-sm font-medium"
                >
                  Book Service
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/contact" className="btn-gold">
            Request Custom Setup
          </Link>
        </div>
      </section>
    </>
  );
}
