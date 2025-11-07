"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  Home,
  School,
  Crown,
  Shield,
  CreditCard,
  UserCog,
  User,
  ArrowRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";

const hubSections = [
  {
    id: "institution",
    title: "Gestión de Instituciones",
    description: "Administra las instituciones asociadas a tu proveedor",
    icon: School,
    path: "/management/supplier/institution",
  },
  {
    id: "subscription",
    title: "Suscripciones",
    description: "Gestiona planes y suscripciones de tu proveedor",
    icon: Crown,
    path: "/management/supplier/subscription",
  },
  {
    id: "permission",
    title: "Permisos y Accesos",
    description: "Controla los permisos y accesos de usuarios",
    icon: Shield,
    path: "/management/supplier/permissionAdmin",
  },
  {
    id: "cardAdmin",
    title: "Administración de Tarjetas",
    description: "Gestiona las tarjetas físicas y su estado",
    icon: CreditCard,
    path: "/management/supplier/cardAdmin",
  },
  {
    id: "adminUser",
    title: "Usuarios Administradores",
    description: "Administra los usuarios con permisos de administración",
    icon: UserCog,
    path: "/management/supplier/adminUser",
  },
  {
    id: "supplierProfile",
    title: "Perfil del Proveedor",
    description: "Visualiza y edita la información del proveedor",
    icon: User,
    path: "/management/supplier/supplierProfile",
  },
];

export default function SupplierManagementPage() {
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
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

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
                <BreadcrumbPage>Proveedores</BreadcrumbPage>
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
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-[#07D9D9]/10 border border-[#07D9D9]/20">
                <Building className="h-6 w-6 text-[#07D9D9]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Centro de Gestión de Proveedores
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Accede a todas las herramientas de administración de tu
                  proveedor
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Navigation Hub Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hubSections.map((section, index) => {
                  const Icon = section.icon;

                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                      }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="bg-white/5 border-white/10 hover:border-[#07D9D9]/40 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer h-full group"
                        onClick={() => router.push(section.path)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-[#07D9D9]/10 border border-[#07D9D9]/20">
                              <Icon className="h-5 w-5 text-[#07D9D9]" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#07D9D9] group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                          <CardTitle className="text-white text-base font-semibold mb-2">
                            {section.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 text-sm">
                            {section.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
