import type { IncomingMessage, ServerResponse } from 'node:http';
import Stripe from 'stripe';

function env(name: string) {
  return process.env[name]?.trim();
}

const stripeSecretKey = env('STRIPE_SECRET_KEY');

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
    })
  : null;

const priceMap = {
  foundation_reset: env('STRIPE_PRICE_FOUNDATION') || 'price_1TJBc52OVEwOE8aYaE3nArUE',
  core_sculpt: env('STRIPE_PRICE_CORE') || 'price_1TJBch2OVEwOE8aYXBoqzEIT',
  elite_flow: env('STRIPE_PRICE_ELITE') || 'price_1TJBdP2OVEwOE8aYVc8W9IWb',
} as const;

type ProgramType = keyof typeof priceMap;

function json(res: ServerResponse, statusCode: number, body: Record<string, unknown>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function readJsonBody<T>(req: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as T;
}

function getBaseUrl(req: IncomingMessage) {
  return env('APP_URL') || env('PUBLIC_APP_URL') || `https://${req.headers.host}`;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!stripe) {
    console.error('Stripe checkout init failed: missing STRIPE_SECRET_KEY');
    return json(res, 500, { error: 'Missing STRIPE_SECRET_KEY' });
  }

  try {
    const body = await readJsonBody<{ program?: ProgramType; email?: string }>(req);
    const program = body.program;

    if (!program || !(program in priceMap)) {
      console.error('Stripe checkout error: invalid program payload', body);
      return json(res, 400, { error: 'Invalid program' });
    }

    const baseUrl = getBaseUrl(req);
    console.log('Creating Stripe checkout session', {
      program,
      price: priceMap[program],
      host: req.headers.host,
      hasSecretKey: Boolean(stripeSecretKey),
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceMap[program],
          quantity: 1,
        },
      ],
      customer_email: body.email || undefined,
      success_url: `${baseUrl}/?payment=success&program=${program}`,
      cancel_url: `${baseUrl}/?payment=cancel&program=${program}`,
      metadata: {
        program,
      },
    });

    return json(res, 200, { url: session.url });
  } catch (error) {
    console.error('Stripe checkout session creation failed', error);
    const message = error instanceof Error ? error.message : 'Checkout session creation failed';
    return json(res, 500, { error: message });
  }
}
