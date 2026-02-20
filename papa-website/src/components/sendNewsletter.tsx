// src/lib/sendNewsletter.ts
// Calls the Vercel serverless function at /api/send-newsletter

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

  // Safely read the body ONCE as text first
  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // Response wasn't JSON (e.g. HTML 404 page) — give a useful error
    throw new Error(`Server returned non-JSON response (status ${res.status})`);
  }

  if (!res.ok) {
    throw new Error(data.error || `Failed to send newsletter (status ${res.status})`);
  }

  return data.emailsSent ?? 0;
}