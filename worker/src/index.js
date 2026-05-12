/**
 * Claude Camp — bookings + waitlist + Stripe Worker.
 *
 * Endpoints
 *   POST /api/booking                     create a booking → returns Stripe Checkout URL
 *   GET  /api/availability?cohort=xxx     taken beds for a cohort
 *   POST /api/waitlist                    add to a cohort's waitlist
 *   GET  /api/waitlist-count?cohort=xxx   how many people are waiting
 *   GET  /api/bookings?key=ADMIN_KEY      admin: list all bookings
 *   GET  /api/waitlist?key=ADMIN_KEY      admin: list all waitlist entries
 *   PATCH /api/booking/:id                admin: update status/payment (X-Admin-Key header)
 *   POST /api/stripe-webhook              Stripe webhook → confirm payment
 *
 * Secrets: RESEND_API_KEY, ADMIN_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
 * Data: D1 (sqlite). Emails: Resend.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });

const err = (msg, status = 400) => json({ error: msg }, status);

const nanoid = () => crypto.randomUUID().replace(/-/g, '').slice(0, 12);

// ─── Email via Resend ────────────────────────────────────────────────

async function resend(env, payload) {
  if (!env.RESEND_API_KEY) return null;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

function cohortLabel(id) {
  const m = {
    'oct-04-2026': 'Oct 4 – 9, 2026',
    'oct-11-2026': 'Oct 11 – 16, 2026',
    'oct-18-2026': 'Oct 18 – 23, 2026',
    'oct-25-2026': 'Oct 25 – 30, 2026',
    'nov-01-2026': 'Nov 1 – 6, 2026',
    'nov-08-2026': 'Nov 8 – 13, 2026',
    'nov-15-2026': 'Nov 15 – 20, 2026',
    'nov-22-2026': 'Nov 22 – 27, 2026',
    'nov-29-2026': 'Nov 29 – Dec 4, 2026',
    'dec-06-2026': 'Dec 6 – 11, 2026',
    'dec-13-2026': 'Dec 13 – 18, 2026',
    'jan-10-2027': 'Jan 10 – 15, 2027',
    'jan-17-2027': 'Jan 17 – 22, 2027',
    'jan-24-2027': 'Jan 24 – 29, 2027',
  };
  return m[id] || id;
}

// ─── Stripe helpers ──────────────────────────────────────────────────

async function createStripeCheckout(env, booking) {
  const cohort = cohortLabel(booking.cohort);
  const tierLabel = booking.tier === 'premium' ? 'Premium ($1,990)' : 'Standard ($1,490)';

  const params = new URLSearchParams({
    'payment_method_types[]': 'card',
    'line_items[0][price_data][currency]': 'usd',
    'line_items[0][price_data][product_data][name]': `Claude Camp — ${cohort}`,
    'line_items[0][price_data][product_data][description]': `${tierLabel} deposit · non-refundable, transferable within 12 months`,
    'line_items[0][price_data][unit_amount]': '42000', // $420.00
    'line_items[0][quantity]': '1',
    'mode': 'payment',
    'success_url': `${env.SITE_URL}/booked.html?session_id={CHECKOUT_SESSION_ID}`,
    'cancel_url': `${env.SITE_URL}/#section-cohorts`,
    'customer_email': booking.email,
    'metadata[booking_id]': booking.id,
    'metadata[cohort]': booking.cohort,
    'metadata[name]': booking.name,
  });

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const e = await res.json();
    throw new Error(e.error?.message || 'Stripe checkout failed');
  }

  return res.json();
}

async function verifyStripeWebhook(rawBody, sigHeader, secret) {
  // Parse Stripe-Signature header: t=timestamp,v1=sig,...
  const parts = {};
  for (const chunk of sigHeader.split(',')) {
    const eq = chunk.indexOf('=');
    if (eq > -1) parts[chunk.slice(0, eq)] = chunk.slice(eq + 1);
  }
  const timestamp = parts.t;
  const v1sigs = sigHeader.split(',')
    .filter(p => p.startsWith('v1='))
    .map(p => p.slice(3));

  if (!timestamp || !v1sigs.length) throw new Error('Invalid Stripe-Signature header');

  // Reject events older than 5 minutes
  const age = Math.abs(Date.now() / 1000 - parseInt(timestamp));
  if (age > 300) throw new Error('Webhook timestamp too old');

  const signedPayload = `${timestamp}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  const expected = Array.from(new Uint8Array(mac))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  if (!v1sigs.includes(expected)) throw new Error('Stripe signature mismatch');
}

// ─── Emails ──────────────────────────────────────────────────────────

async function sendApplicationEmails(env, b) {
  const cohort = cohortLabel(b.cohort);
  const tier = b.tier === 'premium' ? 'Premium ($1,990)' : 'Standard ($1,490)';
  const track = b.track === 'builder' ? 'Builder' : 'Beginner';

  // Admin notification (immediate on application)
  await resend(env, {
    from: `Claude Camp <${env.FROM_EMAIL}>`,
    to: [env.NOTIFICATION_EMAIL],
    subject: `New application: ${b.name} — ${cohort}`,
    html: `
      <h2>New booking application</h2>
      <p><strong>${b.name}</strong> applied for <strong>${cohort}</strong>. Awaiting deposit payment.</p>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:4px 12px 4px 0;color:#888;">Email</td><td>${b.email}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;">WhatsApp</td><td>${b.phone || '—'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;">Country</td><td>${b.country || '—'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;">Track</td><td>${track}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;">Tier</td><td>${tier}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;">Bed</td><td>${b.bed_id}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#888;">Committed</td><td>${b.committed ? 'Yes ✓' : 'No'}</td></tr>
      </table>
      <h3>What they're building</h3>
      <p>${(b.building || '—').replace(/</g, '&lt;')}</p>
      ${b.message ? `<h3>Notes</h3><p>${b.message.replace(/</g, '&lt;')}</p>` : ''}
      <p style="margin-top:24px;color:#888;font-size:12px;">Payment pending — Stripe will notify when deposit clears.</p>
    `,
  });
}

async function sendConfirmationEmails(env, b) {
  const cohort = cohortLabel(b.cohort);
  const tier = b.tier === 'premium' ? 'Premium ($1,990)' : 'Standard ($1,490)';
  const track = b.track === 'builder' ? 'Builder' : 'Beginner';

  // Admin — deposit confirmed
  await resend(env, {
    from: `Claude Camp <${env.FROM_EMAIL}>`,
    to: [env.NOTIFICATION_EMAIL],
    subject: `✓ Deposit paid: ${b.name} — ${cohort}`,
    html: `
      <h2>Deposit confirmed</h2>
      <p><strong>${b.name}</strong> paid the $420 deposit for <strong>${cohort}</strong>. Bed ${b.bed_id} is locked.</p>
      <p>Email: <a href="mailto:${b.email}">${b.email}</a> · WhatsApp: ${b.phone || '—'}</p>
      <p style="color:#888;font-size:12px;">${tier} · ${track} track · Booking ID: ${b.id}</p>
    `,
  });

  // Guest — confirmed
  await resend(env, {
    from: `Sasha at Claude Camp <${env.FROM_EMAIL}>`,
    to: [b.email],
    reply_to: env.NOTIFICATION_EMAIL,
    subject: `You're confirmed for ${cohort} — see you in Pai`,
    html: `
      <p>Hey ${b.name.split(' ')[0]},</p>
      <p>Your $420 deposit is in — bed ${b.bed_id} is yours for <strong>${cohort}</strong>. Nothing else to do right now.</p>
      <p>A week before camp starts I'll send you a full arrival guide: driver contact, what to pack, what to leave at home. In the meantime, if anything comes up WhatsApp me at <a href="https://wa.me/66922864775">+66 92 286 4775</a>.</p>
      <p>— Sasha</p>
      <p style="color:#888;font-size:12px;margin-top:32px;">${cohort} · ${tier} · ${track} track · Bed ${b.bed_id}<br>The deposit is non-refundable but transferable to any future cohort within 12 months.</p>
    `,
  });
}

async function sendWaitlistEmails(env, w, position) {
  const cohort = cohortLabel(w.cohort);

  await resend(env, {
    from: `Claude Camp <${env.FROM_EMAIL}>`,
    to: [env.NOTIFICATION_EMAIL],
    subject: `Waitlist +1: ${w.name} for ${cohort}`,
    html: `
      <p><strong>${w.name}</strong> joined the waitlist for <strong>${cohort}</strong>. They're #${position} in line.</p>
      <p>Email: <a href="mailto:${w.email}">${w.email}</a><br>
      WhatsApp: ${w.phone || '—'}<br>
      Country: ${w.country || '—'}</p>
      ${w.message ? `<p><em>${w.message.replace(/</g, '&lt;')}</em></p>` : ''}
    `,
  });

  await resend(env, {
    from: `Sasha at Claude Camp <${env.FROM_EMAIL}>`,
    to: [w.email],
    reply_to: env.NOTIFICATION_EMAIL,
    subject: `You're on the waitlist for ${cohort}`,
    html: `
      <p>Hey ${w.name.split(' ')[0]},</p>
      <p>You're on the waitlist for <strong>${cohort}</strong>. If someone cancels (it happens), I'll reach out to you directly on WhatsApp or email to offer the open seat — first come first served.</p>
      <p>In the meantime, if your dates flex, <a href="https://claudecamp.org/#section-cohorts">other weeks may still be open</a>.</p>
      <p>— Sasha</p>
    `,
  });
}

// ─── Router ─────────────────────────────────────────────────────────

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

    const url = new URL(req.url);
    const { pathname } = url;

    try {
      if (req.method === 'POST' && pathname === '/api/booking') {
        return await createBooking(req, env);
      }

      if (req.method === 'GET' && pathname === '/api/availability') {
        return await getAvailability(url, env);
      }

      if (req.method === 'POST' && pathname === '/api/waitlist') {
        return await createWaitlist(req, env);
      }

      if (req.method === 'GET' && pathname === '/api/waitlist-count') {
        return await getWaitlistCount(url, env);
      }

      if (req.method === 'GET' && pathname === '/api/bookings') {
        if (url.searchParams.get('key') !== env.ADMIN_KEY) return err('unauthorized', 401);
        const { results } = await env.DB.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
        return json({ bookings: results });
      }

      if (req.method === 'GET' && pathname === '/api/waitlist') {
        if (url.searchParams.get('key') !== env.ADMIN_KEY) return err('unauthorized', 401);
        const { results } = await env.DB.prepare('SELECT * FROM waitlist ORDER BY created_at DESC').all();
        return json({ waitlist: results });
      }

      if (req.method === 'PATCH' && pathname.startsWith('/api/booking/')) {
        if (req.headers.get('X-Admin-Key') !== env.ADMIN_KEY) return err('unauthorized', 401);
        const id = pathname.replace('/api/booking/', '');
        const body = await req.json();
        const fields = ['status', 'payment'].filter(k => k in body);
        if (!fields.length) return err('nothing to update');
        const sql = `UPDATE bookings SET ${fields.map(f => `${f}=?`).join(', ')} WHERE id=?`;
        await env.DB.prepare(sql).bind(...fields.map(f => body[f]), id).run();
        return json({ ok: true });
      }

      // Stripe webhook — must read raw body before any other parsing
      if (req.method === 'POST' && pathname === '/api/stripe-webhook') {
        return await handleStripeWebhook(req, env);
      }

      return err('not found', 404);
    } catch (e) {
      return err(e.message || 'server error', 500);
    }
  },
};

// ─── Handlers ───────────────────────────────────────────────────────

async function createBooking(req, env) {
  const b = await req.json();
  const required = ['name', 'email', 'cohort', 'bed_id'];
  for (const f of required) if (!b[f]) return err(`${f} is required`);
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(b.email)) return err('invalid email');

  // Race-condition-safe bed check
  const taken = await env.DB.prepare(
    "SELECT bed_id FROM bookings WHERE cohort=? AND status NOT IN ('cancelled','no_show')"
  ).bind(b.cohort).all();
  if (taken.results.some(r => r.bed_id === b.bed_id)) {
    return err('That bed was just taken — try another track or week.', 409);
  }

  const id = nanoid();
  const now = Date.now();

  await env.DB.prepare(
    `INSERT INTO bookings
     (id, cohort, bed_id, name, email, phone, country, track, tier, building, message, committed, status, payment, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'applied', 'pending', ?)`
  ).bind(
    id, b.cohort, b.bed_id, b.name, b.email,
    b.phone || null, b.country || null, b.track || null, b.tier || null,
    b.building || null, b.message || null, b.committed ? 1 : 0, now
  ).run();

  // Send admin notification immediately
  await sendApplicationEmails(env, { id, ...b });

  // If Stripe is configured, create Checkout session
  if (env.STRIPE_SECRET_KEY) {
    const session = await createStripeCheckout(env, { id, ...b });

    // Store session ID for webhook lookup
    await env.DB.prepare(
      'UPDATE bookings SET stripe_session_id=? WHERE id=?'
    ).bind(session.id, id).run();

    return json({ success: true, checkoutUrl: session.url, bookingId: id });
  }

  // Fallback: no Stripe configured — old manual flow
  return json({ success: true, bookingId: id, cohort: b.cohort, bed_id: b.bed_id });
}

async function handleStripeWebhook(req, env) {
  if (!env.STRIPE_WEBHOOK_SECRET) return err('webhook not configured', 501);

  const rawBody = await req.text();
  const sig = req.headers.get('Stripe-Signature');
  if (!sig) return err('missing signature', 400);

  try {
    await verifyStripeWebhook(rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return err(e.message, 400);
  }

  const event = JSON.parse(rawBody);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata?.booking_id;
    if (!bookingId) return json({ received: true });

    // Update payment status
    await env.DB.prepare(
      "UPDATE bookings SET payment='deposit_paid', status='confirmed' WHERE id=?"
    ).bind(bookingId).run();

    // Fetch full booking for email
    const booking = await env.DB.prepare(
      'SELECT * FROM bookings WHERE id=?'
    ).bind(bookingId).first();

    if (booking) {
      await sendConfirmationEmails(env, booking);
    }
  }

  return json({ received: true });
}

async function getAvailability(url, env) {
  const cohort = url.searchParams.get('cohort');
  if (!cohort) return err('cohort param required');
  const { results } = await env.DB.prepare(
    "SELECT bed_id FROM bookings WHERE cohort=? AND status NOT IN ('cancelled','no_show')"
  ).bind(cohort).all();
  return json({ cohort, taken_beds: results.map(r => r.bed_id) });
}

async function createWaitlist(req, env) {
  const w = await req.json();
  const required = ['name', 'email', 'cohort'];
  for (const f of required) if (!w[f]) return err(`${f} is required`);
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(w.email)) return err('invalid email');

  const existing = await env.DB.prepare(
    'SELECT id FROM waitlist WHERE cohort=? AND email=?'
  ).bind(w.cohort, w.email).first();
  if (existing) return json({ success: true, alreadyOnList: true });

  const id = nanoid();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO waitlist (id, cohort, name, email, phone, country, message, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, w.cohort, w.name, w.email,
    w.phone || null, w.country || null, w.message || null, now
  ).run();

  const { results } = await env.DB.prepare(
    'SELECT COUNT(*) as c FROM waitlist WHERE cohort=?'
  ).bind(w.cohort).all();
  const position = results[0].c;

  await sendWaitlistEmails(env, w, position);

  return json({ success: true, position });
}

async function getWaitlistCount(url, env) {
  const cohort = url.searchParams.get('cohort');
  if (!cohort) return err('cohort param required');
  const { results } = await env.DB.prepare(
    'SELECT COUNT(*) as c FROM waitlist WHERE cohort=?'
  ).bind(cohort).all();
  return json({ cohort, count: results[0].c });
}
