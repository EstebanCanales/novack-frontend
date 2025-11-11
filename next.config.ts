import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Los rewrites ya no son necesarios porque usamos API routes como proxy
  // Esto soluciona problemas de CORS y hace el proxy más robusto en Vercel
};

export default nextConfig;
