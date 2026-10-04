/**
 * Cloudflare Pages Function — stores pre-orders in Supabase and emails via Resend.
 * Returns success as soon as Supabase saves; email is sent in the background (waitUntil)
 * so the browser does not time out waiting for Resend.
 *
 * Env:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   RESEND_API_KEY (optional but recommended)
 *   CONTACT_TO (optional)
 */
const CONTACT_TO = "hello@oristrade.com";
const FROM = "Cedar & Clay <hello@oristrade.com>";

/** Keep in sync with shippable products in lib/products.ts */
const CATALOG = {
  "laundry-soap": { name: "Laundry Soap", booth: 7 },
  "vanilla-sugar": { name: "Vanilla Sugar", booth: 6 },
  "elderberry-syrup-kit": { name: "Elderberry Syrup Kit", booth: 12 },
  "pink-himalayan-detox-bath": { name: "Pink Himalayan Detox Bath", booth: 8 },
  "bentonite-clay-bath-soak": { name: "Bentonite Clay Bath Soak", booth: 8 },
  "bath-salt-soak": { name: "Bath Salt Soak", booth: 7 },
  "foot-mask": { name: "Foot Mask", booth: 6 },
  "armpit-mask": { name: "Armpit Mask", booth: 6 },
  "foot-soak": { name: "Foot Soak", booth: 6 },
  "tallow-lotion": { name: "Tallow Lotion", booth: 10 },
  "black-drawing-salve": { name: "Black Drawing Salve", booth: 9 },
  "comfrey-salve": { name: "Comfrey Salve", booth: 9 },
  "sugar-scrub-peppermint": { name: "Sugar Scrub (Peppermint)", booth: 8 },
};

const UPCHARGE = 1.15;

function onlinePrice(booth) {
  return Math.round(booth * UPCHARGE);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Pre-orders are not configured yet." }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const { name, email, phone, address, productId, quantity, notes, website } = body;

  if (website) {
    return json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !productId || !address?.trim()) {
    return json({ error: "Name, email, product, and shipping address are required." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const product = CATALOG[productId];
  if (!product) {
    return json({ error: "Please choose a product from the list." }, 400);
  }

  const qty = Math.min(20, Math.max(1, parseInt(quantity, 10) || 1));
  const unit = onlinePrice(product.booth);
  const subtotal = unit * qty;

  const row = {
    status: "pending",
    product_id: productId,
    product_name: product.name,
    quantity: qty,
    unit_price_usd: unit,
    subtotal_usd: subtotal,
    customer_name: name.trim(),
    customer_email: email.trim().toLowerCase(),
    customer_phone: phone?.trim() || null,
    shipping_address: address.trim(),
    notes: notes?.trim() || null,
  };

  const insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/cedarclay_preorders`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!insertRes.ok) {
    const err = await insertRes.text();
    console.error("Supabase insert error:", insertRes.status, err);
    return json({ error: "Could not save pre-order. Please try again or contact us." }, 502);
  }

  let orderId = null;
  try {
    const saved = await insertRes.json();
    orderId = Array.isArray(saved) ? saved[0]?.id : saved?.id;
  } catch (e) {
    console.error("Supabase parse error:", e);
  }

  if (env.RESEND_API_KEY) {
    const notify = sendNotifyEmail({
      apiKey: env.RESEND_API_KEY,
      to: env.CONTACT_TO || CONTACT_TO,
      orderId,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      address: address.trim(),
      notes: notes?.trim() || "",
      productName: product.name,
      qty,
      unit,
      subtotal,
    });

    if (typeof context.waitUntil === "function") {
      context.waitUntil(notify);
    } else {
      // Fallback if waitUntil unavailable — still await, but order is already saved
      try {
        await notify;
      } catch (e) {
        console.error("Resend error:", e);
      }
    }
  }

  return json({ ok: true, id: orderId || null });
}

async function sendNotifyEmail({
  apiKey,
  to,
  orderId,
  name,
  email,
  phone,
  address,
  notes,
  productName,
  qty,
  unit,
  subtotal,
}) {
  const subject = `Cedar & Clay pre-order — ${productName} × ${qty}`;
  const html = `
    <p><strong>Pre-order saved</strong> (payment offline)</p>
    <p><strong>Order ID:</strong> ${escapeHtml(orderId || "—")}</p>
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
    <p><strong>Ship to:</strong><br>${escapeHtml(address).replace(/\n/g, "<br>")}</p>
    <hr>
    <p><strong>Product:</strong> ${escapeHtml(productName)}</p>
    <p><strong>Quantity:</strong> ${qty}</p>
    <p><strong>Est. unit (online):</strong> $${unit}</p>
    <p><strong>Est. product subtotal:</strong> $${subtotal}</p>
    <p style="color:#666;font-size:13px;">Plus packing (~$2) and shipping to confirm. View all orders: https://journal.oristrade.com/admin/cedarclay-orders</p>
    <p><strong>Notes:</strong></p>
    <p>${escapeHtml(notes || "—").replace(/\n/g, "<br>")}</p>
  `;

  const mailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!mailRes.ok) {
    console.error("Resend error:", mailRes.status, await mailRes.text());
  }
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
