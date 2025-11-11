import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No se necesitan rewrites porque el frontend llama directamente al backend
  // usando axios con baseURL configurado en NEXT_PUBLIC_API_URL
};

export default nextConfig;
