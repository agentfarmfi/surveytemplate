import { NextRequest, NextResponse } from 'next/server';
import { closeConnection, getConnectionStatus } from '@/db';

// This is a special endpoint ONLY for resetting database connections in emergencies
export async function GET(request: NextRequest) {
  try {
    // Get current status
    const statusBefore = await getConnectionStatus();
    
    // Force close all connections
    await closeConnection();
    
    // Create a new client to check status after reset
    const statusAfter = await getConnectionStatus();
    
    return NextResponse.json({
      success: true,
      message: 'All database connections have been reset',
      statusBefore,
      statusAfter,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error resetting database connections:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to reset database connections', 
        message: String(error) 
      },
      { status: 500 }
    );
  }
}