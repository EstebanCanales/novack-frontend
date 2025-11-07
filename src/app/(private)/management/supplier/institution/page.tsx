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
import {
  Home,
  School,
  Users,
  MapPin,
  BookOpen,
  Plus,
  Search,
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

interface Institution {
  id: string;
  name: string;
  type: string;
  location: string;
  students: number;
  programs: number;
  campuses: number;
  status: "active" | "inactive";
  email?: string;
  phone?: string;
}

const mockInstitutions: Institution[] = [
  {
    id: "1",
    name: "Universidad Nacional",
    type: "Universidad",
    location: "Ciudad Principal",
    students: 5420,
    programs: 18,
    campuses: 3,
    status: "active",
    email: "contacto@universidad.edu",
    phone: "+1 234 567 8900",
  },
  {
    id: "2",
    name: "Instituto Tecnológico",
    type: "Instituto",
    location: "Ciudad Secundaria",
    students: 3200,
    programs: 12,
    campuses: 2,
    status: "active",
    email: "info@instituto.edu",
    phone: "+1 234 567 8901",
  },
  {
    id: "3",
    name: "Colegio Superior",
    type: "Colegio",
    location: "Ciudad Tercera",
    students: 1850,
    programs: 8,
    campuses: 1,
    status: "active",
    email: "admisiones@colegio.edu",
    phone: "+1 234 567 8902",
  },
];

export default function InstitutionManagementPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-[#07D9D9]"></div>
          <div className="text-white text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const totalInstitutions = mockInstitutions.length;
  const totalCampus = mockInstitutions.reduce(
    (sum, inst) => sum + inst.campuses,
    0
  );
  const totalStudents = mockInstitutions.reduce(
    (sum, inst) => sum + inst.students,
    0
  );
  const totalPrograms = mockInstitutions.reduce(
    (sum, inst) => sum + inst.programs,
    0
  );

  return (
    <div className="flex flex-col h-full p-3 pl-2 overflow-hidden">
      <div className="flex-1 overflow-auto space-y-3">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/management/supplier">
                  Proveedores
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Instituciones</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.back()}
                  className="text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="p-3 rounded-lg bg-[#07D9D9]/10 border border-[#07D9D9]/20">
                  <School className="h-6 w-6 text-[#07D9D9]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Gestión de Instituciones
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Administra todas las instituciones y campus del sistema
                  </p>
                </div>
              </div>
              <Button
                onClick={() =>
                  router.push("/management/supplier/institution/new")
                }
                className="bg-[#07D9D9] hover:bg-[#06b8b8] text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Institución
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6 border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <Card className="bg-white/5 border-white/10 hover:border-[#07D9D9]/40 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <School className="w-4 h-4" />
                    Instituciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {totalInstitutions}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Total activas</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 hover:border-[#07D9D9]/40 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <MapPin className="w-4 h-4" />
                    Campus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {totalCampus}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Ubicaciones</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 hover:border-[#07D9D9]/40 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <Users className="w-4 h-4" />
                    Estudiantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {totalStudents.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Total registrados
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 hover:border-[#07D9D9]/40 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    Programas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {totalPrograms}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Programas activos
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar instituciones..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
              </motion.div>

              {/* Institutions List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {mockInstitutions.map((institution, index) => (
                  <motion.div
                    key={institution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className="bg-white/5 border-white/10 hover:border-[#07D9D9]/40 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer group">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded-lg bg-[#07D9D9]/10 border border-[#07D9D9]/20">
                                <Building2 className="h-5 w-5 text-[#07D9D9]" />
                              </div>
                              <div>
                                <CardTitle className="text-white text-lg font-semibold group-hover:text-[#07D9D9] transition-colors">
                                  {institution.name}
                                </CardTitle>
                                <CardDescription className="text-gray-400 text-sm mt-1">
                                  {institution.type} • {institution.location}
                                </CardDescription>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div>
                                <p className="text-xs text-gray-400">
                                  Estudiantes
                                </p>
                                <p className="text-sm font-semibold text-white">
                                  {institution.students.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">
                                  Programas
                                </p>
                                <p className="text-sm font-semibold text-white">
                                  {institution.programs}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Campus</p>
                                <p className="text-sm font-semibold text-white">
                                  {institution.campuses}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Estado</p>
                                <Badge
                                  variant={
                                    institution.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={
                                    institution.status === "active"
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                  }
                                >
                                  {institution.status === "active"
                                    ? "Activo"
                                    : "Inactivo"}
                                </Badge>
                              </div>
                            </div>

                            {(institution.email || institution.phone) && (
                              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/10">
                                {institution.email && (
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Mail className="h-4 w-4" />
                                    <span>{institution.email}</span>
                                  </div>
                                )}
                                {institution.phone && (
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Phone className="h-4 w-4" />
                                    <span>{institution.phone}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-[#07D9D9] hover:bg-[#07D9D9]/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/management/supplier/institution/${institution.id}`
                              );
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
