import { NextRequest, NextResponse } from 'next/server';
import { getConnectionStatus, closeConnection } from '@/db';

// This API route allows monitoring and managing database connections
export async function GET(request: NextRequest) {
  try {
    const status = await getConnectionStatus();
    return NextResponse.json({ status, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get database status', message: String(error) },
      { status: 500 }
    );
  }
}

// POST request will force close connections
export async function POST(request: NextRequest) {
  try {
    // Only available to authenticated users or in development
    if (process.env.NODE_ENV !== 'development') {
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== process.env.ADMIN_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Close all connections
    await closeConnection();
    
    return NextResponse.json({ 
      message: 'Database connections closed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to close database connections', message: String(error) },
      { status: 500 }
    );
  }
}