"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  Shield,
  Zap,
  Users,
  Clock,
  MessageCircle,
  Database,
  BarChart3,
  Calendar,
  Smartphone,
  Globe,
  Lock,
  Settings,
  Headphones,
  Code,
  Palette,
  Bell,
  MapPin,
  Crown,
  Award,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    annualPrice: "$290",
    period: "/month",
    annualPeriod: "/year",
    description: "Perfecto para equipos pequeños que están comenzando",
    features: [
      "Hasta 5 miembros del equipo",
      "Agendamiento básico de citas",
      "Soporte por email",
      "Integraciones estándar",
      "1GB de almacenamiento",
      "Analíticas básicas",
      "Acceso a aplicación móvil",
      "Sincronización de calendario",
    ],
    popular: false,
    color: "from-[#07D9D9] to-[#0596A6]",
    icon: Users,
    badge: "Perfecto para startups",
    savings: "Ahorra 20% anualmente",
    setupTime: "< 5 minutos",
    responseTime: "24 horas",
    storage: "1GB",
    teamSize: "5 miembros",
  },
  {
    name: "Professional",
    price: "$79",
    annualPrice: "$790",
    period: "/month",
    annualPeriod: "/year",
    description: "Ideal para negocios en crecimiento",
    features: [
      "Hasta 5 miembros del equipo",
      "Hasta 25 miembros del equipo",
      "Agendamiento básico de citas",
      "Agendamiento avanzado",
      "Soporte por email",
      "Soporte prioritario",
      "Integraciones estándar",
      "Integraciones avanzadas",
      "1GB de almacenamiento",
      "10GB de almacenamiento",
      "Analíticas básicas",
      "Analíticas avanzadas",
      "Acceso a aplicación móvil",
      "Sincronización de calendario",
      "Marca personalizada",
      "Acceso a API",
      "Recordatorios automatizados",
      "Soporte multi-ubicación",
    ],
    popular: true,
    color: "from-[#763DF2] to-[#202473]",
    icon: Zap,
    badge: "Opción más popular",
    savings: "Ahorra 25% anualmente",
    setupTime: "< 2 minutos",
    responseTime: "4 horas",
    storage: "10GB",
    teamSize: "25 miembros",
  },
  {
    name: "Enterprise",
    price: "$199",
    annualPrice: "$1990",
    period: "/month",
    annualPeriod: "/year",
    description: "Para organizaciones grandes con necesidades complejas",
    features: [
      "Hasta 5 miembros del equipo",
      "Hasta 25 miembros del equipo",
      "Miembros ilimitados del equipo",
      "Agendamiento básico de citas",
      "Agendamiento avanzado",
      "Agendamiento empresarial",
      "Soporte por email",
      "Soporte prioritario",
      "Soporte telefónico 24/7",
      "Integraciones estándar",
      "Integraciones avanzadas",
      "Integraciones personalizadas",
      "1GB de almacenamiento",
      "10GB de almacenamiento",
      "Almacenamiento ilimitado",
      "Analíticas básicas",
      "Analíticas avanzadas",
      "Acceso a aplicación móvil",
      "Sincronización de calendario",
      "Marca personalizada",
      "Acceso a API",
      "Recordatorios automatizados",
      "Soporte multi-ubicación",
      "Gerente de cuenta dedicado",
      "Capacitación personalizada",
      "Solución white-label",
      "Seguridad avanzada",
    ],
    popular: false,
    color: "from-[#0596A6] to-[#010440]",
    icon: Shield,
    badge: "Solución de nivel empresarial",
    savings: "Ahorra 30% anualmente",
    setupTime: "Instantáneo",
    responseTime: "30 minutos",
    storage: "Ilimitado",
    teamSize: "Ilimitado",
  },
];

// Lista completa de todas las características disponibles
const allFeatures = [
  { id: "team-5", name: "Hasta 5 miembros del equipo", icon: Users, category: "Equipo" },
  {
    id: "team-25",
    name: "Hasta 25 miembros del equipo",
    icon: Users,
    category: "Equipo",
  },
  {
    id: "team-unlimited",
    name: "Miembros ilimitados del equipo",
    icon: Crown,
    category: "Equipo",
  },
  {
    id: "scheduling-basic",
    name: "Agendamiento básico de citas",
    icon: Calendar,
    category: "Agendamiento",
  },
  {
    id: "scheduling-advanced",
    name: "Agendamiento avanzado",
    icon: Calendar,
    category: "Agendamiento",
  },
  {
    id: "scheduling-enterprise",
    name: "Agendamiento empresarial",
    icon: Calendar,
    category: "Agendamiento",
  },
  {
    id: "support-email",
    name: "Soporte por email",
    icon: MessageCircle,
    category: "Soporte",
  },
  {
    id: "support-priority",
    name: "Soporte prioritario",
    icon: MessageCircle,
    category: "Soporte",
  },
  {
    id: "support-24-7",
    name: "Soporte telefónico 24/7",
    icon: Headphones,
    category: "Soporte",
  },
  {
    id: "integrations-standard",
    name: "Integraciones estándar",
    icon: Settings,
    category: "Integraciones",
  },
  {
    id: "integrations-advanced",
    name: "Integraciones avanzadas",
    icon: Settings,
    category: "Integraciones",
  },
  {
    id: "integrations-custom",
    name: "Integraciones personalizadas",
    icon: Code,
    category: "Integraciones",
  },
  {
    id: "storage-1gb",
    name: "1GB de almacenamiento",
    icon: Database,
    category: "Almacenamiento",
  },
  {
    id: "storage-10gb",
    name: "10GB de almacenamiento",
    icon: Database,
    category: "Almacenamiento",
  },
  {
    id: "storage-unlimited",
    name: "Almacenamiento ilimitado",
    icon: Database,
    category: "Almacenamiento",
  },
  {
    id: "analytics-basic",
    name: "Analíticas básicas",
    icon: BarChart3,
    category: "Analíticas",
  },
  {
    id: "analytics-advanced",
    name: "Analíticas avanzadas",
    icon: BarChart3,
    category: "Analíticas",
  },
  {
    id: "mobile-app",
    name: "Acceso a aplicación móvil",
    icon: Smartphone,
    category: "Acceso",
  },
  {
    id: "calendar-sync",
    name: "Sincronización de calendario",
    icon: Calendar,
    category: "Acceso",
  },
  {
    id: "custom-branding",
    name: "Marca personalizada",
    icon: Palette,
    category: "Personalización",
  },
  { id: "api-access", name: "Acceso a API", icon: Code, category: "Desarrollo" },
  {
    id: "automated-reminders",
    name: "Recordatorios automatizados",
    icon: Bell,
    category: "Automatización",
  },
  {
    id: "multi-location",
    name: "Soporte multi-ubicación",
    icon: MapPin,
    category: "Negocio",
  },
  {
    id: "dedicated-manager",
    name: "Gerente de cuenta dedicado",
    icon: Award,
    category: "Soporte",
  },
  {
    id: "custom-training",
    name: "Capacitación personalizada",
    icon: Award,
    category: "Soporte",
  },
  {
    id: "white-label",
    name: "Solución white-label",
    icon: Shield,
    category: "Empresarial",
  },
  {
    id: "advanced-security",
    name: "Seguridad avanzada",
    icon: Lock,
    category: "Seguridad",
  },
];

export function PricingCardsSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(1); // Professional por defecto

  const currentPlan = plans[selectedPlan];

  // Función para verificar si una característica está incluida en el plan actual
  const isFeatureIncluded = (featureId: string) => {
    const feature = allFeatures.find((f) => f.id === featureId);
    if (!feature) return false;

    return currentPlan.features.some((planFeature) =>
      planFeature.toLowerCase().includes(feature.name.toLowerCase())
    );
  };

  // Agrupar características por categoría
  const featuresByCategory = allFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof allFeatures>);

  return (
    <section className="w-full py-4">
      <div className="mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#07D9D9]/20 to-[#763DF2]/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6"
          >
            <div className="w-2 h-2 bg-[#07D9D9] rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium">
              Elige tu plan perfecto
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Simple, Transparente <span className="text-[#07D9D9]">Precios</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Empieza gratis, escala a medida que creces. Todos los planes incluyen nuestras funciones principales
            con seguridad de nivel empresarial.
          </motion.p>

          {/* Plan Selection Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            {plans.map((plan, index) => (
              <button
                key={plan.name}
                onClick={() => setSelectedPlan(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  selectedPlan === index
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                    : "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10"
                }`}
              >
                {plan.name}
                {plan.popular && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                !isAnnual ? "text-white" : "text-white/60"
              }`}
            >
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                isAnnual ? "bg-[#07D9D9]" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isAnnual ? "text-white" : "text-white/60"
              }`}
            >
              Anual
            </span>
            {isAnnual && (
              <span className="bg-gradient-to-r from-[#07D9D9]/20 to-[#0596A6]/20 text-[#07D9D9] px-2 py-1 rounded-full text-xs font-semibold">
                Ahorra hasta 30%
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto"
        >
          {/* Plan Info Card */}
          <motion.div
            variants={fadeInUp}
            className={`relative ${
              currentPlan.popular
                ? "border-2 border-[#763DF2] shadow-xl shadow-[#763DF2]/20"
                : "border border-white/10"
            } bg-white/5 backdrop-blur-sm rounded-xl p-6 lg:col-span-1 lg:sticky lg:top-24 lg:self-start`}
          >
            {currentPlan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#763DF2] to-[#202473] text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Más Popular
                </span>
              </div>
            )}

            {/* Header Section */}
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${currentPlan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
              >
                {React.createElement(currentPlan.icon, {
                  className: "w-8 h-8 text-white",
                })}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {currentPlan.name}
              </h3>

              <div className="mb-4">
                <span className="text-3xl font-bold text-white">
                  {isAnnual ? currentPlan.annualPrice : currentPlan.price}
                </span>
                <span className="text-white/60 text-lg">
                  {isAnnual ? currentPlan.annualPeriod : currentPlan.period}
                </span>
              </div>

              <p className="text-white/80 text-sm mb-4">
                {currentPlan.description}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <div className="bg-white/5 rounded-full px-3 py-1">
                  <p className="text-[#07D9D9] text-xs font-semibold">
                    {currentPlan.badge}
                  </p>
                </div>
                {isAnnual && (
                  <div className="bg-gradient-to-r from-[#07D9D9]/20 to-[#0596A6]/20 rounded-full px-3 py-1">
                    <p className="text-[#07D9D9] text-xs font-semibold">
                      {currentPlan.savings}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-[#07D9D9]" />
                <span className="text-white/80">{currentPlan.teamSize}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Database className="w-4 h-4 text-[#07D9D9]" />
                <span className="text-white/80">{currentPlan.storage}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#07D9D9]" />
                <span className="text-white/80">{currentPlan.setupTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4 text-[#07D9D9]" />
                <span className="text-white/80">
                  {currentPlan.responseTime}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                currentPlan.popular
                  ? "bg-gradient-to-r from-[#763DF2] to-[#202473] text-white hover:shadow-lg hover:shadow-[#763DF2]/30"
                  : "bg-gradient-to-r from-[#07D9D9] to-[#0596A6] text-[#010440] hover:shadow-lg hover:shadow-[#07D9D9]/30"
              }`}
            >
              Comenzar con {currentPlan.name}
            </button>
          </motion.div>

          {/* Features List */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#07D9D9]" />
                Comparativa Completa de Funciones
              </h4>

              <div className="space-y-6">
                {Object.entries(featuresByCategory).map(
                  ([category, features]) => (
                    <div key={category} className="space-y-3">
                      <h5 className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                        {category}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {features.map((feature) => {
                          const isIncluded = isFeatureIncluded(feature.id);
                          return (
                            <div
                              key={feature.id}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                                isIncluded
                                  ? "bg-white/10 border border-[#07D9D9]/20"
                                  : "bg-white/5 border border-white/5"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isIncluded
                                    ? "bg-[#07D9D9] text-[#010440]"
                                    : "bg-white/10 text-white/40"
                                }`}
                              >
                                {isIncluded ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  React.createElement(feature.icon, {
                                    className: "w-4 h-4",
                                  })
                                )}
                              </div>
                              <span
                                className={`text-sm ${
                                  isIncluded
                                    ? "text-white font-medium"
                                    : "text-white/50"
                                }`}
                              >
                                {feature.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center items-center gap-4 text-white/70 text-sm mt-8"
        >
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Star className="w-4 h-4 text-[#07D9D9]" />
            <span className="font-medium">Prueba gratis de 14 días</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Shield className="w-4 h-4 text-[#07D9D9]" />
            <span className="font-medium">No requiere tarjeta</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Zap className="w-4 h-4 text-[#07D9D9]" />
            <span className="font-medium">Cancela cuando quieras</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
