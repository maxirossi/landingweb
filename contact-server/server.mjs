// Servicio de contacto de matelabs.site.
// Recibe el formulario de la landing y avisa al equipo por MateMessaging
// (mismo server, 127.0.0.1:8060). Sin dependencias: Node 20 alcanza.
// nginx: location /api/ -> 127.0.0.1:8011 (strip /api).
import http from 'node:http';

const PORT = Number(process.env.PORT || 8011);
const MM_URL = process.env.MATEMESSAGING_URL || 'http://127.0.0.1:8060';
const MM_KEY = process.env.MATEMESSAGING_API_KEY || '';
const FROM = process.env.MATEMESSAGING_EMAIL_FROM || 'MateLabs Landing <noreply@matelabs.site>';
const TO = process.env.CONTACT_EMAIL || 'hola@matelabs.com.ar';

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const rateMap = new Map();

const TOPICS = {
  '1': 'Cotizar proyecto',
  '2': 'App o sistema',
  '3': 'Integrar IA',
  '4': 'Consulta general',
};

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function limited(ip) {
  const now = Date.now();
  const e = rateMap.get(ip);
  if (!e || now > e.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  return ++e.count > RATE_LIMIT;
}

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readBody(req, max = 16 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > max) {
        reject(new Error('too_large'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function sendMail({ name, email, message, topic, source }) {
  const topicText = TOPICS[topic] || topic || 'Contacto';
  // Sin saltos de línea: el asunto lleva texto del visitante.
  const subject = `[MateLabs] ${topicText} — ${name}`.replace(/\s+/g, ' ').slice(0, 200);
  const html =
    `<h2>Nuevo contacto desde la landing</h2>` +
    `<p><strong>Nombre:</strong> ${esc(name)}</p>` +
    `<p><strong>Email:</strong> ${esc(email)}</p>` +
    `<p><strong>Tema:</strong> ${esc(topicText)}</p>` +
    `<p><strong>Origen:</strong> ${esc(source)}</p><hr>` +
    `<p style="white-space:pre-wrap">${esc(message)}</p>`;

  const resp = await fetch(`${MM_URL}/api/v1/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${MM_KEY}` },
    body: JSON.stringify({
      channel: 'email',
      recipient: TO,
      subject,
      message: html,
      from_email: FROM,
      reply_to: email,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (resp.status !== 200 && resp.status !== 202) {
    console.error('MateMessaging rechazó el mail:', resp.status, (await resp.text()).slice(0, 200));
    return false;
  }
  return true;
}

http
  .createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/health') return json(res, 200, { status: 'ok' });
    if (req.method !== 'POST' || req.url !== '/contact') return json(res, 404, { error: 'not_found' });

    const ip = String(req.headers['x-real-ip'] || req.socket.remoteAddress || 'unknown');
    if (limited(ip)) return json(res, 429, { error: 'rate_limited' });

    let body;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      return json(res, 400, { error: 'invalid_json' });
    }

    const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
    const data = {
      name: clean(body.name, 120),
      email: clean(body.email, 254),
      message: clean(body.message, 5000),
      topic: clean(body.topic, 20),
      source: clean(body.source, 40) || 'landing',
    };
    if (!data.name || !data.email || !data.message) return json(res, 400, { error: 'missing_fields' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json(res, 400, { error: 'invalid_email' });
    if (!MM_KEY) {
      console.error('MATEMESSAGING_API_KEY no configurada');
      return json(res, 503, { error: 'not_configured' });
    }

    try {
      if (await sendMail(data)) return json(res, 200, { ok: true });
    } catch (err) {
      console.error('Error mandando por MateMessaging:', err);
    }
    // El front muestra "algo salió mal" solo si no ok: no mentimos si no salió.
    return json(res, 502, { error: 'send_failed' });
  })
  .listen(PORT, '127.0.0.1', () => console.log(`matelabs-contact en 127.0.0.1:${PORT}`));
