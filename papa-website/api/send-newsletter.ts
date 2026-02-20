// api/send-newsletter.ts
// Run: npm install resend

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const { blogTitle, blogContent, blogImage, blogCategory, blogUrl } = await req.json();

    // 1. Fetch subscribers from Supabase
    // IMPORTANT: Use non-VITE_ prefixed env vars set in Vercel dashboard
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: subscribers, error: subError } = await supabaseAdmin
      .from('marketing_subscribers')
      .select('email');

    if (subError) throw new Error(subError.message);
    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ emailsSent: 0 }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // 2. First 2 sentences as preview
    const sentences = blogContent.replace(/\n+/g, ' ').match(/[^.!?]+[.!?]+/g) || [];
    const preview = sentences.slice(0, 2).join(' ').trim() || blogContent.slice(0, 200) + '...';
    const siteUrl = process.env.SITE_URL || 'https://rushsh.dev';

    // 3. Email HTML
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

    // 4. Send via Resend SDK
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emails = subscribers.map((s: { email: string }) => s.email);
    let totalSent = 0;

    for (let i = 0; i < emails.length; i += 50) {
      const batch = emails.slice(i, i + 50);

      const { data: _data, error } = await resend.emails.send({
        from: 'Daniel Papa Real Estate <rushabh1404@gmail.com>',
        to: batch,
        subject: blogTitle,
        html: emailHtml,
      });

      if (error) throw new Error(error.message);
      totalSent += batch.length;
    }

    return new Response(JSON.stringify({ emailsSent: totalSent }), {
      status: 200,
      headers: corsHeaders,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}