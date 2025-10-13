"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Search, User, Shield, Check, X, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function PermissionAdminPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

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

  const users = [
    {
      id: 1,
      name: "María González",
      email: "maria.gonzalez@institucion.edu",
      role: "Administrador",
      permissions: ["dashboard", "users", "reports", "settings"],
      status: "active",
      avatar: "MG"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@institucion.edu",
      role: "Coordinador",
      permissions: ["dashboard", "reports"],
      status: "active",
      avatar: "CR"
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana.martinez@institucion.edu",
      role: "Profesor",
      permissions: ["dashboard"],
      status: "active",
      avatar: "AM"
    },
    {
      id: 4,
      name: "Luis Hernández",
      email: "luis.hernandez@institucion.edu",
      role: "Asistente",
      permissions: ["dashboard"],
      status: "inactive",
      avatar: "LH"
    },
    {
      id: 5,
      name: "Sofía López",
      email: "sofia.lopez@institucion.edu",
      role: "Administrador",
      permissions: ["dashboard", "users", "reports", "settings", "system"],
      status: "active",
      avatar: "SL"
    }
  ];

  const availablePermissions = [
    { id: "dashboard", name: "Dashboard", description: "Acceso al panel principal" },
    { id: "users", name: "Gestión de Usuarios", description: "Administrar usuarios y permisos" },
    { id: "reports", name: "Reportes", description: "Generar y ver reportes" },
    { id: "settings", name: "Configuración", description: "Configuración del sistema" },
    { id: "system", name: "Sistema", description: "Acceso completo al sistema" }
  ];

  const togglePermission = (userId: number, permissionId: string) => {
    // Aquí iría la lógica para actualizar permisos
    console.log(`Toggle permission ${permissionId} for user ${userId}`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                Administración de Permisos
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#07D9D9]/20 border border-[#07D9D9]/30">
              <Shield className="h-8 w-8 text-[#07D9D9]" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#07D9D9] to-[#0596A6] bg-clip-text text-transparent">
                Gestión de Permisos
              </h2>
              <p className="text-lg text-gray-300">
                Administre los permisos y accesos de los usuarios del sistema
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#07D9D9]"
            />
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#07D9D9]/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    {/* User Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-12 w-12 border border-[#07D9D9]/30">
                        <AvatarFallback className="bg-[#07D9D9] text-[#010440] font-semibold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {user.role}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#07D9D9]">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black border-white/10">
                        <DropdownMenuItem className="text-white">Editar Usuario</DropdownMenuItem>
                        <DropdownMenuItem className="text-white">Resetear Contraseña</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">Desactivar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Permissions Grid */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-4">Permisos del Usuario</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availablePermissions.map((permission) => {
                        const hasPermission = user.permissions.includes(permission.id);
                        return (
                          <div
                            key={permission.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                              hasPermission
                                ? "bg-[#07D9D9]/10 border-[#07D9D9]"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                            onClick={() => togglePermission(user.id, permission.id)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {hasPermission ? (
                                  <Check className="w-4 h-4 text-[#07D9D9]" />
                                ) : (
                                  <X className="w-4 h-4 text-gray-400" />
                                )}
                                <span className={`text-sm font-medium ${
                                  hasPermission ? "text-[#07D9D9]" : "text-white"
                                }`}>
                                  {permission.name}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400">{permission.description}</p>
                            </div>
                            <Badge
                              variant={hasPermission ? "default" : "outline"}
                              className={hasPermission ? "bg-[#07D9D9] text-[#010440]" : ""}
                            >
                              {hasPermission ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}