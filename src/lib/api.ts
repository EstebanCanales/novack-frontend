import axios from "axios";

// Función para obtener la URL del backend
// Esto asegura que funcione tanto en desarrollo como en producción
function getBaseURL() {
  // En el navegador (runtime)
  if (typeof window !== 'undefined') {
    // Verificar si hay una variable de entorno definida en build time
    const buildTimeUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Si la URL de build time es localhost pero estamos en un dominio de producción,
    // algo salió mal con las variables de entorno
    if (buildTimeUrl && !buildTimeUrl.includes('localhost')) {
      return buildTimeUrl;
    }
    
    // Si estamos en localhost, usar localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:4000';
    }
    
    // Si estamos en producción pero no tenemos la URL correcta,
    // intentar inferirla o usar un fallback
    // IMPORTANTE: Reemplaza esta URL con tu URL real de Railway
    return buildTimeUrl || 'https://novack-backend.railway.app';
  }
  
  // En el servidor (build time o SSR)
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

// Crear instancia de Axios
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log para debugging (solo en desarrollo)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔧 API Base URL:', getBaseURL());
}

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    // Solo acceder a localStorage en el cliente
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido - solo en el cliente
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        
        // Redirigir al login si no estamos ya ahí
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// Utilidades para números de teléfono
export function extractDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function lastNDigits(digits: string, n: number): string {
  return digits.slice(-n);
}

export { api };
export default api;
