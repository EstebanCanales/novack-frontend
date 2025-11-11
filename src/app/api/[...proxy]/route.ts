import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_API_URL || 'http://localhost:4000';

export async function GET(
  request: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return proxyRequest(request, params.proxy);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return proxyRequest(request, params.proxy);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return proxyRequest(request, params.proxy);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return proxyRequest(request, params.proxy);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return proxyRequest(request, params.proxy);
}

async function proxyRequest(request: NextRequest, proxyPath: string[]) {
  try {
    const path = proxyPath.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `${BACKEND_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

    console.log('Proxying request to:', url);

    // Obtener el body si existe
    let body = undefined;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        body = await request.text();
      } catch (e) {
        // Si no hay body, no pasa nada
      }
    }

    // Copiar headers relevantes
    const headers: HeadersInit = {
      'Content-Type': request.headers.get('content-type') || 'application/json',
    };

    // Copiar Authorization header si existe
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // Hacer la petición al backend
    const response = await fetch(url, {
      method: request.method,
      headers,
      body: body || undefined,
      credentials: 'include',
    });

    // Obtener el contenido de la respuesta
    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    // Crear la respuesta con los headers correctos
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', response.headers.get('content-type') || 'application/json');
    
    // Copiar headers importantes de CORS
    if (response.headers.get('access-control-allow-origin')) {
      responseHeaders.set('access-control-allow-origin', response.headers.get('access-control-allow-origin')!);
    }
    if (response.headers.get('access-control-allow-credentials')) {
      responseHeaders.set('access-control-allow-credentials', response.headers.get('access-control-allow-credentials')!);
    }

    return new NextResponse(
      typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
      {
        status: response.status,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.error('Error proxying request:', error);
    return NextResponse.json(
      { error: 'Error al conectar con el backend', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}

// Manejar OPTIONS para CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

