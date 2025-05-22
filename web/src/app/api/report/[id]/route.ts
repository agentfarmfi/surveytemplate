import { NextRequest, NextResponse } from 'next/server';
import { getTestResult } from '@/actions';
import { formatAndValidateId, formatId } from '@/lib/helpers';

// Specify API route configuration
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Format and validate the ID
    const rawId = params.id;
    const id = formatId(rawId);
    
    if (!formatAndValidateId(id)) {
      return NextResponse.json(
        { error: 'Invalid report ID format' },
        { status: 400 }
      );
    }

    // Check for API key in all environments
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== process.env.API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the language from query parameters if provided
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('lang');
    
    // Get the report from the database
    const report = await getTestResult(id, language || undefined);
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Process the report data - similar to what's done in the share-bar component
    const { availableLanguages, ...reportWithoutLanguages } = report;
    
    // Create a deep copy of the results without count attributes
    const cleanedResults = reportWithoutLanguages.results.map(domain => {
      // Remove count from domain
      const { count, ...domainWithoutCount } = domain;
      
      // Remove count and facet attributes from each facet
      const cleanedFacets = domain.facets.map((facet: any) => {
        const { count, facet: facetNumber, ...facetWithoutUnwanted } = facet;
        return facetWithoutUnwanted;
      });
      
      // For domain A, remove score and result fields
      if (domain.domain === 'A') {
        const { score, result, ...domainWithoutScores } = domainWithoutCount;
        return {
          ...domainWithoutScores,
          facets: cleanedFacets
        };
      }
      
      // Return domain with cleaned facets
      return {
        ...domainWithoutCount,
        facets: cleanedFacets
      };
    });
    
    // Set CORS headers
    const response = NextResponse.json({
      ...reportWithoutLanguages,
      results: cleanedResults
    });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve report' },
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
  response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  
  return response;
}