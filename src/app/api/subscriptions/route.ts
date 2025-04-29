import { NextResponse } from 'next/server';
import { DatabaseService } from '@/services/databaseService';

export async function GET() {
  try {
    const databaseService = DatabaseService.getInstance();
    const subscriptions = await databaseService.getAllSubscriptions();
    
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 