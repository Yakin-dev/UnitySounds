import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Unity Sounds" },
      { name: "description", content: "Unity Sounds is the music, audio production and sound rental division of Unity Fashions Management." },
    ],
  }),
  component: () => <SiteLayout><About /></SiteLayout>,
});

function About() {
  return (
    <>
      <section className="bg-hero">
        <div className="max-w-7xl mx-auto px-5 py-24">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">About Us</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-display max-w-3xl">
            Where <span className="text-gradient-gold">sound</span> meets style.
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-20">
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
          Unity Sounds is the music, audio production, and sound rental division of
          <span className="text-gold"> Unity Fashions Management</span>. We deliver complete
          sound solutions for events, fashion shows, concerts, private parties, corporate events,
          artists, DJs, and creative projects.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          We combine professional sound equipment rental with music production and live audio
          expertise so every event looks good and sounds powerful.
        </p>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {[
            { k: "Events", v: "Fashion · Concerts · Corporate" },
            { k: "Approach", v: "Premium gear · Trained crew" },
            { k: "Promise", v: "Powerful, polished sound" },
          ].map((b) => (
            <div key={b.k} className="p-6 rounded-xl border border-border">
              <p className="text-xs uppercase tracking-widest text-gold">{b.k}</p>
              <p className="mt-2">{b.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold text-gold-foreground font-semibold shadow-gold hover:opacity-90">
            Work with us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
