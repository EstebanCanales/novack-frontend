"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  CreditCard,
  Plus,
  Search,
  User,
  QrCode,
  Battery,
  Wifi,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cardService, type Card as CardType } from "@/lib/services";
import { handleApiError, showSuccess } from "@/lib/utils/error-handler";

export default function CardAdminPage() {
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const loadCards = useCallback(async () => {
    if (!user?.supplier?.id) return;
    try {
      setIsLoading(true);
      const data = await cardService.getAll();
      const supplierCards = data.filter(
        (card) => card.supplier_id === user.supplier?.id
      );
      setCards(supplierCards);
      setFilteredCards(supplierCards);
    } catch (error) {
      handleApiError(error, "Error al cargar tarjetas");
    } finally {
      setIsLoading(false);
    }
  }, [user?.supplier?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.supplier?.id) {
      loadCards();
    }
  }, [isAuthenticated, user, loadCards]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter(
        (card) =>
          card.card_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.assigned_to?.first_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          card.assigned_to?.last_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (card.status?.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false)
      );
      setFilteredCards(filtered);
    }
  }, [searchTerm, cards]);

  const handleDeleteCard = async (id: string, cardNumber: string) => {
    if (
      !confirm(`¿Estás seguro de que deseas eliminar la tarjeta ${cardNumber}?`)
    ) {
      return;
    }

    try {
      await cardService.delete(id);
      showSuccess(
        "Tarjeta eliminada",
        "La tarjeta ha sido eliminada exitosamente"
      );
      loadCards();
    } catch (error) {
      handleApiError(error, "Error al eliminar tarjeta");
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-[#07D9D9]"></div>
          <p className="text-white text-lg">Cargando tarjetas...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const statsData = {
    total: filteredCards.length,
    active: filteredCards.filter(
      (c) => c.status === "assigned" || c.status === "active"
    ).length,
    available: filteredCards.filter((c) => c.status === "available").length,
    inactive: filteredCards.filter(
      (c) => c.status === "inactive" || c.status === "lost"
    ).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "available":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "inactive":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      case "lost":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getBatteryColor = (percentage?: number) => {
    if (!percentage) return "text-slate-400";
    if (percentage >= 70) return "text-green-400";
    if (percentage >= 30) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "assigned":
        return "Asignada";
      case "available":
        return "Disponible";
      case "inactive":
        return "Inactiva";
      case "lost":
        return "Perdida";
      default:
        return status;
    }
  };

  const getHolderName = (card: CardType): string => {
    if (!card.assigned_to) return "Sin asignar";
    return `${card.assigned_to.first_name} ${card.assigned_to.last_name}`;
  };

  const getHolderInitials = (card: CardType): string => {
    const name = getHolderName(card);
    if (name === "Sin asignar") return "SA";
    const parts = name.split(" ");
    return parts
      .map((p) => p[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

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
              <BreadcrumbPage>Administración de Tarjetas</BreadcrumbPage>
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
          className="flex items-center gap-3"
        >
          <div className="p-3 rounded-xl bg-[#07D9D9]/20 border border-[#07D9D9]/30">
            <CreditCard className="h-6 w-6 text-[#07D9D9]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Gestión de Tarjetas
            </h2>
            <p className="text-sm text-slate-400">
              Administre todas las tarjetas de acceso de la institución
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Tarjetas</p>
                  <p className="text-2xl font-bold text-white">
                    {statsData.total}
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-[#07D9D9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Asignadas</p>
                  <p className="text-2xl font-bold text-white">
                    {statsData.active}
                  </p>
                </div>
                <Wifi className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Disponibles</p>
                  <p className="text-2xl font-bold text-white">
                    {statsData.available}
                  </p>
                </div>
                <Battery className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Inactivas</p>
                  <p className="text-2xl font-bold text-white">
                    {statsData.inactive}
                  </p>
                </div>
                <QrCode className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, número o departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-[#07D9D9]"
            />
          </div>
          <Button className="bg-[#07D9D9] hover:bg-[#06b8b8] text-black font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Nueva Tarjeta
          </Button>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#07D9D9]/20 transition-all duration-300">
                <CardContent className="p-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-[#07D9D9]/30">
                        <AvatarFallback className="bg-[#07D9D9] text-black font-semibold">
                          {getHolderInitials(card)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">
                          {getHolderName(card)}
                        </h3>
                        <p className="text-sm text-slate-400">
                          #{card.card_number}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-white hover:bg-white/5"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-900 border-white/10">
                        <DropdownMenuItem
                          className="text-white hover:bg-white/10 cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/management/supplier/cardAdmin/${card.id}`
                            )
                          }
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-white/10 cursor-pointer"
                          onClick={() =>
                            handleDeleteCard(card.id, card.card_number)
                          }
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Estado</span>
                      <Badge
                        className={getStatusColor(card.status || "inactive")}
                      >
                        {getStatusText(card.status || "inactive")}
                      </Badge>
                    </div>

                    {card.battery_percentage !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Batería</span>
                        <div className="flex items-center gap-1">
                          <Battery
                            className={`w-4 h-4 ${getBatteryColor(
                              card.battery_percentage
                            )}`}
                          />
                          <span
                            className={`text-sm ${getBatteryColor(
                              card.battery_percentage
                            )}`}
                          >
                            {card.battery_percentage}%
                          </span>
                        </div>
                      </div>
                    )}

                    {card.assigned_to && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">
                          Asignada a
                        </span>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-[#07D9D9]" />
                          <span className="text-sm text-white truncate max-w-[150px]">
                            {getHolderName(card)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#07D9D9] text-[#07D9D9] hover:bg-[#07D9D9] hover:text-black"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
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
      </div>
    </div>
  );
}
