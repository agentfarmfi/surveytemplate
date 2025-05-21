import mongodb, { MongoClient } from 'mongodb';

// Get database connection URL from environment with TypeScript safety
// Note: Use default empty string to ensure it's a string type
const dbUrl = process.env.DB_URL || "";
if (!dbUrl) {
  throw new Error('Please define the DB_URL environment variable inside .env.local');
}

const dbName = process.env.DB_NAME || 'results';

// Connection pool configuration
const mongoClientOptions = {
  maxPoolSize: 100,
  minPoolSize: 10,
  maxIdleTimeMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000
};

// Global singleton to persist across module reloads in development mode
declare global {
  var mongoClient: {
    client: MongoClient | null;
    promise: Promise<MongoClient> | null;
  };
}

// Initialize the global singleton
if (!global.mongoClient) {
  global.mongoClient = {
    client: null,
    promise: null
  };
}

// Simple connection tracking for logging purposes
let activeOperations = 0;
let operationCount = 0;

// Connect to database
export async function connectToDatabase() {
  // Return existing DB if client already connected
  if (global.mongoClient.client) {
    return global.mongoClient.client.db(dbName);
  }
  
  // If connection in progress, await it
  if (!global.mongoClient.promise) {
    console.log('🔌 Creating new MongoDB connection');
    
    // Create a new connection promise
    global.mongoClient.promise = new MongoClient(dbUrl, mongoClientOptions)
      .connect()
      .then(client => {
        console.log('✅ MongoDB connection established');
        return client;
      });
  }
  
  try {
    // Wait for the connection to establish
    const client = await global.mongoClient.promise;
    global.mongoClient.client = client;
    return client.db(dbName);
  } catch (error) {
    // Reset on error
    global.mongoClient.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Simplified operation tracking for monitoring
export function trackOperation<T>(operation: () => Promise<T>): Promise<T> {
  const operationId = ++operationCount;
  activeOperations++;
  
  console.log(`[DB:OP:${operationId}] 🔄 Operation started (active: ${activeOperations})`);
  
  const startTime = Date.now();
  return operation().finally(() => {
    activeOperations--;
    const duration = Date.now() - startTime;
    console.log(`[DB:OP:${operationId}] ✅ Operation completed in ${duration}ms (active: ${activeOperations})`);
  });
}

// Simplified status function for monitoring
export async function getConnectionStatus() {
  if (!global.mongoClient.client) {
    return { 
      connected: false, 
      poolSize: 0, 
      activeOperations,
      operationsPerformed: operationCount
    };
  }
  
  try {
    // Try to get MongoDB server stats if available
    let poolStats = { current: 0, available: 0 };
    
    try {
      const admin = global.mongoClient.client.db('admin');
      const serverStatus = await admin.command({ serverStatus: 1 });
      
      if (serverStatus?.connections) {
        poolStats = serverStatus.connections;
      }
    } catch (e) {
      // Ignore errors - stats not critical
    }
    
    // Check connection status in a TypeScript-safe way
    // Avoid using internal properties like topology that may not be in type definitions
    const isConnected = !!global.mongoClient.client;
    
    return {
      connected: isConnected,
      poolSize: poolStats.current,
      availableConnections: poolStats.available,
      activeConnections: poolStats.current - poolStats.available,
      activeOperations,
      operationsPerformed: operationCount,
      maxPoolSize: mongoClientOptions.maxPoolSize,
      minPoolSize: mongoClientOptions.minPoolSize
    };
  } catch (error) {
    console.error('Error getting connection status:', error);
    return { 
      connected: false, 
      error: String(error),
      activeOperations,
      operationsPerformed: operationCount
    };
  }
}

// For compatibility with code that expects this function
export async function closeConnection() {
  // This is intentionally a no-op in the new implementation
  // MongoDB driver handles connection lifecycle
  console.log('Note: closeConnection() is now a no-op as connections are managed by MongoDB driver');
  return;
}