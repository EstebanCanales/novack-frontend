"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Building, Truck, Package, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function SupplierManagementPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold"
              >
                Gestión de Proveedores
              </motion.h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-300"
              >
                Hola, {user.first_name} {user.last_name}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-[#07D9D9] text-[#07D9D9] hover:bg-[#07D9D9] hover:text-[#010440] transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#07D9D9]/20 border border-[#07D9D9]/30">
              <Building className="h-8 w-8 text-[#07D9D9]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#07D9D9] to-[#0596A6] bg-clip-text text-transparent">
              Gestión de Proveedores
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Administra todos los proveedores y servicios de tu institución
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#07D9D9]/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                <Truck className="w-5 h-5" />
                Proveedores Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">18</div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#07D9D9]/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                <Package className="w-5 h-5" />
                Servicios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">24</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <Button 
            className="bg-[#07D9D9] hover:bg-[#0596A6] text-[#010440] font-semibold px-8 py-3"
            onClick={() => router.back()}
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Proveedor
          </Button>
          <div>
            <Button 
              variant="outline" 
              className="border-[#07D9D9] text-[#07D9D9] hover:bg-[#07D9D9] hover:text-[#010440]"
              onClick={() => router.back()}
            >
              Volver Atrás
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}