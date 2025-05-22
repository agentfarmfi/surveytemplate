# API Implementation Guide

This document provides a comprehensive guide on how the API system for report retrieval is implemented in this application. Use this as a reference for implementing similar functionality in other applications.

## Overview

The API provides secure access to assessment results in JSON format via an authenticated endpoint. It allows external systems to retrieve test results using a report ID, with optional language specification. The API uses a token-based authentication system to ensure data security.

## Implementation Components

### 1. API Route Structure

The API is implemented using Next.js App Router API routes. The main components are:

- **Route Definition**: `/app/api/report/[id]/route.ts` defines a dynamic route with the report ID as a parameter
- **HTTP Methods**: Implements GET for data retrieval and OPTIONS for CORS preflight requests
- **Configuration**: Uses `dynamic = 'force-dynamic'` to ensure fresh data and `runtime = 'nodejs'` for server capabilities

### 2. Authentication System

The API uses a simple but effective Bearer token authentication:

- **API Key Storage**: The API key is stored in the `.env` file as `API_KEY`
- **Token Format**: Clients must send the token in the Authorization header using the Bearer scheme
- **Validation Logic**:
  ```typescript
  // Check if API_KEY is configured
  if (!process.env.API_KEY || process.env.API_KEY.trim() === '') {
    return NextResponse.json(
      { error: 'API is not properly configured' }, 
      { status: 500 }
    );
  }

  // Check for API key in all environments
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== process.env.API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  ```

### 3. Request Processing

The API processes requests in a structured manner:

1. **Input Validation**: Validates the report ID format
2. **Authentication**: Checks for proper API key configuration and valid authorization
3. **Parameter Extraction**: Gets optional language parameter from query string
4. **Data Retrieval**: Fetches report data from the database
5. **Data Transformation**: Cleans and formats the data for API response
6. **CORS Configuration**: Sets appropriate headers for cross-origin requests

### 4. Database Interaction

The database interaction is handled through server actions:

- **Connection Management**: Uses a singleton pattern to maintain a MongoDB connection pool
- **Query Function**: `getTestResult(id, language)` retrieves and processes the test results
- **Operation Tracking**: Wraps database operations in a tracking function for monitoring
- **Error Handling**: Implements comprehensive error handling with appropriate status codes

### 5. Data Processing

The API includes data processing logic:

- **Score Calculation**: Processes raw answers into domain and facet scores
- **Result Generation**: Transforms scores into formatted results with descriptive text
- **Data Cleaning**: Removes internal fields and formats data for external consumption
- **Special Handling**: Implements domain-specific logic (e.g., removing certain fields for domain 'A')

## Implementation Steps

To implement a similar API in your application:

### 1. Environment Setup

1. Create an `.env` file with an `API_KEY` variable:
   ```
   API_KEY=your_secure_random_key_here
   ```

2. Create an `.env.example` file without sensitive values as a template:
   ```
   API_KEY=your_api_key_here
   ```

3. Add `.env` to your `.gitignore` file to prevent committing sensitive data

### 2. API Route Implementation

1. Create an API route file (e.g., `/app/api/your-endpoint/[id]/route.ts`) with:
   ```typescript
   import { NextRequest, NextResponse } from 'next/server';
   
   // Specify API route configuration
   export const dynamic = 'force-dynamic';
   export const runtime = 'nodejs';
   
   export async function GET(
     request: NextRequest,
     { params }: { params: { id: string } }
   ) {
     try {
       // 1. Validate input
       const id = params.id;
       if (!validateId(id)) {
         return NextResponse.json(
           { error: 'Invalid ID format' },
           { status: 400 }
         );
       }
       
       // 2. Check API key configuration
       if (!process.env.API_KEY || process.env.API_KEY.trim() === '') {
         return NextResponse.json(
           { error: 'API is not properly configured' }, 
           { status: 500 }
         );
       }
       
       // 3. Validate authorization
       const authHeader = request.headers.get('authorization');
       if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== process.env.API_KEY) {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
       
       // 4. Extract parameters
       const { searchParams } = new URL(request.url);
       const optionalParam = searchParams.get('param');
       
       // 5. Retrieve data
       const data = await fetchYourData(id, optionalParam);
       
       if (!data) {
         return NextResponse.json(
           { error: 'Data not found' },
           { status: 404 }
         );
       }
       
       // 6. Process and return data
       const processedData = processYourData(data);
       
       // 7. Set CORS headers
       const response = NextResponse.json(processedData);
       response.headers.set('Access-Control-Allow-Origin', '*');
       response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
       response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
       
       return response;
     } catch (error) {
       console.error('Error processing request:', error);
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       );
     }
   }
   
   // Handle OPTIONS requests for CORS preflight
   export async function OPTIONS(request: NextRequest) {
     const response = new NextResponse(null, { status: 204 });
     
     response.headers.set('Access-Control-Allow-Origin', '*');
     response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     response.headers.set('Access-Control-Max-Age', '86400');
     
     return response;
   }
   ```

### 3. Database Connection

Implement a database connection manager:

```typescript
// Example MongoDB connection manager
import { MongoClient } from 'mongodb';

// Global singleton to persist across module reloads
declare global {
  var dbClient: {
    client: MongoClient | null;
    promise: Promise<MongoClient> | null;
  };
}

if (!global.dbClient) {
  global.dbClient = {
    client: null,
    promise: null
  };
}

export async function connectToDatabase() {
  if (global.dbClient.client) {
    return global.dbClient.client.db(process.env.DB_NAME);
  }
  
  if (!global.dbClient.promise) {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error('Database URL not configured');
    }
    
    global.dbClient.promise = new MongoClient(dbUrl, {
      // Your connection options
    }).connect();
  }
  
  try {
    const client = await global.dbClient.promise;
    global.dbClient.client = client;
    return client.db(process.env.DB_NAME);
  } catch (error) {
    global.dbClient.promise = null;
    console.error('Database connection error:', error);
    throw error;
  }
}
```

### 4. Data Retrieval Function

Create a function to retrieve and process your data:

```typescript
export async function fetchYourData(id: string, param?: string) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('your_collection');
    
    const data = await collection.findOne({ _id: new ObjectId(id) });
    if (!data) {
      return null;
    }
    
    // Process data based on parameters
    const processedData = {
      id: data._id.toString(),
      timestamp: data.createdAt,
      // Other fields...
    };
    
    return processedData;
  } catch (error) {
    console.error(`Error fetching data with id ${id}:`, error);
    throw error;
  }
}
```

## Security Considerations

When implementing this API pattern, consider these security aspects:

1. **API Key Generation**: Use a cryptographically secure random generator for API keys
2. **Key Management**: Store API keys securely and rotate them periodically
3. **HTTPS**: Always serve your API over HTTPS to encrypt the API key in transit
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Input Validation**: Validate all input parameters to prevent injection attacks
6. **Error Handling**: Return appropriate error codes without leaking sensitive information
7. **Logging**: Log API access for audit purposes, but don't log sensitive data
8. **Environment Variables**: Ensure environment variables are properly protected

## Testing Your API

Test your API implementation using tools like curl:

```bash
# Test with valid API key
curl "https://your-domain.com/api/your-endpoint/123" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Test with invalid API key
curl "https://your-domain.com/api/your-endpoint/123" \
  -H "Authorization: Bearer WRONG_KEY"

# Test with missing API key
curl "https://your-domain.com/api/your-endpoint/123"

# Test with invalid ID format
curl "https://your-domain.com/api/your-endpoint/invalid-id" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Documentation

Always provide clear documentation for your API, including:

1. **Authentication requirements**: How to obtain and use API keys
2. **Endpoint descriptions**: What each endpoint does and its parameters
3. **Request format**: Required headers and parameters
4. **Response format**: Structure of the returned data
5. **Error codes**: What each error code means and how to resolve issues
6. **Example usage**: Code snippets in multiple languages

## Conclusion

This implementation provides a secure, scalable approach to API development using Next.js App Router. The authentication system balances security with simplicity, making it appropriate for many applications.

By following this guide, you can implement a similar API system in your own applications, adapting the specific data retrieval and processing logic to your needs while maintaining the same security and structural approach.