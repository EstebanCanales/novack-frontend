"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, User, Building2, Shield } from "lucide-react";

export default function HomePage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Novack Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Hola, {user.first_name} {user.last_name}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bienvenido a Novack</h2>
          <p className="text-gray-300">
            Gestiona tu cuenta y accede a todas las funcionalidades de la
            plataforma.
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <User className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-sm font-medium ml-2">
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Nombre:</span> {user.first_name}{" "}
                  {user.last_name}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Rol:</span>{" "}
                  {user.is_creator ? "Creador" : "Empleado"}
                </p>
              </div>
            </CardContent>
          </Card>

          {user.supplier && (
            <Card className="bg-white/5 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Building2 className="h-5 w-5 text-cyan-400" />
                <CardTitle className="text-sm font-medium ml-2">
                  Proveedor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium">Empresa:</span>{" "}
                    {user.supplier.supplier_name}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium">ID:</span> {user.supplier.id}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white/5 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Shield className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-sm font-medium ml-2">
                Estado de Cuenta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-green-400">
                  <span className="font-medium">Estado:</span> Activa
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">Verificación:</span> Completada
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-20">
                <div className="text-center">
                  <div className="text-lg font-bold">Gestión</div>
                  <div className="text-sm">de Empleados</div>
                </div>
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-20">
                <div className="text-center">
                  <div className="text-lg font-bold">Reportes</div>
                  <div className="text-sm">y Analytics</div>
                </div>
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-20">
                <div className="text-center">
                  <div className="text-lg font-bold">Configuración</div>
                  <div className="text-sm">de Cuenta</div>
                </div>
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold h-20">
                <div className="text-center">
                  <div className="text-lg font-bold">Soporte</div>
                  <div className="text-sm">y Ayuda</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
