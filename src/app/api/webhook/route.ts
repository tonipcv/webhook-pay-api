import { NextResponse } from 'next/server';
import { WebhookService } from '@/services/webhookService';
import { WebhookPayload } from '@/types/webhook';

export async function POST(request: Request) {
  try {
    const payload = await request.json() as WebhookPayload;
    
    // Process the webhook
    const webhookService = WebhookService.getInstance();
    const result = await webhookService.processWebhook(payload);

    return NextResponse.json(
      { message: result.message },
      { status: result.success ? 200 : 400 }
    );
  } catch (error) {
    console.error('Error processing webhook request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 