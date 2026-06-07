import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Equipment — Unity Sounds" },
      { name: "description", content: "Speakers, microphones, mixers, DJ controllers, stage monitors, and full lighting & audio packages available for rent." },
    ],
  }),
  component: () => <SiteLayout><Products /></SiteLayout>,
});

const placeholder = (label: string) =>
  `https://images.unsplash.com/photo-1${encodeURIComponent(label)}`;

const products = [
  { 
    name: "Line Array Systems", 
    desc: "Concert-grade vertical line array speaker stacks delivering powerful, long-throw audio coverage for festivals, major concerts, and large venues.", 
    img: "/products/line_array.jpg" 
  },
  { 
    name: "Professional PA Systems", 
    desc: "High-output point-source speakers mounted on subwoofers, perfect for private outdoor events, garden weddings, and corporate gatherings.", 
    img: "/products/outdoor_pa.jpg" 
  },
  { 
    name: "Wireless Microphones", 
    desc: "Reliable professional handheld wireless microphone systems with dual-channel receivers for crisp vocals and speech.", 
    img: "/products/jbl_mics.jpg" 
  },
  { 
    name: "Stage Monitors", 
    desc: "Premium wedge monitors and flight-cased speaker monitors ensuring performers and presenters have clear on-stage audio feedback.", 
    img: "/products/indoor_speakers.jpg" 
  },
  { 
    name: "Digital & Analog Mixers", 
    desc: "Professional multi-channel mixing consoles and rack mount power amplifiers for precise audio engineering.", 
    img: "/products/mixers.jpg" 
  },
  { 
    name: "DJ Controller Setup", 
    desc: "Industry-standard DJ decks, controllers, and mixing stations integrated with laptop software for flawless live performance.", 
    img: "/products/dj_controller.jpg" 
  },
  { 
    name: "Lighting & Audio Setup Package", 
    desc: "Complete event entertainment system combining heavy-duty lighting truss rigs, moving heads, spotlights, and a powerful audio rig.", 
    img: "/products/package.jpg" 
  },
];

function Products() {
  void placeholder;
  return (
    <>
      <section className="bg-hero">
        <div className="max-w-7xl mx-auto px-5 py-24">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Products & Equipment</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display max-w-3xl">
            Pro-grade gear, <span className="text-gradient-gold">ready to roll</span>.
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Rent any item individually or as a complete package. All gear is delivered, set up and operated by our team.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <article key={p.name} className="group rounded-2xl border border-border bg-card overflow-hidden premium-glow-card transition flex flex-col">
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-display text-glow">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.desc}</p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-md border border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground transition duration-300 text-sm font-medium"
                >
                  Request Quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
