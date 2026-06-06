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

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // If the request carries a Supabase bearer token, attribute the message to that user.
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
    return { ok: true };
  });
