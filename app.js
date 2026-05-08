import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

/* ── Middleware ─────────────────────────────────────── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));

/* ── Nodemailer transport ───────────────────────────── */
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'mjnautomotive@hotmail.com',
    pass: process.env.SMTP_PASS || '',
  },
  tls: { ciphers: 'SSLv3' },
});

/* ── Contact form endpoint ──────────────────────────── */
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, vehicle, message } = req.body;

  /* Server-side validation */
  const errors = {};
  if (!name || name.trim().length < 2)
    errors.name = 'Please enter your name.';
  if (!phone || !/^[\d\s\+\-\(\)]{6,20}$/.test(phone.trim()))
    errors.phone = 'Please enter a valid phone number.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (!message || message.trim().length < 10)
    errors.message = 'Please describe the service or issue (min 10 characters).';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ ok: false, errors });
  }

  /* Sanitise inputs */
  const safe = (v = '') => String(v).replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const mailOptions = {
    from: `"MJN Automotive Website" <${process.env.SMTP_USER || 'mjnautomotive@hotmail.com'}>`,
    to: 'mjnautomotive@hotmail.com',
    replyTo: email.trim(),
    subject: `New Service Enquiry — ${safe(name)}`,
    text: [
      'New enquiry from the MJN Automotive website',
      '',
      `Name:    ${safe(name)}`,
      `Phone:   ${safe(phone)}`,
      `Email:   ${safe(email)}`,
      `Vehicle: ${safe(vehicle) || 'Not provided'}`,
      '',
      'Message:',
      safe(message),
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="background:#EF1D2A;color:#fff;padding:16px 24px;margin:0;border-radius:8px 8px 0 0">
          New Service Enquiry — MJN Automotive
        </h2>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;width:90px"><strong>Name</strong></td><td style="padding:8px 0">${safe(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280"><strong>Phone</strong></td><td style="padding:8px 0"><a href="tel:${safe(phone)}">${safe(phone)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${safe(email)}">${safe(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280"><strong>Vehicle</strong></td><td style="padding:8px 0">${safe(vehicle) || '<em style="color:#9ca3af">Not provided</em>'}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
          <p style="color:#6b7280;margin:0 0 8px"><strong>Message</strong></p>
          <p style="white-space:pre-wrap;margin:0">${safe(message)}</p>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px;text-align:center">
          Sent from mjnautomotive.com.au
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    return res.status(500).json({ ok: false, error: 'Failed to send email. Please call us directly.' });
  }
});

/* ── SPA fallback ───────────────────────────────────── */
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`MJN Auto website running at http://127.0.0.1:${PORT}`);
});
