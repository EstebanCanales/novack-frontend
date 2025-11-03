import { api } from "../api";

export interface DashboardStats {
  totalEmployees: number;
  activeVisitorsToday: number;
  pendingAppointments: number;
  unreadMessages: number;
  availableCards: number;
  activeChatRooms: number;
  completedAppointmentsToday: number;
}

export interface UpcomingAppointment {
  id: string;
  visitorName: string;
  purpose: string;
  scheduledTime: string;
  status: string;
  location?: string;
  hostEmployee?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

export interface RecentActivity {
  id: string;
  visitorName: string;
  action: string;
  time: string;
  location?: string;
}

class DashboardService {
  async getStats(supplierId?: string): Promise<DashboardStats> {
    const params = supplierId ? { supplierId } : {};
    const response = await api.get<DashboardStats>("/dashboard/stats", { params });
    return response.data;
  }

  async getUpcomingAppointments(
    limit: number = 5,
    supplierId?: string
  ): Promise<UpcomingAppointment[]> {
    const params = { limit, ...(supplierId ? { supplierId } : {}) };
    const response = await api.get<UpcomingAppointment[]>("/dashboard/upcoming-appointments", { params });
    return response.data;
  }

  async getRecentActivity(
    limit: number = 10,
    supplierId?: string
  ): Promise<RecentActivity[]> {
    const params = { limit, ...(supplierId ? { supplierId } : {}) };
    const response = await api.get<RecentActivity[]>("/dashboard/recent-activity", { params });
    return response.data;
  }
}

export const dashboardService = new DashboardService();
