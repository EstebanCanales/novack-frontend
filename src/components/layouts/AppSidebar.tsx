"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { 
  Home, 
  Calendar, 
  MessageCircle, 
  ChartArea, 
  Badge,
  BadgeDollarSign,
  Lock,
  Users,
  Monitor,
  ClipboardList,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Settings,
  UserCog,
  User
} from "lucide-react";

const mainItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Citas",
    url: "/appointment",
    icon: Calendar,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Gráficas",
    url: "/graphs",
    icon: ChartArea,
  },
];

const collapsibleItems = [
  {
    title: "Configuración",
    icon: Settings,
    initiallyOpen: false,
    items: [
      {
        title: "Perfil",
        url: "/management/supplier/supplierProfile",
        icon: User,
      },
      {
        title: "Permisos",
        url: "/management/supplier/permissionAdmin",
        icon: BadgeDollarSign,
      },
    ]
  },
  {
    title: "Usuarios",
    icon: UserCog,
    initiallyOpen: false,
    items: [
      {
        title: "Admin Usuarios",
        url: "/management/supplier/adminUser",
        icon: Users,
      },
      {
        title: "Admin subscipciones",
        url: "/management/supplier/subscription",
        icon: Users,
      },
    ]
  }
];

const standaloneItems = [
  {
    title: "Formulario para padres",
    url: "/management/supplier/parentForm",
    icon: ClipboardList,
  },
  {
    title: "Administración de tarjetas",
    url: "/management/supplier/cardAdmin",
    icon: CreditCard,
  }
];

export function AppSidebar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openSections, setOpenSections] = React.useState(
    collapsibleItems.reduce((acc, item) => {
      acc[item.title] = item.initiallyOpen || false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Sidebar
      collapsible="icon"
      className="bg-background border-r"
    >
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2 py-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Badge className="size-4" />
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <div>
                <div className="text-sm font-semibold">Novack</div>
                <div className="text-xs text-muted-foreground">Enterprise</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Seguridad
              </motion.span>
            </AnimatePresence>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4" />
                      <AnimatePresence>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="truncate"
                        >
                          {item.title}
                        </motion.span>
                      </AnimatePresence>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Administración
              </motion.span>
            </AnimatePresence>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {collapsibleItems.map((item) => (
                <Collapsible 
                  key={item.title} 
                  open={openSections[item.title]} 
                  onOpenChange={() => toggleSection(item.title)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <div className="flex items-center gap-3">
                          <item.icon className="size-4" />
                          <AnimatePresence>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="truncate"
                            >
                              {item.title}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                        <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <SidebarMenu>
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild className="pl-11">
                              <a href={subItem.url} className="flex items-center gap-3">
                                <subItem.icon className="size-4" />
                                <AnimatePresence>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="truncate"
                                  >
                                    {subItem.title}
                                  </motion.span>
                                </AnimatePresence>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}

              {standaloneItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4" />
                      <AnimatePresence>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="truncate"
                        >
                          {item.title}
                        </motion.span>
                      </AnimatePresence>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted">
            <User className="size-4" />
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <div>
                <div className="text-sm font-medium">{user?.first_name} {user?.last_name}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}