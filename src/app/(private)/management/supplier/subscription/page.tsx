"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  Crown,
  Star,
  Check,
  X,
  Zap,
  Shield,
  Badge as BadgeIcon,
  CreditCard,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SubscriptionManagementPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState("premium");

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

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "$0",
      period: "mensual",
      description: "Perfecto para pequeñas instituciones",
      features: [
        { name: "Hasta 50 usuarios", included: true },
        { name: "Dashboard básico", included: true },
        { name: "Reportes simples", included: true },
        { name: "Soporte por email", included: true },
        { name: "Acceso móvil", included: false },
        { name: "API acceso", included: false },
        { name: "Soporte prioritario", included: false },
        { name: "Personalización", included: false },
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$99",
      period: "mensual",
      description: "Ideal para instituciones medianas",
      features: [
        { name: "Hasta 500 usuarios", included: true },
        { name: "Dashboard avanzado", included: true },
        { name: "Reportes detallados", included: true },
        { name: "Soporte por email", included: true },
        { name: "Acceso móvil", included: true },
        { name: "API acceso", included: true },
        { name: "Soporte prioritario", included: false },
        { name: "Personalización", included: false },
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$299",
      period: "mensual",
      description: "Para grandes instituciones",
      features: [
        { name: "Usuarios ilimitados", included: true },
        { name: "Dashboard completo", included: true },
        { name: "Reportes avanzados", included: true },
        { name: "Soporte 24/7", included: true },
        { name: "Acceso móvil", included: true },
        { name: "API acceso", included: true },
        { name: "Soporte prioritario", included: true },
        { name: "Personalización", included: true },
      ],
      popular: false,
    },
  ];

  const handleChangePlan = (planId: string) => {
    console.log(`Changing to plan: ${planId}`);
    setCurrentPlan(planId);
    alert(
      `Plan cambiado exitosamente a ${plans.find((p) => p.id === planId)?.name}`
    );
  };

  const currentPlanData = plans.find((plan) => plan.id === currentPlan);

  return (
    <div className="flex flex-col h-full p-3 pl-2 overflow-hidden">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3"
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
              <BreadcrumbPage>Gestión</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Proveedores</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gestión de Suscripción</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      <div className="flex-1 overflow-auto space-y-3">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-[#07D9D9]/20 border border-[#07D9D9]/30">
              <Crown className="h-6 w-6 text-[#07D9D9]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Cambio de Plan</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Actualice o cambie el plan de suscripción de su institución
          </p>
        </motion.div>

        {/* Current Plan Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-[#07D9D9] rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[#07D9D9]/20">
                    <Star className="h-6 w-6 text-[#07D9D9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Plan Actual: {currentPlanData?.name}
                    </h3>
                    <p className="text-slate-400">
                      {currentPlanData?.price === "$0"
                        ? "Gratuito"
                        : `${currentPlanData?.price}/${currentPlanData?.period}`}{" "}
                      • Próxima renovación: 15 de Diciembre, 2024
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#07D9D9] text-black text-sm">
                  Activo
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plans Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-3 text-center">
            Compare Nuestros Planes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-[#07D9D9] text-black px-4 py-1">
                      <Zap className="w-3 h-3 mr-1" />
                      Recomendado
                    </Badge>
                  </div>
                )}

                <Card
                  className={`bg-white/5 backdrop-blur-sm border rounded-xl h-full transition-all duration-300 ${
                    plan.id === currentPlan
                      ? "border-[#07D9D9] shadow-lg shadow-[#07D9D9]/20"
                      : plan.popular
                      ? "border-[#07D9D9]/50 hover:shadow-lg hover:shadow-[#07D9D9]/20"
                      : "border-white/10 hover:border-[#07D9D9]/20"
                  }`}
                >
                  <CardHeader
                    className={`text-center pb-4 ${
                      plan.popular ? "pt-6" : "pt-4"
                    }`}
                  >
                    <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-white">
                      {plan.id === "enterprise" && (
                        <Shield className="w-5 h-5 text-[#07D9D9]" />
                      )}
                      {plan.id === "premium" && (
                        <Crown className="w-5 h-5 text-[#07D9D9]" />
                      )}
                      {plan.id === "basic" && (
                        <BadgeIcon className="w-5 h-5 text-[#07D9D9]" />
                      )}
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-slate-400">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-slate-400 mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-[#07D9D9] flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-slate-500 flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm ${
                              feature.included ? "text-white" : "text-slate-500"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleChangePlan(plan.id)}
                      className={`w-full ${
                        plan.id === currentPlan
                          ? "bg-slate-600 text-white cursor-not-allowed"
                          : plan.popular
                          ? "bg-[#07D9D9] hover:bg-[#06b8b8] text-black"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      }`}
                      disabled={plan.id === currentPlan}
                    >
                      {plan.id === currentPlan
                        ? "Plan Actual"
                        : "Seleccionar Plan"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Billing Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                <CreditCard className="w-5 h-5" />
                Información de Facturación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-slate-400">Método de Pago</span>
                <span className="text-white">Visa **** 4242</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-slate-400">Próximo Pago</span>
                <span className="text-white">$99.00</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-slate-400">Fecha de Renovación</span>
                <span className="text-white">15/12/2024</span>
              </div>
              <Button className="w-full border-white/10 text-slate-400 hover:text-white hover:bg-white/5" variant="outline">
                Actualizar Método de Pago
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                <Calendar className="w-5 h-5" />
                Historial de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { date: "15/11/2024", amount: "$99.00", status: "Completado" },
                { date: "15/10/2024", amount: "$99.00", status: "Completado" },
                { date: "15/09/2024", amount: "$99.00", status: "Completado" },
              ].map((payment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                >
                  <div>
                    <div className="text-white">{payment.date}</div>
                    <div className="text-sm text-slate-400">
                      {payment.amount}
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {payment.status}
                  </Badge>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-[#07D9D9] text-[#07D9D9] hover:bg-[#07D9D9] hover:text-black"
              >
                Ver Historial Completo
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
