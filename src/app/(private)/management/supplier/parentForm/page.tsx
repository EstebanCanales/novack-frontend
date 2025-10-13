"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogOut, User, Users, Calendar, Clock, MapPin, FileText, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ParentFormPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    studentName: "",
    studentGrade: "",
    visitDate: "",
    visitTime: "",
    purpose: "",
    additionalNotes: ""
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    alert("Formulario enviado exitosamente");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
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
                Formulario para Padres
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
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#07D9D9]/20 border border-[#07D9D9]/30">
              <Users className="h-8 w-8 text-[#07D9D9]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#07D9D9] to-[#0596A6] bg-clip-text text-transparent">
              Formulario de Visita
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Solicite acceso a la institución para reunirse con profesores o personal administrativo
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#07D9D9]">
                Información de la Visita
              </CardTitle>
              <CardDescription className="text-gray-400">
                Complete todos los campos para solicitar su visita
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información del Padre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentName" className="text-white">
                      <User className="w-4 h-4 inline mr-2" />
                      Nombre Completo del Padre/Madre
                    </Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]"
                      placeholder="Ingrese su nombre completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentEmail" className="text-white">
                      <User className="w-4 h-4 inline mr-2" />
                      Correo Electrónico
                    </Label>
                    <Input
                      id="parentEmail"
                      name="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone" className="text-white">
                      <User className="w-4 h-4 inline mr-2" />
                      Teléfono de Contacto
                    </Label>
                    <Input
                      id="parentPhone"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-white">
                      <Users className="w-4 h-4 inline mr-2" />
                      Nombre del Estudiante
                    </Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]"
                      placeholder="Nombre completo del estudiante"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentGrade" className="text-white">
                      <Users className="w-4 h-4 inline mr-2" />
                      Grado/Curso
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("studentGrade", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]">
                        <SelectValue placeholder="Seleccione el grado" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        <SelectItem value="pre-kinder">Pre-Kinder</SelectItem>
                        <SelectItem value="kinder">Kinder</SelectItem>
                        <SelectItem value="1ro">1er Grado</SelectItem>
                        <SelectItem value="2do">2do Grado</SelectItem>
                        <SelectItem value="3ro">3er Grado</SelectItem>
                        <SelectItem value="4to">4to Grado</SelectItem>
                        <SelectItem value="5to">5to Grado</SelectItem>
                        <SelectItem value="6to">6to Grado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visitDate" className="text-white">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Fecha de Visita
                    </Label>
                    <Input
                      id="visitDate"
                      name="visitDate"
                      type="date"
                      value={formData.visitDate}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visitTime" className="text-white">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Hora de Visita
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("visitTime", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]">
                        <SelectValue placeholder="Seleccione la hora" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose" className="text-white">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Propósito de la Visita
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("purpose", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9]">
                        <SelectValue placeholder="Seleccione el propósito" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10">
                        <SelectItem value="reunion-maestro">Reunión con Maestro</SelectItem>
                        <SelectItem value="entrega-documentos">Entrega de Documentos</SelectItem>
                        <SelectItem value="consulta-administrativa">Consulta Administrativa</SelectItem>
                        <SelectItem value="actividad-escolar">Actividad Escolar</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Notas Adicionales */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes" className="text-white">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Notas Adicionales
                  </Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white focus:border-[#07D9D9] min-h-[100px]"
                    placeholder="Ingrese cualquier información adicional que considere importante..."
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center pt-4"
                >
                  <Button
                    type="submit"
                    className="bg-[#07D9D9] hover:bg-[#0596A6] text-[#010440] font-semibold px-8 py-3 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Solicitud
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}