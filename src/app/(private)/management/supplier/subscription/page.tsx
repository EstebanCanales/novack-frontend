"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Crown, Star, Check, X, Zap, Users, Shield, Badge, CreditCard, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Badge as UIBadge } from "@/components/ui/badge";

export default function SubscriptionManagementPage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState("premium");

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
        { name: "Personalización", included: false }
      ],
      popular: false
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
        { name: "Personalización", included: false }
      ],
      popular: true
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
        { name: "Personalización", included: true }
      ],
      popular: false
    }
  ];

  const handleChangePlan = (planId: string) => {
    // Aquí iría la lógica para cambiar de plan
    console.log(`Changing to plan: ${planId}`);
    setCurrentPlan(planId);
    alert(`Plan cambiado exitosamente a ${plans.find(p => p.id === planId)?.name}`);
  };

  const currentPlanData = plans.find(plan => plan.id === currentPlan);

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
                Gestión de Suscripción
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
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#07D9D9]/20 border border-[#07D9D9]/30">
              <Crown className="h-8 w-8 text-[#07D9D9]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#07D9D9] to-[#0596A6] bg-clip-text text-transparent">
              Cambio de Plan
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Actualice o cambie el plan de suscripción de su institución
          </p>
        </motion.div>

        {/* Current Plan Status */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-[#07D9D9] rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[#07D9D9]/20">
                    <Star className="h-6 w-6 text-[#07D9D9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Plan Actual: {currentPlanData?.name}
                    </h3>
                    <p className="text-gray-400">
                      {currentPlanData?.price === "$0" ? "Gratuito" : `${currentPlanData?.price}/${currentPlanData?.period}`} • 
                      Próxima renovación: 15 de Diciembre, 2024
                    </p>
                  </div>
                </div>
                <UIBadge className="bg-[#07D9D9] text-[#010440] text-sm">
                  Activo
                </UIBadge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plans Comparison */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Compare Nuestros Planes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <UIBadge className="bg-[#07D9D9] text-[#010440] px-4 py-1">
                      <Zap className="w-3 h-3 mr-1" />
                      Recomendado
                    </UIBadge>
                  </div>
                )}
                
                <Card className={`bg-white/5 backdrop-blur-sm border rounded-xl h-full transition-all duration-300 ${
                  plan.id === currentPlan 
                    ? 'border-[#07D9D9] shadow-lg shadow-[#07D9D9]/20' 
                    : plan.popular 
                    ? 'border-[#07D9D9] hover:shadow-lg hover:shadow-[#07D9D9]/20' 
                    : 'border-white/10 hover:border-[#07D9D9]/20'
                }`}>
                  <CardHeader className={`text-center pb-4 ${
                    plan.popular ? 'pt-8' : 'pt-6'
                  }`}>
                    <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold">
                      {plan.id === "enterprise" && <Shield className="w-5 h-5 text-[#07D9D9]" />}
                      {plan.id === "premium" && <Crown className="w-5 h-5 text-[#07D9D9]" />}
                      {plan.id === "basic" && <Badge className="w-5 h-5 text-[#07D9D9]" />}
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-gray-400 mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-[#07D9D9] flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${
                            feature.included ? 'text-white' : 'text-gray-500'
                          }`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handleChangePlan(plan.id)}
                      className={`w-full ${
                        plan.id === currentPlan
                          ? 'bg-gray-600 text-white cursor-not-allowed'
                          : plan.popular
                          ? 'bg-[#07D9D9] hover:bg-[#0596A6] text-[#010440]'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      }`}
                      disabled={plan.id === currentPlan}
                    >
                      {plan.id === currentPlan ? 'Plan Actual' : 'Seleccionar Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Billing Information */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#07D9D9]">
                <CreditCard className="w-5 h-5" />
                Información de Facturación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-gray-400">Método de Pago</span>
                <span className="text-white">Visa **** 4242</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-gray-400">Próximo Pago</span>
                <span className="text-white">$99.00</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-gray-400">Fecha de Renovación</span>
                <span className="text-white">15/12/2024</span>
              </div>
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
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
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="text-white">{payment.date}</div>
                    <div className="text-sm text-gray-400">{payment.amount}</div>
                  </div>
                  <UIBadge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {payment.status}
                  </UIBadge>
                </div>
              ))}
              <Button variant="outline" className="w-full border-[#07D9D9] text-[#07D9D9] hover:bg-[#07D9D9] hover:text-[#010440]">
                Ver Historial Completo
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}