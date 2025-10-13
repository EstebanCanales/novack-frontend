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
import { LogOut, Search, Calendar, Clock, MapPin, User, Users, Building, Phone, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MeetingDetailPage() {
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

  const appointments = [
    { id: 1, name: "FABIAN CARRILLO", time: "4:30 PM", active: true },
    { id: 2, name: "MARIA GONZALEZ", time: "5:00 PM", active: false },
    { id: 3, name: "CARLOS RODRIGUEZ", time: "5:30 PM", active: false },
    { id: 4, name: "ANA MARTINEZ", time: "6:00 PM", active: false },
    { id: 5, name: "LUIS HERNANDEZ", time: "6:30 PM", active: false },
    { id: 6, name: "SOFIA LOPEZ", time: "7:00 PM", active: false },
  ];

  const upcomingArrivals = [
    { name: "Semi Phone", time: "20 minutes", purpose: "Picking up child" },
    { name: "Nombre", time: "X time", purpose: "Purpose" },
    { name: "Nombre", time: "X time", purpose: "Purpose" },
  ];

  const locations = [
    "Informática",
    "Cedes Don Bosco",
    "Electromecánica",
    "Edificio académico B"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#07D9D9] hover:bg-[#07D9D9]/10"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold"
              >
                Detalles de Reunión
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
        {/* LEFT COLUMN - APPOINTMENTS */}
        <section className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 p-4 overflow-hidden">
          {/* SEARCH BAR */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar cita..." 
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#07D9D9]"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="bg-white/5 border-white/10 text-[#07D9D9] hover:bg-[#07D9D9] hover:text-[#010440]"
            >
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
          
          {/* APPOINTMENTS LIST */}
          <div className="overflow-y-auto scrollbar-hide h-[calc(100vh-180px)]">
            <div className="space-y-2">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer group ${
                    appointment.active 
                      ? 'bg-[#07D9D9]/20 border-[#07D9D9] shadow-lg shadow-[#07D9D9]/20' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#07D9D9]/20'
                  }`}
                >
                  <Avatar className="h-10 w-10 border border-[#07D9D9]/30">
                    <AvatarFallback className={`font-semibold ${
                      appointment.active ? 'bg-[#07D9D9] text-[#010440]' : 'bg-white/10 text-white'
                    }`}>
                      {appointment.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${
                      appointment.active ? 'text-[#07D9D9]' : 'text-white group-hover:text-[#07D9D9]'
                    } transition-colors`}>
                      {appointment.name}
                    </p>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN - MEETING DETAILS */}
        <section className="flex-1 flex overflow-auto">
          <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 m-4 rounded-xl">
            {/* MEETING HEADER */}
            <div className="p-6 border-b border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#07D9D9] to-[#0596A6] bg-clip-text text-transparent mb-2">
                  FABIAN CARRILLO
                </h1>
                <p className="text-lg text-gray-300">
                  has a meeting with <span className="text-[#07D9D9]">STEPHANIE SALAZAR OCHOA</span>
                </p>
              </motion.div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* MEETING DESCRIPTION */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                    <CardContent className="p-6">
                      <p className="text-gray-300 leading-relaxed">
                        Fabian Carrillo is meeting with Stephanie Salazar Ochoa, Camila's Spanish and Literature teacher, 
                        to discuss some recent concerns regarding his daughter's academic performance and engagement in class.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* UPCOMING ARRIVALS */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                          <Users className="w-5 h-5" />
                          Próximas Llegadas
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 rounded-lg bg-[#07D9D9]/10 border border-[#07D9D9]/20">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-white">Main Service:</span>
                            <span className="text-[#07D9D9] text-sm">10 minutes</span>
                          </div>
                          <p className="text-gray-300 text-sm">Meeting at PSICOC</p>
                        </div>
                        
                        {upcomingArrivals.map((arrival, index) => (
                          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div>
                              <p className="font-medium text-white">{arrival.name}</p>
                              <p className="text-sm text-gray-400">{arrival.purpose}</p>
                            </div>
                            <span className="text-[#07D9D9] text-sm bg-[#07D9D9]/10 px-2 py-1 rounded-full">
                              {arrival.time}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* LOCATION & TIME INFO */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    {/* MAIN ENTRANCE */}
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                          <MapPin className="w-5 h-5" />
                          Main Entrance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#07D9D9]/10 border border-[#07D9D9]/20">
                          <span className="font-semibold text-white">Arrives at:</span>
                          <span className="text-[#07D9D9] font-bold">4:30 p.m.</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* LOCATIONS */}
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                          <Building className="w-5 h-5" />
                          Esqueja San Juan Bosco
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {locations.map((location, index) => (
                            <div 
                              key={index}
                              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                            >
                              <div className="p-1.5 rounded-md bg-[#07D9D9]/20">
                                <MapPin className="w-4 h-4 text-[#07D9D9]" />
                              </div>
                              <span className="text-white">{location}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}