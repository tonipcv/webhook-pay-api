import { PrismaClient } from '@/generated/prisma';
import { WebhookPayload } from '../types/webhook';

const prisma = new PrismaClient();

export class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async saveSubscription(payload: WebhookPayload): Promise<void> {
    const { subscriber, product, last_status, payment_method, current_invoice } = payload.body;

    try {
      await prisma.subscriptionFuturosTechASAAS.upsert({
        where: {
          subscriptionId: payload.body.id,
        },
        update: {
          name: subscriber.name,
          email: subscriber.email,
          status: last_status,
          productName: product.name,
          paymentMethod: payment_method,
          value: current_invoice.value,
          updatedAt: new Date(),
        },
        create: {
          subscriptionId: payload.body.id,
          name: subscriber.name,
          email: subscriber.email,
          status: last_status,
          productName: product.name,
          paymentMethod: payment_method,
          value: current_invoice.value,
        },
      });
    } catch (error) {
      console.error('Error saving subscription:', error);
      throw error;
    }
  }

  public async getSubscription(subscriptionId: string) {
    return prisma.subscriptionFuturosTechASAAS.findUnique({
      where: {
        subscriptionId,
      },
    });
  }

  public async getAllSubscriptions() {
    return prisma.subscriptionFuturosTechASAAS.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
} 