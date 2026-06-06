import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  event_type: z.string().trim().max(80).optional().or(z.literal("")),
  event_date: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

const OWNER_EMAIL = "niyikizaoberto@gmail.com";

async function sendOwnerNotification(payload: {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  message: string;
  submitted_at: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY missing; skipping email notification");
    return;
  }

  const esc = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Event Type", payload.event_type || "—"],
    ["Event Date", payload.event_date || "—"],
    ["Product Interest", payload.event_type || "—"],
    ["Submitted At", payload.submitted_at],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111">
      <h2 style="color:#b8860b">New Unity Sounds Contact Request</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:160px">${k}</td><td style="padding:8px;border-bottom:1px solid #eee">${esc(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin-top:24px">Message</h3>
      <p style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:6px">${esc(payload.message)}</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Unity Sounds <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      reply_to: payload.email,
      subject: "New Unity Sounds Contact Request",
      html,
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("[contact] Resend send failed", res.status, txt);
  }
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let userId: string | null = null;
    const authHeader = getRequestHeader("authorization");
    if (authHeader) {
      const token = authHeader.replace(/^Bearer\s+/i, "");
      if (token) {
        const { data: userData } = await supabaseAdmin.auth.getUser(token);
        userId = userData.user?.id ?? null;
      }
    }

    const { error } = await supabaseAdmin.from("contact_messages" as never).insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      event_type: data.event_type || null,
      event_date: data.event_date ? data.event_date : null,
      message: data.message,
      user_id: userId,
    } as never);
    if (error) throw new Error(error.message);

    try {
      await sendOwnerNotification({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        event_type: data.event_type || "",
        event_date: data.event_date || "",
        message: data.message,
        submitted_at: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[contact] notification error", e);
    }

    return { ok: true };
  });
