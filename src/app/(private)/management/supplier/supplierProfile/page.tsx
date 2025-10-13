"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Mail, Phone, MapPin, Shield, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
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
                Perfil de Usuario
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Profile Card */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4 border-2 border-[#07D9D9]">
                    <AvatarFallback className="bg-[#07D9D9] text-[#010440] text-2xl font-bold">
                      {user.first_name?.[0]}{user.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-[#07D9D9] mb-4">{user.is_creator ? "Administrador" : "Usuario"}</p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <Mail className="w-4 h-4 text-[#07D9D9]" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <Phone className="w-4 h-4 text-[#07D9D9]" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <MapPin className="w-4 h-4 text-[#07D9D9]" />
                      <span className="text-sm">Sede Principal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                  <Award className="w-5 h-5" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Actividad</span>
                  <span className="text-white">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tareas</span>
                  <span className="text-white">24/30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Proyectos</span>
                  <span className="text-white">8</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                  <User className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Nombre Completo</label>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      {user.first_name} {user.last_name}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Correo Electrónico</label>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      {user.email}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Departamento</label>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      Tecnología
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Posición</label>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      {user.is_creator ? "Administrador" : "Usuario"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permissions Grid */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                  <Shield className="w-5 h-5" />
                  Permisos y Accesos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Dashboard", icon: User, status: "active" },
                    { name: "Reportes", icon: Calendar, status: "active" },
                    { name: "Usuarios", icon: User, status: "active" },
                    { name: "Configuración", icon: Shield, status: "pending" },
                    { name: "Administración", icon: User, status: "active" },
                    { name: "Sistema", icon: Shield, status: "denied" },
                  ].map((item, index) => (
                    <Card key={index} className="bg-white/5 border border-white/10 rounded-lg">
                      <CardContent className="p-4 text-center">
                        <div className="flex justify-center mb-2">
                          <div className="p-2 rounded-lg bg-[#07D9D9]/20">
                            <item.icon className="w-5 h-5 text-[#07D9D9]" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white text-sm mb-2">
                          {item.name}
                        </h3>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : item.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.status === 'active' ? 'Activo' : item.status === 'pending' ? 'Pendiente' : 'Denegado'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}