// src/lib/sendNewsletter.ts
// Calls the Vercel serverless function at /api/send-newsletter
// which runs server-side — no CORS issues

interface BlogPayload {
  blogTitle: string;
  blogContent: string;
  blogImage: string;
  blogCategory: string;
  blogUrl: string;
}

export async function sendBlogNewsletter(blog: BlogPayload): Promise<number> {
  const res = await fetch('/api/send-newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to send newsletter');
  }

  const data = await res.json();
  return data.emailsSent ?? 0;
}