import { NextRequest, NextResponse } from "next/server";

// Función para obtener la URL del backend
function getBackendURL() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  
  // Si tenemos una URL configurada y no es localhost, usarla
  if (url && !url.includes('localhost')) {
    return url;
  }
  
  // Fallback a Railway en producción
  return url || 'https://novack-backend-production.up.railway.app';
}

// Manejador para todos los métodos HTTP
async function handleProxy(request: NextRequest, method: string) {
  try {
    // Obtener el path después de /api/
    const pathname = request.nextUrl.pathname;
    const path = pathname.replace('/api/', '');
    
    // Construir la URL completa del backend
    const backendURL = `${getBackendURL()}/${path}`;
    
    console.log(`🔄 Proxy ${method} ${pathname} → ${backendURL}`);
    
    // Obtener el body si existe
    let body = null;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        body = await request.text();
      } catch {
        // No hay body, está bien
      }
    }
    
    // Headers a reenviar (excluir algunos headers problemáticos)
    const headers: HeadersInit = {};
    request.headers.forEach((value, key) => {
      // No reenviar estos headers
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });
    
    // Hacer la petición al backend
    const response = await fetch(backendURL, {
      method,
      headers,
      body: body || undefined,
      // No seguir redirects automáticamente
      redirect: 'manual',
    });
    
    // Preparar headers de respuesta
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      // Copiar todos los headers excepto algunos problemáticos
      if (!['connection', 'transfer-encoding'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });
    
    // Si la respuesta es 204 No Content, no intentar leer el body
    if (response.status === 204) {
      console.log(`✅ Proxy ${method} ${pathname} → ${response.status} No Content`);
      return new NextResponse(null, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }
    
    // Para otras respuestas, intentar leer el body
    let responseBody: BodyInit | null = null;
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const json = await response.json();
      responseBody = JSON.stringify(json);
    } else if (contentType?.includes('text/')) {
      responseBody = await response.text();
    } else {
      // Para otros tipos de contenido, pasar como ArrayBuffer
      const arrayBuffer = await response.arrayBuffer();
      responseBody = new Uint8Array(arrayBuffer);
    }
    
    console.log(`✅ Proxy ${method} ${pathname} → ${response.status}`);
    
    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
    
  } catch (error) {
    console.error('❌ Error en proxy:', error);
    return NextResponse.json(
      { 
        error: 'Error al comunicarse con el backend',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 502 }
    );
  }
}

// Exportar manejadores para cada método HTTP
export async function GET(request: NextRequest) {
  return handleProxy(request, 'GET');
}

export async function POST(request: NextRequest) {
  return handleProxy(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return handleProxy(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
  return handleProxy(request, 'DELETE');
}

export async function PATCH(request: NextRequest) {
  return handleProxy(request, 'PATCH');
}

export async function OPTIONS(request: NextRequest) {
  return handleProxy(request, 'OPTIONS');
}

