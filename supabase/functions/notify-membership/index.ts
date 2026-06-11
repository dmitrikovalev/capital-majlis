import "@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_TO = "admin@admsoc.com";

interface MembershipRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  cars: string;
  referred_by: string | null;
}

Deno.serve(async (req) => {
  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY secret is not set");
      return new Response("misconfigured: missing RESEND_API_KEY", { status: 500 });
    }

    const payload = await req.json().catch(() => null);
    if (!payload?.record) {
      console.error("Invalid webhook payload:", JSON.stringify(payload));
      // Return 200 so Supabase does not retry a malformed payload endlessly
      return new Response("invalid payload — skipped", { status: 200 });
    }

    const record: MembershipRecord = payload.record;

    const html = `
      <h2>New Membership Request</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${record.name}</td></tr>
        <tr><td><b>Email</b></td><td>${record.email}</td></tr>
        <tr><td><b>Phone</b></td><td>${record.phone}</td></tr>
        <tr><td><b>Collection</b></td><td>${record.cars}</td></tr>
        <tr><td><b>Referred by</b></td><td>${record.referred_by ?? "—"}</td></tr>
        <tr><td><b>Submitted</b></td><td>${record.created_at}</td></tr>
      </table>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ADMSOC <onboarding@resend.dev>",
        to: [NOTIFY_TO],
        subject: `New membership request — ${record.name}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      // Return 500 so Supabase retries (transient Resend error)
      console.error(`Resend error ${res.status}:`, body);
      return new Response(`resend error: ${body}`, { status: 500 });
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    // Network-level failure (DNS, timeout) — return 500 to trigger retry
    console.error("Unexpected error:", err);
    return new Response("internal error", { status: 500 });
  }
});
