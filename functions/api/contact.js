/**
 * Cloudflare Pages Function — forwards contact form to Resend.
 * Requires RESEND_API_KEY in Pages project settings (oristrade.com must be verified in Resend).
 */
const CONTACT_TO = "hello@oristrade.com";
const FROM = "Cedar & Clay <hello@oristrade.com>";

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return json({ error: "Email is not configured yet." }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const { name, email, interest, message, website } = body;

  if (website) {
    return json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: "Name, email, and message are required." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const subject = `Cedar & Clay — ${interest?.trim() || "General inquiry"}`;
  const html = `
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Interest:</strong> ${escapeHtml(interest || "General inquiry")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    <hr>
    <p style="color:#666;font-size:12px;">Sent from cedarclaylife.com contact form</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [env.CONTACT_TO || CONTACT_TO],
      reply_to: email.trim(),
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", res.status, err);
    return json({ error: "Could not send message. Please try again later." }, 502);
  }

  return json({ ok: true });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
