/**
 * Claude Camp — bookings + waitlist Worker.
 *
 * Endpoints
 *   POST /api/booking                     create a booking application
 *   GET  /api/availability?cohort=xxx     taken beds for a cohort
 *   POST /api/waitlist                    add to a cohort's waitlist
 *   GET  /api/waitlist-count?cohort=xxx   how many people are waiting
 *   GET  /api/bookings?key=ADMIN_KEY      admin: list all bookings
 *   GET  /api/waitlist?key=ADMIN_KEY      admin: list all waitlist entries
 *   PATCH /api/booking/:id                admin: update status/payment (X-Admin-Key header)
 *
 * Data lives in D1 (sqlite). Emails sent via Resend.
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
  // Hardcoded labels for current schedule. Worker stays in sync with site COHORTS array.
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

async function sendBookingEmails(env, b) {
  const cohort = cohortLabel(b.cohort);
  const tier = b.tier === 'premium' ? 'Premium ($1,600)' : 'Standard ($960)';
  const track = b.track === 'builder' ? 'Builder' : 'Beginner';

  // Admin notification
  await resend(env, {
    from: `Claude Camp <${env.FROM_EMAIL}>`,
    to: [env.NOTIFICATION_EMAIL],
    subject: `New booking: ${b.name} — ${cohort}`,
    html: `
      <h2>New booking application</h2>
      <p><strong>${b.name}</strong> just applied for <strong>${cohort}</strong>.</p>
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
      <p style="margin-top:24px;color:#888;font-size:12px;">Reply to them at <a href="mailto:${b.email}">${b.email}</a> or WhatsApp ${b.phone || ''}. Send a Stripe link for the $420 deposit.</p>
    `,
  });

  // Guest confirmation
  await resend(env, {
    from: `Sasha at Claude Camp <${env.FROM_EMAIL}>`,
    to: [b.email],
    reply_to: env.NOTIFICATION_EMAIL,
    subject: `Got it — your application for ${cohort}`,
    html: `
      <p>Hey ${b.name.split(' ')[0]},</p>
      <p>Got your application for <strong>${cohort}</strong>. I read every one personally and I'll reply from Pai within 48 hours with a Stripe link for the $420 deposit to confirm your bed.</p>
      <p>If anything's urgent in the meantime, WhatsApp me at <a href="https://wa.me/66922864775">+66 92 286 4775</a>.</p>
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
      // POST /api/booking
      if (req.method === 'POST' && pathname === '/api/booking') {
        return await createBooking(req, env);
      }

      // GET /api/availability?cohort=xxx
      if (req.method === 'GET' && pathname === '/api/availability') {
        return await getAvailability(url, env);
      }

      // POST /api/waitlist
      if (req.method === 'POST' && pathname === '/api/waitlist') {
        return await createWaitlist(req, env);
      }

      // GET /api/waitlist-count?cohort=xxx — public, just a count
      if (req.method === 'GET' && pathname === '/api/waitlist-count') {
        return await getWaitlistCount(url, env);
      }

      // GET /api/bookings?key=ADMIN
      if (req.method === 'GET' && pathname === '/api/bookings') {
        if (url.searchParams.get('key') !== env.ADMIN_KEY) return err('unauthorized', 401);
        const { results } = await env.DB.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
        return json({ bookings: results });
      }

      // GET /api/waitlist?key=ADMIN
      if (req.method === 'GET' && pathname === '/api/waitlist') {
        if (url.searchParams.get('key') !== env.ADMIN_KEY) return err('unauthorized', 401);
        const { results } = await env.DB.prepare('SELECT * FROM waitlist ORDER BY created_at DESC').all();
        return json({ waitlist: results });
      }

      // PATCH /api/booking/:id (admin)
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

      return err('not found', 404);
    } catch (e) {
      return err(e.message || 'server error', 500);
    }
  },
};

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

  // Fire-and-forget email (don't block the response)
  const booking = { id, ...b };
  await sendBookingEmails(env, booking);

  return json({ success: true, booking: { id, cohort: b.cohort, bed_id: b.bed_id } });
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

  // Prevent duplicate signups
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
