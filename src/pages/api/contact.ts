export const prerender = false;

import type { APIRoute } from 'astro';

// Rate limiting: simple in-memory store (per-process)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// ── Slack ────────────────────────────────────────────────────────────
async function sendSlack(data: {
  name: string;
  email: string;
  message: string;
  topic: string;
  source: string;
}) {
  const webhookUrl = import.meta.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const topicLabels: Record<string, string> = {
    '1': 'Cotizar proyecto',
    '2': 'App o sistema',
    '3': 'Integrar IA',
    '4': 'Consulta general',
  };

  const topicText = topicLabels[data.topic] || data.topic || 'Formulario directo';

  const payload = {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: 'Nuevo contacto desde la landing' },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Nombre:*\n${data.name}` },
          { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
          { type: 'mrkdwn', text: `*Tema:*\n${topicText}` },
          { type: 'mrkdwn', text: `*Origen:*\n${data.source}` },
        ],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*Mensaje:*\n>${data.message}` },
      },
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// ── Email (Resend) ──────────────────────────────────────────────────
async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
  topic: string;
}) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_EMAIL || 'hola@matelabs.com.ar';
  if (!apiKey) return;

  const topicLabels: Record<string, string> = {
    '1': 'Cotizar proyecto',
    '2': 'App o sistema',
    '3': 'Integrar IA',
    '4': 'Consulta general',
  };

  const topicText = topicLabels[data.topic] || data.topic || 'Contacto';

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'MateLabs Landing <noreply@matelabs.com.ar>',
      to: [toEmail],
      reply_to: data.email,
      subject: `[MateLabs] ${topicText} — ${data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px;">
          <h2 style="color: #14b8a6;">Nuevo contacto</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Tema:</strong> ${escapeHtml(topicText)}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `,
    }),
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Handler ─────────────────────────────────────────────────────────
export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limit
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'rate_limited' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Parse body
  let body: { name?: string; email?: string; message?: string; topic?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, message, topic, source } = body;

  // Validate
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'missing_fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'invalid_email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send in parallel
  const payload = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    topic: topic || '',
    source: source || 'landing',
  };

  try {
    await Promise.allSettled([sendSlack(payload), sendEmail(payload)]);
  } catch {
    // Silent fail — we don't want to expose internal errors
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
