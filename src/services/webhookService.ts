import { WebhookPayload } from '../types/webhook';
import { DatabaseService } from './databaseService';

export class WebhookService {
  private static instance: WebhookService;
  private databaseService: DatabaseService;

  private constructor() {
    this.databaseService = DatabaseService.getInstance();
  }

  public static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  public async processWebhook(payload: WebhookPayload): Promise<{ success: boolean; message: string }> {
    try {
      // Save subscription data to database
      await this.databaseService.saveSubscription(payload);

      // Process the webhook data based on the status
      const status = payload.body.last_status;
      const subscriptionId = payload.body.id;

      switch (status) {
        case 'active':
          await this.handleActiveSubscription(payload);
          break;
        case 'inactive':
          await this.handleInactiveSubscription(payload);
          break;
        case 'waiting_payment':
          await this.handleWaitingPayment(payload);
          break;
        case 'canceled':
          await this.handleCanceledSubscription(payload);
          break;
        default:
          console.log(`Unhandled status: ${status} for subscription ${subscriptionId}`);
      }

      return {
        success: true,
        message: 'Webhook processed successfully'
      };
    } catch (error) {
      console.error('Error processing webhook:', error);
      return {
        success: false,
        message: 'Error processing webhook'
      };
    }
  }

  private async handleActiveSubscription(payload: WebhookPayload): Promise<void> {
    const { subscriber, product, current_invoice } = payload.body;
    console.log(`Subscription activated for ${subscriber.name} - Product: ${product.name}`);
    console.log(`Invoice details: ${current_invoice.code} - Value: ${current_invoice.value}`);
  }

  private async handleInactiveSubscription(payload: WebhookPayload): Promise<void> {
    const { subscriber, product } = payload.body;
    console.log(`Subscription deactivated for ${subscriber.name} - Product: ${product.name}`);
  }

  private async handleWaitingPayment(payload: WebhookPayload): Promise<void> {
    const { subscriber, product, last_transaction } = payload.body;
    console.log(`Waiting payment for ${subscriber.name} - Product: ${product.name}`);
    if (last_transaction.payment.pix) {
      console.log(`PIX payment details: ${last_transaction.payment.pix.qrcode.url}`);
    }
  }

  private async handleCanceledSubscription(payload: WebhookPayload): Promise<void> {
    const { subscriber, product, cancel_reason } = payload.body;
    console.log(`Subscription canceled for ${subscriber.name} - Product: ${product.name}`);
    console.log(`Cancel reason: ${cancel_reason}`);
  }
} 