// api/send-newsletter.ts
// Vercel serverless function — lives at /api/send-newsletter
// Vercel runs this server-side, so no CORS issues with Resend.
//
// Add to your Vercel dashboard (or .env for local dev):
//   RESEND_API_KEY=re_xxxxxxxxxx
//   SUPABASE_URL=https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=eyJ...   ← NOT the anon key, the service role key
//   VITE_SITE_URL=https://danielpaparealty.com
//
// The service role key is in Supabase Dashboard → Project Settings → API → service_role

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { blogTitle, blogContent, blogImage, blogCategory, blogUrl } = req.body;

  try {
    // 1. Fetch subscribers using service role key (bypasses RLS)
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: subscribers, error: subError } = await supabaseAdmin
      .from('marketing_subscribers')
      .select('email');

    if (subError) throw new Error(subError.message);
    if (!subscribers || subscribers.length === 0) {
      return res.status(200).json({ emailsSent: 0 });
    }

    // 2. Build preview from first 2 sentences
    const sentences = blogContent.replace(/\n+/g, ' ').match(/[^.!?]+[.!?]+/g) || [];
    const preview = sentences.slice(0, 2).join(' ').trim() || blogContent.slice(0, 200) + '...';

    const siteUrl = process.env.VITE_SITE_URL || 'https://danielpaparealty.com';

    // 3. Build email HTML
    const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border:1px solid #e8e4dc;">
        <tr><td style="background:#4a0404;padding:28px 40px;text-align:center;">
          <p style="margin:0;color:#c5a021;font-family:Arial,sans-serif;font-size:9px;letter-spacing:5px;text-transform:uppercase;font-weight:bold;">Daniel Papa Real Estate</p>
          <p style="margin:8px 0 0;color:#fff;font-family:Arial,sans-serif;font-size:8px;letter-spacing:4px;text-transform:uppercase;opacity:0.6;">The Journal</p>
        </td></tr>
        <tr><td style="padding:28px 40px 0;text-align:center;">
          <p style="margin:0;color:#c5a021;font-family:Arial,sans-serif;font-size:9px;letter-spacing:4px;text-transform:uppercase;font-weight:bold;">${blogCategory}</p>
        </td></tr>
        <tr><td style="padding:12px 40px 24px;text-align:center;">
          <h1 style="margin:0;color:#4a0404;font-family:'Georgia',serif;font-size:28px;font-weight:300;line-height:1.3;">${blogTitle}</h1>
        </td></tr>
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e8e4dc;margin:0;"/></td></tr>
        ${blogImage ? `<tr><td style="padding:0;"><img src="${blogImage}" alt="${blogTitle}" width="600" style="display:block;width:100%;max-width:600px;height:320px;object-fit:cover;"/></td></tr>` : ''}
        <tr><td style="padding:36px 40px 24px;">
          <p style="margin:0;color:#444;font-family:'Georgia',serif;font-size:16px;line-height:1.8;font-style:italic;">${preview}</p>
        </td></tr>
        <tr><td style="padding:8px 40px 40px;text-align:center;">
          <a href="${blogUrl}" style="display:inline-block;background:#4a0404;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;padding:16px 36px;font-weight:bold;">Continue Reading</a>
        </td></tr>
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e8e4dc;margin:0;"/></td></tr>
        <tr><td style="padding:28px 40px;text-align:center;background:#fafaf8;">
          <p style="margin:0 0 8px;color:#4a0404;font-family:Arial,sans-serif;font-size:9px;letter-spacing:4px;text-transform:uppercase;font-weight:bold;">Daniel Papa Real Estate</p>
          <p style="margin:0 0 16px;color:#999;font-family:Arial,sans-serif;font-size:11px;line-height:1.6;">You're receiving this because you signed up for market insights &amp; editorial updates.</p>
          <a href="${siteUrl}/unsubscribe" style="color:#c5a021;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">Unsubscribe</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    // 4. Send via Resend in batches of 50
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) throw new Error('RESEND_API_KEY not set');

    const emails = subscribers.map((s: { email: string }) => s.email);
    let totalSent = 0;

    for (let i = 0; i < emails.length; i += 50) {
      const batch = emails.slice(i, i + 50);
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Daniel Papa Real Estate <newsletter@danielpaparealty.com>',
          to: batch,
          subject: blogTitle,
          html: emailHtml,
        }),
      });

      if (!response.ok) throw new Error(`Resend error: ${await response.text()}`);
      totalSent += batch.length;
    }

    return res.status(200).json({ emailsSent: totalSent });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}