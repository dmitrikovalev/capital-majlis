import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");
// Injected automatically into every Edge Function by the Supabase runtime.
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const NOTIFY_TO = "admin@admsoc.com";

const DOC_BUCKET = "vehicle-registrations";
const SIGNED_URL_TTL = 7 * 24 * 60 * 60; // 7 days, in seconds.

interface MembershipRecord {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  cars: string;
  referred_by: string | null;
  registration_doc_path: string | null;
}

// Mint a time-limited link to the (private) registration certificate. Returns
// null on any failure so a missing/broken document never blocks the notification.
async function signDocument(path: string | null): Promise<string | null> {
  if (!path) return null;
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("Cannot sign document: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return null;
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const { data, error } = await supabase.storage
    .from(DOC_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (error) {
    console.error("Failed to create signed URL:", error.message);
    return null;
  }
  return data.signedUrl;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function timingSafeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  if (ea.length !== eb.length) return false;
  let diff = 0;
  for (let i = 0; i < ea.length; i++) diff |= ea[i] ^ eb[i];
  return diff === 0;
}

Deno.serve(async (req) => {
  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY secret is not set");
      return new Response("misconfigured: missing RESEND_API_KEY", { status: 500 });
    }

    // Verify the shared secret sent by Supabase Database Webhook.
    // Set WEBHOOK_SECRET in Supabase project secrets and mirror the same value
    // in the webhook's "HTTP Headers" as x-webhook-secret.
    if (!WEBHOOK_SECRET) {
      console.error("WEBHOOK_SECRET secret is not set");
      return new Response("misconfigured: missing WEBHOOK_SECRET", { status: 500 });
    }
    const incoming = req.headers.get("x-webhook-secret") ?? "";
    if (!timingSafeEqual(incoming, WEBHOOK_SECRET)) {
      console.error("Unauthorized webhook call — bad or missing x-webhook-secret");
      return new Response("unauthorized", { status: 401 });
    }

    const payload = await req.json().catch(() => null);
    if (!payload?.record) {
      console.error("Invalid webhook payload:", JSON.stringify(payload));
      // Return 200 so Supabase does not retry a malformed payload endlessly
      return new Response("invalid payload — skipped", { status: 200 });
    }

    const record: MembershipRecord = payload.record;

    const signedUrl = await signDocument(record.registration_doc_path);
    const docRow = signedUrl
      ? `<tr><td><b>Registration certificate</b></td><td><a href="${escapeHtml(signedUrl)}">View document</a> <i>(link expires in 7 days)</i></td></tr>`
      : `<tr><td><b>Registration certificate</b></td><td>—</td></tr>`;

    const html = `
      <h2>New Membership Request</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${escapeHtml(record.name)}</td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(record.email)}</td></tr>
        <tr><td><b>Phone</b></td><td>${escapeHtml(record.phone)}</td></tr>
        <tr><td><b>Collection</b></td><td>${escapeHtml(record.cars)}</td></tr>
        <tr><td><b>Referred by</b></td><td>${record.referred_by ? escapeHtml(record.referred_by) : "—"}</td></tr>
        ${docRow}
        <tr><td><b>Submitted</b></td><td>${escapeHtml(record.created_at)}</td></tr>
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
        subject: `New membership request — ${escapeHtml(record.name)}`,
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
