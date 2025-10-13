"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, Search, User, Mail, Phone, MapPin, Calendar, Shield, Key, Clock, Building, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function EmployeeProfilePage() {
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

  const employees = [
    { 
      id: 1, 
      name: "María González", 
      position: "Desarrolladora Senior", 
      department: "Tecnología",
      active: true,
      avatar: "MG"
    },
    { 
      id: 2, 
      name: "Carlos Rodríguez", 
      position: "Analista de Seguridad", 
      department: "Seguridad",
      active: true,
      avatar: "CR"
    },
    { 
      id: 3, 
      name: "Ana Martínez", 
      position: "Coordinadora Académica", 
      department: "Academia",
      active: false,
      avatar: "AM"
    },
    { 
      id: 4, 
      name: "Luis Hernández", 
      position: "Administrador de Sistemas", 
      department: "Tecnología",
      active: true,
      avatar: "LH"
    },
    { 
      id: 5, 
      name: "Sofía López", 
      position: "Directora de Operaciones", 
      department: "Operaciones",
      active: true,
      avatar: "SL"
    },
  ];

  const permissions = [
    { name: "Acceso a Edificio A", status: "active", icon: Building },
    { name: "Sistema Académico", status: "active", icon: Users },
    { name: "Base de Datos", status: "pending", icon: Shield },
    { name: "Sala de Servidores", status: "denied", icon: Key },
    { name: "Laboratorio B", status: "active", icon: MapPin },
    { name: "Portal de Reportes", status: "active", icon: Calendar },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "denied": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Activo";
      case "pending": return "Pendiente";
      case "denied": return "Denegado";
      default: return "Desconocido";
    }
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
                Perfil de Empleado
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
      <main className="h-[calc(100vh-4rem)] flex">
        {/* LEFT COLUMN - EMPLOYEES LIST */}
        <section className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 p-4 overflow-hidden">
          {/* SEARCH BAR */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar empleados..." 
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#07D9D9]"
              />
            </div>
          </div>
          
          {/* EMPLOYEES LIST */}
          <div className="overflow-y-auto scrollbar-hide h-[calc(100vh-180px)]">
            <div className="space-y-2">
              {employees.map((employee, index) => (
                <div
                  key={employee.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer group ${
                    index === 0 
                      ? 'bg-[#07D9D9]/20 border-[#07D9D9] shadow-lg shadow-[#07D9D9]/20' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#07D9D9]/20'
                  }`}
                >
                  <Avatar className="h-12 w-12 border border-[#07D9D9]/30">
                    <AvatarFallback className={`font-semibold ${
                      index === 0 ? 'bg-[#07D9D9] text-[#010440]' : 'bg-white/10 text-white'
                    }`}>
                      {employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-semibold truncate ${
                        index === 0 ? 'text-[#07D9D9]' : 'text-white group-hover:text-[#07D9D9]'
                      } transition-colors`}>
                        {employee.name}
                      </p>
                      <Badge variant={employee.active ? "default" : "secondary"} className="text-xs">
                        {employee.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{employee.position}</p>
                    <p className="text-xs text-gray-500 truncate">{employee.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN - EMPLOYEE PROFILE */}
        <section className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 m-4 rounded-xl">
            {/* PROFILE HEADER */}
            <div className="p-6 border-b border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
              >
                <Avatar className="h-20 w-20 border-2 border-[#07D9D9]">
                  <AvatarFallback className="bg-[#07D9D9] text-[#010440] text-xl font-bold">
                    MG
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white">María González</h1>
                  <p className="text-xl text-[#07D9D9]">Desarrolladora Senior</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Activo
                    </Badge>
                    <span className="text-gray-400">Departamento de Tecnología</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT COLUMN - PROFILE IMAGE AND BASIC INFO */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-1 space-y-6"
                >
                  {/* PROFILE CARD */}
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Avatar className="h-32 w-32 mx-auto mb-4 border-2 border-[#07D9D9]">
                          <AvatarFallback className="bg-[#07D9D9] text-[#010440] text-2xl font-bold">
                            MG
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold text-white mb-2">María González</h3>
                        <p className="text-[#07D9D9] mb-4">Desarrolladora Senior</p>
                        
                        <div className="space-y-3 text-left">
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                            <Mail className="w-4 h-4 text-[#07D9D9]" />
                            <span className="text-sm">maria.gonzalez@empresa.com</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                            <Phone className="w-4 h-4 text-[#07D9D9]" />
                            <span className="text-sm">+1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                            <MapPin className="w-4 h-4 text-[#07D9D9]" />
                            <span className="text-sm">Oficina 304, Edificio A</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* EMPLOYMENT INFO */}
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                        <Calendar className="w-5 h-5" />
                        Información Laboral
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fecha de Ingreso</span>
                        <span className="text-white">15/03/2020</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tipo de Contrato</span>
                        <span className="text-white">Tiempo Completo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Horario</span>
                        <span className="text-white">9:00 - 18:00</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* RIGHT COLUMN - PERMISSIONS AND DETAILS */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 space-y-6"
                >
                  {/* PERMISSIONS GRID */}
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                        <Shield className="w-5 h-5" />
                        Permisos y Accesos
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Niveles de acceso y permisos del empleado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {permissions.map((permission, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <Card className={`bg-white/5 border ${getStatusColor(permission.status)} rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer`}>
                              <CardContent className="p-4 text-center">
                                <div className="flex justify-center mb-2">
                                  <div className="p-2 rounded-lg bg-white/5">
                                    <permission.icon className="w-6 h-6 text-[#07D9D9]" />
                                  </div>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-2">
                                  {permission.name}
                                </h3>
                                <Badge variant="outline" className={getStatusColor(permission.status)}>
                                  {getStatusText(permission.status)}
                                </Badge>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* ADDITIONAL INFORMATION */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                          <Clock className="w-5 h-5" />
                          Estadísticas
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Proyectos Activos</span>
                          <span className="text-white">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tareas Completadas</span>
                          <span className="text-white">156</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Horas Esta Semana</span>
                          <span className="text-white">42h</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                          <Users className="w-5 h-5" />
                          Equipo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-[#07D9D9] text-[#010440] text-xs">CR</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Carlos Rodríguez</span>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-[#07D9D9] text-[#010440] text-xs">LH</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Luis Hernández</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}