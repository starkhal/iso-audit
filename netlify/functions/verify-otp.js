const crypto = require('crypto');

const SESSION_DURATION_SEC = 8 * 3600; // 8 hours

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email, otp, challenge;
  try {
    ({ email, otp, challenge } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!email || !otp || !challenge) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Missing fields' }) };
  }

  const secret = process.env.HMAC_SECRET;
  if (!secret) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  const dotIdx = challenge.indexOf('.');
  if (dotIdx === -1) {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid challenge' }) };
  }

  const expiry = parseInt(challenge.slice(0, dotIdx), 10);
  const mac = challenge.slice(dotIdx + 1);

  if (isNaN(expiry) || Math.floor(Date.now() / 1000) > expiry) {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Code expired' }) };
  }

  const normalized = email.trim().toLowerCase();

  const expected = crypto.createHmac('sha256', secret)
    .update(`${normalized}:${otp}:${expiry}`)
    .digest('hex');

  // timingSafeEqual requires same-length buffers
  let valid = false;
  try {
    const macBuf = Buffer.from(mac.padEnd(expected.length, '0'), 'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (macBuf.length === expBuf.length) {
      valid = crypto.timingSafeEqual(macBuf, expBuf) && mac.length === expected.length;
    }
  } catch {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid code' }) };
  }

  if (!valid) {
    return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid code' }) };
  }

  // Issue a signed session token (8h)
  const sessionExpiry = Math.floor(Date.now() / 1000) + SESSION_DURATION_SEC;
  const sessionMac = crypto.createHmac('sha256', secret)
    .update(`session:${normalized}:${sessionExpiry}`)
    .digest('hex');
  const token = `${Buffer.from(normalized).toString('base64url')}.${sessionExpiry}.${sessionMac}`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  };
};
