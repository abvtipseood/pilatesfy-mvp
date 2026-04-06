import type { IncomingMessage, ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
    })
  : null;

type ProgramKey = 'foundation' | 'core' | 'elite';

const pdfConfig: Record<
  ProgramKey,
  {
    label: string;
    path?: string;
    url?: string;
    fallbackPath?: string;
    fallbackUrl?: string;
  }
> = {
  foundation: {
    label: 'Foundation PDF',
    path: process.env.FOUNDATION_PDF_PATH,
    url: process.env.FOUNDATION_PDF_URL,
    fallbackPath: process.env.FOUNDATION_RESET_PDF_PATH,
    fallbackUrl: process.env.FOUNDATION_RESET_PDF_URL,
  },
  core: {
    label: 'Core PDF',
    path: process.env.CORE_PDF_PATH,
    url: process.env.CORE_PDF_URL,
    fallbackPath: process.env.CORE_SCULPT_PDF_PATH,
    fallbackUrl: process.env.CORE_SCULPT_PDF_URL,
  },
  elite: {
    label: 'Elite PDF',
    path: process.env.ELITE_PDF_PATH,
    url: process.env.ELITE_PDF_URL,
    fallbackPath: process.env.ELITE_FLOW_PDF_PATH,
    fallbackUrl: process.env.ELITE_FLOW_PDF_URL,
  },
};

function json(res: ServerResponse, statusCode: number, body: Record<string, unknown>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function readRawBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}

function normalizeProgram(value: string | undefined): ProgramKey | null {
  switch (value) {
    case 'foundation':
    case 'foundation_reset':
      return 'foundation';
    case 'core':
    case 'core_sculpt':
      return 'core';
    case 'elite':
    case 'elite_flow':
      return 'elite';
    default:
      return null;
  }
}

async function getPdfAttachment(program: ProgramKey) {
  const entry = pdfConfig[program];
  const filePath = entry.path || entry.fallbackPath;
  const fileUrl = entry.url || entry.fallbackUrl;

  if (filePath) {
    const content = await readFile(filePath);

    return {
      attachment: {
        filename: `${program}.pdf`,
        content: content.toString('base64'),
      },
      downloadUrl: null,
      label: entry.label,
    };
  }

  if (fileUrl) {
    return {
      attachment: null,
      downloadUrl: fileUrl,
      label: entry.label,
    };
  }

  throw new Error(`Missing PDF configuration for program "${program}"`);
}

async function sendProgramEmail(to: string, program: ProgramKey) {
  if (!resendApiKey || !fromEmail) {
    throw new Error('Missing RESEND_API_KEY or FROM_EMAIL');
  }

  const pdf = await getPdfAttachment(program);

  const html = pdf.downloadUrl
    ? `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#2E2A2B">
        <h2>Твоята Pilatesfy програма е готова</h2>
        <p>Благодарим ти за покупката. Тук е твоята програма:</p>
        <p><a href="${pdf.downloadUrl}" style="color:#DDB7BF;font-weight:700">${pdf.label}</a></p>
      </div>
    `
    : `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#2E2A2B">
        <h2>Твоята Pilatesfy програма е готова</h2>
        <p>Благодарим ти за покупката. Прикачили сме твоя PDF файл към този имейл.</p>
      </div>
    `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject: 'Твоята Pilatesfy програма',
      html,
      attachments: pdf.attachment ? [pdf.attachment] : undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${errorText}`);
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!stripe || !stripeWebhookSecret) {
    return json(res, 500, {
      error: 'Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET',
    });
  }

  const signature = req.headers['stripe-signature'];

  if (!signature || Array.isArray(signature)) {
    return json(res, 400, { error: 'Missing Stripe signature' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown webhook verification error';
    return json(res, 400, { error: message });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email ?? null;
    const program = normalizeProgram(session.metadata?.program);

    if (!email) {
      return json(res, 400, { error: 'Missing customer email in checkout session' });
    }

    if (!program) {
      return json(res, 400, { error: 'Missing or invalid program in checkout session metadata' });
    }

    try {
      await sendProgramEmail(email, program);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Email sending failed';
      return json(res, 500, { error: message });
    }
  }

  return json(res, 200, { received: true });
}
