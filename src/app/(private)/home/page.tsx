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
import { LogOut, Bell, Building, MapPin, Clock, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NotificationsPage() {
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

  const notifications = [
    {
      type: "location",
      title: "Concepción arriba",
      items: [
        {
          main: "Escuela San Juan Bosco",
          sub: "CEDES Don Bosco",
          time: "Recently viewed",
          icon: Building
        },
        {
          main: "Ejecitromecánica",
          sub: "Edificio académico B",
          time: "",
          icon: MapPin
        }
      ]
    },
    {
      type: "arrival",
      title: "Fábula Carilla arrives in Purpose",
      time: "5 minutes",
      description: "Meeting with teacher",
      icon: User
    },
    {
      type: "arrival",
      title: "Nario Mindita arrives in Purpose",
      time: "10 minutes",
      description: "Meeting at PSCOE",
      icon: User
    },
    {
      type: "arrival",
      title: "Jean Pierre arrives in Purpose",
      time: "2.0 minutes",
      description: "Fixing up child",
      icon: User
    }
  ];

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
                Notifications
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
        {/* Header Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#07D9D9]/20 border border-[#07D9D9]/30">
              <Bell className="h-8 w-8 text-[#07D9D9]" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#07D9D9] to-[#0596A6] bg-clip-text text-transparent">
                Notifications
              </h2>
              <p className="text-lg text-gray-300">
                Mantente informado sobre las últimas actividades
              </p>
            </div>
          </div>
        </motion.div>

        {/* Notifications Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-md hover:border-[#07D9D9]/20 transition-all duration-300">
                <CardContent className="p-6">
                  {notification.type === "location" ? (
                    <div>
                      {/* Location Group Notification */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#07D9D9]/20 border border-[#07D9D9]/30">
                          <MapPin className="h-5 w-5 text-[#07D9D9]" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {notification.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {notification.items?.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                          >
                            <div className="space-y-3">
                                {notification.items?.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 rounded-md bg-white/5">
                                        <item.icon className="h-4 w-4 text-[#07D9D9]" />
                                      </div>
                                      <div>
                                        <p className="text-white font-medium">{item.main}</p>
                                        <p className="text-sm text-gray-400">{item.sub}</p>
                                      </div>
                                    </div>
                                    {item.time && (
                                      <span className="text-xs text-[#07D9D9] bg-[#07D9D9]/10 px-2 py-1 rounded-full">
                                        {item.time}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                        ))} 
                      </div>
                    </div>
                  ) : (
                    /* Arrival Notification */
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar className="h-10 w-10 border border-[#07D9D9]/30">
                          <AvatarFallback className="bg-[#07D9D9] text-[#010440] font-semibold">
                            {notification.icon && <notification.icon className="h-5 w-5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-white">
                              {notification.title}
                            </h3>
                            <span className="text-xs text-[#07D9D9] bg-[#07D9D9]/10 px-2 py-1 rounded-full">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-gray-400">{notification.description}</p>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer">
                        <Clock className="h-4 w-4 text-[#07D9D9]" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#07D9D9]/20 border border-[#07D9D9]/30">
                <Bell className="h-5 w-5 text-[#07D9D9]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Total Notificaciones</h3>
                <p className="text-2xl font-bold text-[#07D9D9]">24</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#07D9D9]/20 border border-[#07D9D9]/30">
                <User className="h-5 w-5 text-[#07D9D9]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Visitas Hoy</h3>
                <p className="text-2xl font-bold text-[#07D9D9]">8</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#07D9D9]/20 border border-[#07D9D9]/30">
                <Calendar className="h-5 w-5 text-[#07D9D9]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Eventos Activos</h3>
                <p className="text-2xl font-bold text-[#07D9D9]">3</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}