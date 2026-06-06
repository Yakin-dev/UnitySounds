import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar, Mail, MessageSquare } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Client Dashboard — Unity Sounds" },
      { name: "description", content: "Your Unity Sounds client dashboard." },
    ],
  }),
  component: () => <SiteLayout><Dashboard /></SiteLayout>,
});

type Message = {
  id: string;
  event_type: string | null;
  event_date: string | null;
  message: string;
  created_at: string;
};

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      if (!active) return;
      setUser(data.session.user);
      const { data: msgs } = await supabase
        .from("contact_messages" as never)
        .select("id, event_type, event_date, message, created_at")
        .order("created_at", { ascending: false });
      if (active) {
        setMessages((msgs ?? []) as unknown as Message[]);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [navigate]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <>
      <section className="bg-hero">
        <div className="max-w-7xl mx-auto px-5 py-16">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Client Dashboard</p>
          <h1 className="mt-4 text-3xl md:text-5xl font-display">
            Welcome, <span className="text-gradient-gold">{user.email}</span>
          </h1>
          <p className="mt-4 text-muted-foreground inline-flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gold" /> Signed in as {user.email}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-16">
        <h2 className="font-display text-2xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-gold" /> Your booking requests
        </h2>
        {messages.length === 0 ? (
          <div className="mt-6 p-8 rounded-xl border border-border bg-card text-center text-muted-foreground">
            No requests yet. Submit one from the Contact page.
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {messages.map((m) => (
              <li key={m.id} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="text-gold">{m.event_type || "Inquiry"}</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {m.event_date || new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-sm whitespace-pre-line">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
