# MongoDB Connection Pool Fix Plan

## Problem Statement

The current MongoDB connection management implementation suffers from connection leakage in Next.js development mode. The issue stems from how connections are managed across hot module reloads, which creates multiple connection pools rather than reusing a single pool.

Logs show connections increasing from 104 to 130 after just 3 user sessions, confirming the leakage.

## Root Cause Analysis

1. **Module Reloading Issue:**
   - Next.js development mode reloads modules frequently
   - Each reload creates new instances of module-level variables
   - Current implementation loses reference to previous connections but they remain active

2. **Connection Factory vs Singleton:**
   - Current: Uses a factory function to create new clients on demand:
     ```typescript
     const createMongoClient = () => new MongoClient(url, mongoClientOptions);
     ```
   - This creates a new pool for each reload or reconnection attempt

3. **Overly Complex Connection Management:**
   - TTL-based connection cycling
   - Active operation tracking
   - Explicit connection closing
   - All these features become problematic during development reloads

## Solution: Simplified Connection Management

The solution is to adopt the simpler approach from the big5 implementation, which has proven reliable without connection leakage issues.

## Implementation Plan

### Phase 1: Core Implementation

1. **Replace Factory with Module-Level Client:**
   - Replace the factory function with a single instance that persists across reloads
   - Use a global variable to ensure instance persistence in development

2. **Remove TTL-Based Connection Management:**
   - Remove connection lifetime tracking
   - Rely on MongoDB driver's built-in connection management

3. **Simplify Connection Function:**
   - Remove connection refresh logic
   - Focus on simple caching pattern that returns existing connection when available

### Phase 2: Transition Approach

To ensure a smooth transition while maintaining existing functionality:

1. **Implement Backwards Compatible API:**
   - Maintain existing function signatures
   - Keep operation tracking for monitoring but not for connection management

2. **Preserve Monitoring Capabilities:**
   - Keep the connection status monitoring endpoint
   - Modify to use the simplified connection approach

3. **Update Connection Logic:**
   - Modify connection status to work with the new singleton approach
   - Keep logging for diagnostics but remove connection management logic

### Phase 3: Testing and Verification

1. **Development Mode Testing:**
   - Run the app in development mode with multiple users
   - Monitor connection count over time
   - Verify connection counts remain stable

2. **Production Mode Testing:**
   - Test in production mode
   - Verify connections are being properly pooled and reused

## Detailed Code Changes

### 1. Simplified Database Module

Replace the current implementation with:

```typescript
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
```

### 2. Update Action Implementation

The server actions don't need to change, as they already use the `connectToDatabase()` function, which will now return connections from the global singleton.

### 3. Monitoring Implementation

Keep the monitoring endpoint as is, but it will now use the new connection management approach through the updated `getConnectionStatus()` function.

## Expected Benefits

1. **Elimination of Connection Leakage:**
   - Single global client prevents multiple pools in development
   - Connections properly reused between module reloads

2. **Enhanced Stability:**
   - Simplified connection management
   - Fewer moving parts and failure modes

3. **Better Resource Utilization:**
   - Reduced memory usage from fewer connection pools
   - More efficient connection reuse

4. **TypeScript Compatibility:**
   - Type-safe implementation for deployment environments
   - Handles environment variables safely with defaults
   - Avoids using internal MongoDB properties that aren't in TypeScript definitions

## Rollback Plan

If issues arise with the new implementation:

1. Keep a backup of the original implementation
2. Revert to the original files
3. Consider implementing a hybrid approach that preserves active connection tracking while using the global singleton pattern

## Success Metrics

The implementation will be considered successful if:

1. Connection count stabilizes and doesn't grow over time
2. The MongoDB server shows proper connection pooling
3. No functional regressions occur during testing
4. Performance remains the same or improves