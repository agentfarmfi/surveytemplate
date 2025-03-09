import mongodb, { MongoClient } from 'mongodb';

const url = process.env.DB_URL;
if (!url) {
  throw new Error(
    'Please define the DB_URL environment variable inside .env.local'
  );
}

const dbName = process.env.DB_NAME || 'results';

// Track active operations to prevent premature connection closing
let activeOperations = 0;
let isClosing = false;
let connectionTimestamp: number = 0;
const CONNECTION_TTL = 60000; // 1 minute TTL for connections

// Configure connection pool size for high concurrent usage
const mongoClientOptions = {
  maxPoolSize: 100, // Increased to support 500 concurrent users
  minPoolSize: 10, // Keep some connections ready for immediate use
  maxIdleTimeMS: 30000, // Increased idle timeout for connection reuse
  socketTimeoutMS: 45000, // Increased socket timeout for longer operations
  connectTimeoutMS: 15000 // Slightly increased connection timeout
};

// Use a function to create client instead of a global instance
const createMongoClient = () => new MongoClient(url, mongoClientOptions);

let cachedDb: mongodb.Db | null = null;
let cachedClient: MongoClient | null = null;

// Setup connection cleanup
if (typeof process !== 'undefined') {
  // Register shutdown handlers
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      console.log(`Received ${signal}, closing MongoDB connections`);
      await closeConnection();
      process.exit(0);
    });
  });
}

export async function connectToDatabase() {
  // Check if connection is stale (older than TTL)
  const now = Date.now();
  if (cachedDb && cachedClient && now - connectionTimestamp > CONNECTION_TTL) {
    console.log('Connection TTL exceeded, refreshing connection');
    await closeConnection();
  }
  
  if (cachedDb) {
    // Update timestamp on reuse to implement TTL
    connectionTimestamp = now;
    return cachedDb;
  }

  try {
    const client = createMongoClient();
    await client.connect();
    cachedClient = client;
    const db = client.db(dbName);
    cachedDb = db;
    connectionTimestamp = now;
    
    // Handle serverless function termination
    if (typeof gc !== 'undefined') {
      // This will run before a serverless function instance is frozen
      (global as any).__beforeExit = async () => {
        await closeConnection();
      };
    }
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Track database operations to safely close connections
export function trackOperation<T>(operation: () => Promise<T>): Promise<T> {
  activeOperations++;
  return operation().finally(() => {
    activeOperations--;
    
    // If we're trying to close and this was the last operation, close now
    if (isClosing && activeOperations === 0) {
      closeConnectionInternal();
    }
  });
}

// Internal function to actually close the connection
async function closeConnectionInternal() {
  if (cachedClient) {
    try {
      await cachedClient.close(true); // Force close
      console.log('MongoDB connection closed successfully');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    } finally {
      cachedClient = null;
      cachedDb = null;
      isClosing = false;
    }
  }
}

// Public function to close the connection, which respects active operations
export async function closeConnection() {
  if (!cachedClient) return;
  
  isClosing = true;
  
  // If no active operations, close immediately
  if (activeOperations === 0) {
    await closeConnectionInternal();
  } else {
    console.log(`Waiting for ${activeOperations} operations to complete before closing`);
    // Otherwise, the connection will be closed when the last operation finishes
  }
}

// Utility function to check connection status (for debugging)
export async function getConnectionStatus() {
  if (!cachedClient) {
    return { 
      connected: false, 
      poolSize: 0, 
      activeOperations, 
      connectionAge: 0,
      ttl: CONNECTION_TTL
    };
  }
  
  try {
    // Get connection pool statistics
    const status = cachedClient.topology?.s?.state || 'unknown';
    const poolStats = cachedClient.topology?.s?.pool?.info?.size || 0;
    const activeConnections = cachedClient.topology?.connections?.size || 0;
    const connectionAge = Date.now() - connectionTimestamp;
    
    return {
      connected: status === 'connected',
      poolSize: poolStats,
      activeConnections,
      activeOperations,
      connectionAge,
      ttl: CONNECTION_TTL
    };
  } catch (error) {
    console.error('Error getting connection status:', error);
    return { 
      connected: false, 
      poolSize: 0, 
      activeConnections: 0, 
      activeOperations,
      connectionAge: Date.now() - connectionTimestamp,
      ttl: CONNECTION_TTL,
      error: String(error) 
    };
  }
}
