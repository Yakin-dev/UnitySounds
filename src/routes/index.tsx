import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HeroSlider } from "@/components/HeroSlider";
import { Speaker, Mic2, Sliders, Music, Headphones, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unity Sounds — Sound Rental, Music Production & Live Audio" },
      { name: "description", content: "Professional sound rental, music production and live audio solutions for events, fashion shows and concerts." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <Home />
    </SiteLayout>
  ),
});

function Home() {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* What we do */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold uppercase">What we do</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Sound that moves the room.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We deliver complete sound solutions — from runway shows and concerts to private
              parties and corporate events. Premium equipment, experienced engineers, and
              music production tailored to your moment.
            </p>
            <ul className="mt-6 space-y-3">
              {["Full-service event sound", "Trained technicians on-site", "Music production & soundtracks", "Fashion show audio direction"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Speaker, label: "Sound Rental" },
              { icon: Headphones, label: "DJ Booking" },
              { icon: Sliders, label: "Live Mixing" },
              { icon: Music, label: "Music Production" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="p-6 rounded-xl border border-border bg-card premium-glow-card">
                <Icon className="h-7 w-7 text-gold" />
                <p className="mt-4 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-5 py-20">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">Featured</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Our signature services</h2>
            </div>
            <Link to="/services" className="text-sm text-gold hover:underline">All services →</Link>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              { icon: Speaker, title: "Sound System Rental", desc: "Crystal-clear PA systems sized for any venue or crowd." },
              { icon: Music, title: "Music Production", desc: "Custom soundtracks, mixes and edits for your event." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-8 rounded-2xl bg-background border border-border premium-glow-card">
                <Icon className="h-8 w-8 text-gold" />
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Why us</p>
        <h2 className="mt-3 text-3xl md:text-4xl max-w-2xl">Built for events that need to look good and sound powerful.</h2>
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {[
            { n: "01", t: "Premium Gear", d: "Professional speakers, mics, mixers, DJ controllers and lighting." },
            { n: "02", t: "Experienced Team", d: "Engineers and technicians who set up, mix and deliver flawlessly." },
            { n: "03", t: "Tailored Sound", d: "Audio designed for fashion, music, corporate and private events." },
            { n: "04", t: "End-to-End", d: "From production to live mixing — one team handles everything." },
          ].map((f) => (
            <div key={f.n} className="p-6 rounded-xl border border-border bg-card premium-glow-card">
              <span className="text-gold font-display text-2xl">{f.n}</span>
              <h3 className="mt-3 text-lg">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 p-10 md:p-16 text-center bg-hero">
          <h2 className="text-3xl md:text-5xl font-display">Ready to make your event <span className="text-gradient-gold">sound unforgettable?</span></h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tell us about your event and we'll build the perfect sound setup for you.
          </p>
          <Link to="/contact" className="mt-8 btn-gold">
            Book Sound Setup <ArrowRight className="btn-icon" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
