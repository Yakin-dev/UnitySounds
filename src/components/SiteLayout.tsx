import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Music2, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Music2 className="h-6 w-6 text-gold transition-transform group-hover:rotate-12" />
            <span className="font-display text-xl tracking-wide">
              Unity <span className="text-gradient-gold">Sounds</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`text-sm tracking-wide transition-colors hover:text-gold ${
                  pathname === n.to ? "text-gold" : "text-foreground/80"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground max-w-[160px] truncate" title={user.email ?? ""}>
                  {user.email}
                </span>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-gold/40 text-gold text-sm hover:bg-gold/10"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm text-foreground/80 hover:text-gold"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-sm text-foreground/80 hover:text-gold">
                  Login
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gold text-gold-foreground font-medium text-sm hover:opacity-90 transition shadow-gold"
                >
                  Book Now
                </Link>
              </>
            )}
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-5 py-4 flex flex-col gap-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`py-2 text-base ${pathname === n.to ? "text-gold" : ""}`}
                >
                  {n.label}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="pt-2 text-xs text-muted-foreground truncate">
                    Signed in as {user.email}
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 py-2 text-gold"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => { setOpen(false); handleSignOut(); }}
                    className="inline-flex items-center gap-2 py-2 text-left"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="py-2 text-base"
                  >
                    Login / Register
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex justify-center px-4 py-2 rounded-md bg-gold text-gold-foreground font-medium"
                  >
                    Book Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-5 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Music2 className="h-5 w-5 text-gold" />
              <span className="font-display text-lg">
                Unity <span className="text-gradient-gold">Sounds</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              The music, audio production and sound rental division of Unity Fashions Management.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Phone: +000 000 0000</li>
              <li>Email: hello@unitysounds.com</li>
              <li>Location: Your City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Unity Sounds · A division of Unity Fashions Management
        </div>
      </footer>
    </div>
  );
}
