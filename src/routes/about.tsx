import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Unity Sounds" },
      { name: "description", content: "Unity Sounds is the music, audio production and sound rental division of Unity Fashions Management." },
    ],
  }),
  component: () => <SiteLayout><About /></SiteLayout>,
});

const showcaseImages = [
  "/products/outdoor_pa.jpg",
  "/slides/slide5.jpg",
  "/slides/slide4.jpg",
  "/products/line_array.jpg",
];

const expertiseCards = [
  {
    title: "Concerts & Festivals",
    desc: "From high-profile outdoor live shows to local music festivals, delivering powerful concert-grade sound.",
    img: "/products/line_array.jpg"
  },
  {
    title: "Corporate & Hospitality",
    desc: "Crystal-clear microphones, discreet setups, and polished acoustics for summits, galas, and upscale lounges.",
    img: "/slides/slide4.jpg"
  },
  {
    title: "Weddings & Galas",
    desc: "Luxury DJ booths, marquee sound systems, and mood-setting audio designed to match elegant receptions.",
    img: "/slides/slide5.jpg"
  }
];

function About() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % showcaseImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section className="bg-hero relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-5 py-24 relative">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">About Us</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-display max-w-3xl leading-[1.1]">
            Where <span className="text-gradient-gold">sound</span> meets style.
          </h1>
        </div>
      </section>

      {/* Main Info with Auto-Slider */}
      <section className="max-w-7xl mx-auto px-5 py-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 text-gold text-xs tracking-widest uppercase bg-gold/5">
              <Sparkles className="h-3 w-3" /> A Unity Fashions Management Division
            </span>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-foreground/90">
              Unity Sounds is the premier music, audio production, and professional sound rental division of
              <span className="text-gold font-medium"> Unity Fashions Management</span>. 
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              We engineer tailored soundscapes and live audio rigs for fashion runways, festivals, corporate engagements, and luxury private events. By merging high-end equipment with meticulous audio direction, we make sure your audience feels every single note.
            </p>
            <div className="pt-4 grid sm:grid-cols-2 gap-4">
              {[
                "On-Site Sound Engineers",
                "Custom Runway Soundtracks",
                "Crystal-Clear Audio Rigs",
                "Professional Lighting Setup",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card shadow-2xl group">
            {showcaseImages.map((src, idx) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={src}
                  alt="Unity Sounds Event Setup"
                  className="w-full height-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Cards */}
      <section className="bg-card/20 border-t border-border/50 py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Where We Deliver</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Specialized audio experiences</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {expertiseCards.map((card) => (
              <article 
                key={card.title} 
                className="group rounded-2xl border border-border bg-card overflow-hidden premium-glow-card transition flex flex-col"
              >
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    loading="lazy" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-display text-glow">{card.title}</h3>
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/contact" className="btn-gold">
              Get Started <ArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
