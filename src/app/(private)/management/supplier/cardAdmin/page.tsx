"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, CreditCard, Plus, Search, User, Building, QrCode, Battery, Wifi, MoreVertical, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function CardAdminPage() {
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

  const cards = [
    {
      id: 1,
      cardNumber: "A1B2C3D4",
      holderName: "María González",
      type: "Empleado",
      status: "active",
      battery: 85,
      lastUsed: "2024-12-01 08:30",
      department: "Tecnología",
      avatar: "MG"
    },
    {
      id: 2,
      cardNumber: "E5F6G7H8",
      holderName: "Carlos Rodríguez",
      type: "Estudiante",
      status: "active",
      battery: 45,
      lastUsed: "2024-12-01 09:15",
      department: "Ingeniería",
      avatar: "CR"
    },
    {
      id: 3,
      cardNumber: "I9J0K1L2",
      holderName: "Ana Martínez",
      type: "Visitante",
      status: "inactive",
      battery: 0,
      lastUsed: "2024-11-28 14:20",
      department: "Administración",
      avatar: "AM"
    },
    {
      id: 4,
      cardNumber: "M3N4O5P6",
      holderName: "Luis Hernández",
      type: "Empleado",
      status: "active",
      battery: 92,
      lastUsed: "2024-12-01 07:45",
      department: "Seguridad",
      avatar: "LH"
    },
    {
      id: 5,
      cardNumber: "Q7R8S9T0",
      holderName: "Sofía López",
      type: "Administrador",
      status: "active",
      battery: 78,
      lastUsed: "2024-12-01 10:00",
      department: "Dirección",
      avatar: "SL"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getBatteryColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-400";
    if (percentage >= 30) return "text-yellow-400";
    return "text-red-400";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Administrador": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Empleado": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Estudiante": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Visitante": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredCards = cards.filter(card =>
    card.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.department.toLowerCase().includes(searchTerm.toLowerCase())
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
                Administración de Tarjetas
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
              <CreditCard className="h-8 w-8 text-[#07D9D9]" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#07D9D9] to-[#0596A6] bg-clip-text text-transparent">
                Gestión de Tarjetas
              </h2>
              <p className="text-lg text-gray-300">
                Administre todas las tarjetas de acceso de la institución
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats and Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Tarjetas</p>
                  <p className="text-2xl font-bold text-white">156</p>
                </div>
                <CreditCard className="w-8 h-8 text-[#07D9D9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Activas</p>
                  <p className="text-2xl font-bold text-white">142</p>
                </div>
                <Wifi className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Baja Batería</p>
                  <p className="text-2xl font-bold text-white">8</p>
                </div>
                <Battery className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Inactivas</p>
                  <p className="text-2xl font-bold text-white">14</p>
                </div>
                <QrCode className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, número o departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#07D9D9]"
            />
          </div>
          <Button className="bg-[#07D9D9] hover:bg-[#0596A6] text-[#010440] font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Nueva Tarjeta
          </Button>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#07D9D9]/20 transition-all duration-300">
                <CardContent className="p-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-[#07D9D9]/30">
                        <AvatarFallback className="bg-[#07D9D9] text-[#010440] font-semibold">
                          {card.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">{card.holderName}</h3>
                        <p className="text-sm text-gray-400">#{card.cardNumber}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#07D9D9]">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black border-white/10">
                        <DropdownMenuItem className="text-white">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Tipo</span>
                      <Badge className={getTypeColor(card.type)}>
                        {card.type}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Departamento</span>
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-white">{card.department}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Batería</span>
                      <div className="flex items-center gap-1">
                        <Battery className={`w-4 h-4 ${getBatteryColor(card.battery)}`} />
                        <span className={`text-sm ${getBatteryColor(card.battery)}`}>
                          {card.battery}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Estado</span>
                      <Badge className={getStatusColor(card.status)}>
                        {card.status === "active" ? "Activa" : "Inactiva"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Último Uso</span>
                      <span className="text-sm text-white">
                        {new Date(card.lastUsed).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#07D9D9] text-[#07D9D9] hover:bg-[#07D9D9] hover:text-[#010440]"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      Código
                    </Button>
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