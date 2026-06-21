const crypto = require('crypto');
const nodemailer = require('nodemailer');

const ALLOWED_DOMAINS = ['airfrance.fr'];
const OTP_EXPIRY_SEC = 10 * 60; // 10 minutes

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!email || typeof email !== 'string') {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Email required' }) };
  }

  const normalized = email.trim().toLowerCase();
  const domain = normalized.split('@')[1];

  if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
    return { statusCode: 403, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Email domain not authorized' }) };
  }

  const secret = process.env.HMAC_SECRET;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;

  if (!secret || !gmailUser || !gmailPass) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  // Cryptographically secure 6-digit OTP
  const otp = String(crypto.randomInt(100000, 1000000));
  const expiry = Math.floor(Date.now() / 1000) + OTP_EXPIRY_SEC;

  // HMAC-signed challenge — no database needed
  const mac = crypto.createHmac('sha256', secret)
    .update(`${normalized}:${otp}:${expiry}`)
    .digest('hex');
  const challenge = `${expiry}.${mac}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"ISO 27002 Audit" <${gmailUser}>`,
      to: normalized,
      subject: 'Your ISO 27002 Audit — Access Code',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#fff">
          <p style="font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#9ca3af;margin:0 0 28px;font-family:monospace">
            ISO 27002:2022 — Self-Assessment
          </p>
          <h2 style="font-size:22px;font-weight:700;color:#111;margin:0 0 10px;letter-spacing:-.02em">
            Your access code
          </h2>
          <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:0 0 28px">
            Use the code below to access the audit tool. It expires in <strong>10 minutes</strong>.
          </p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:28px;text-align:center;margin:0 0 28px">
            <span style="font-family:monospace;font-size:38px;font-weight:700;letter-spacing:10px;color:#0f172a">
              ${otp}
            </span>
          </div>
          <p style="font-size:12px;color:#94a3b8;margin:0;line-height:1.5">
            If you did not request this code, you can safely ignore this email.
          </p>
        </div>`,
    });
  } catch (err) {
    console.error('Gmail send error:', err.message);
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to send email. Try again.' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challenge }),
  };
};
