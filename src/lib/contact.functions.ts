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
const UNITY_WHATSAPP_NUMBER = "250790305483"; // change this

function buildWhatsappUrl(payload: {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  message: string;
}) {
  const whatsappMessage = `Hello Unity Sounds, I want to request sound service.

Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || "N/A"}
Event Type: ${payload.event_type || "N/A"}
Event Date: ${payload.event_date || "N/A"}
Message: ${payload.message}`;

  return `https://wa.me/${UNITY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
}

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
    return { sent: false, reason: "RESEND_API_KEY missing" };
  }

  const esc = (s: string) =>
    s.replace(/[&<>"']/g, (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!
    );

  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Event Type", payload.event_type || "—"],
    ["Event Date", payload.event_date || "—"],
    ["Submitted At", payload.submitted_at],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111">
      <h2 style="color:#b8860b">New Unity Sounds Contact Request</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:160px">${esc(
                  k
                )}</td>
                <td style="padding:8px;border-bottom:1px solid #eee">${esc(
                  v
                )}</td>
              </tr>`
          )
          .join("")}
      </table>
      <h3 style="margin-top:24px">Message</h3>
      <p style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:6px">${esc(
        payload.message
      )}</p>
    </div>
  `;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: controller.signal,
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
      return {
        sent: false,
        reason: `Resend failed: ${res.status} ${txt}`,
      };
    }

    return { sent: true, reason: null };
  } catch (error) {
    console.error("[contact] Resend request failed or timed out", error);
    return {
      sent: false,
      reason: "Email request failed or timed out",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    let userId: string | null = null;

    const authHeader = getRequestHeader("authorization");

    if (authHeader) {
      const token = authHeader.replace(/^Bearer\s+/i, "");

      if (token) {
        const { data: userData } = await supabaseAdmin.auth.getUser(token);
        userId = userData.user?.id ?? null;
      }
    }

    const { error } = await supabaseAdmin
      .from("contact_messages" as never)
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        event_type: data.event_type || null,
        event_date: data.event_date || null,
        message: data.message,
        user_id: userId,
      } as never);

    if (error) {
      throw new Error(error.message);
    }

    const emailResult = await sendOwnerNotification({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      event_type: data.event_type || "",
      event_date: data.event_date || "",
      message: data.message,
      submitted_at: new Date().toISOString(),
    });

    const whatsappUrl = buildWhatsappUrl({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      event_type: data.event_type || "",
      event_date: data.event_date || "",
      message: data.message,
    });

    return {
      ok: true,
      emailSent: emailResult.sent,
      emailReason: emailResult.reason,
      whatsappUrl: emailResult.sent ? null : whatsappUrl,
    };
  });