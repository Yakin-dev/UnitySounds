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
  { name: "Speakers", desc: "High-output PA speakers and subwoofers for any venue size.", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=70" },
  { name: "Wireless Microphones", desc: "Reliable handheld and lavalier wireless mic systems.", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=70" },
  { name: "Mixers", desc: "Professional analog and digital mixing consoles.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=70" },
  { name: "DJ Controller", desc: "Industry-standard DJ controllers, decks and accessories.", img: "https://images.unsplash.com/photo-1571266028243-d220bc6d8b3a?auto=format&fit=crop&w=900&q=70" },
  { name: "Stage Monitors", desc: "Wedge monitors so performers hear every note clearly.", img: "https://images.unsplash.com/photo-1519508234439-4f23643125c1?auto=format&fit=crop&w=900&q=70" },
  { name: "Lighting & Audio Setup Package", desc: "Full event package combining stage lighting with full sound rig.", img: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=900&q=70" },
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
            <article key={p.name} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-gold transition flex flex-col">
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-display">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{p.desc}</p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-md border border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground transition text-sm font-medium"
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
